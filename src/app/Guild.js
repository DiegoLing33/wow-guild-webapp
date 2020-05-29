import API from "@/app/API";
import MythicUtils from "@/app/MythicUtils";
import WoWUtils from "@/app/utils/WoWUtils";
import Player from "./entities/Player";

export default class Guild {

    static shared = new Guild();


    constructor(data = {}) {
        this.apply(data);
        this.players = {};
        this.mythic = {};
    }

    /**
     * Adds the player to guild
     * @param {string} name
     * @param {*} player
     */
    setPlayer(name, player) {
        this.players[name.toLowerCase()] = new Player(player);
    }

    /**
     * Returns the player by name
     * @param {string} name
     * @return {Player}
     */
    getPlayer(name) {
        return this.players[name.toLowerCase()];
    }

    setMythic(mythicHash, mythic) {
        this.mythic[mythicHash] = this.initMythic(mythic);
    }

    addMythic(mythic) {
        this.setMythic(mythic.mythic_hash, mythic);
    }

    addPlayer(player) {
        this.setPlayer(player.name, player);
    }


    isPlayerLeft(name) {
        return this.getPlayer(name).left_from_guild > 0;
    }

    hasPlayer(name) {
        return this.getPlayer(name) !== undefined;
    }

    getPlayersList() {
        return Object.values(this.players);
    }

    initMythic(mythic) {
        const completed = new Date(mythic.completed);
        mythic.isGuildRace = MythicUtils.isGuildRace(mythic);
        mythic.thisWeek = WoWUtils.getWeekNumber(completed)
            === WoWUtils.getWeekNumber(new Date());
        mythic.lastWeek = WoWUtils.getWeekNumber(completed)
            === (WoWUtils.getWeekNumber(new Date()) - 1);
        mythic.guildPlayers = mythic.members.filter(v => Guild.shared.hasPlayer(v.name));
        mythic.guildScore = MythicUtils.getGuildScoreForPlayer(mythic);

        mythic.members = mythic.members.map(v => {
            const player = new Player(v);
            if(this.hasPlayer(v.name)){
                const guildPlayer = this.getPlayer(v.name);
                player.gear = guildPlayer.gear;
                player.race = guildPlayer.race;
                player.guildScore = guildPlayer.guildScore;
                player.class.id = guildPlayer.class.id;
                player.rank = guildPlayer.rank;
                player.class.title = guildPlayer.class.title;
                player.fromGuild = true;
            }else{
                player.gear = 0;
                player.fromGuild = false;
            }
            return player;
        });

        if (completed.getDay() === 3 && mythic.thisWeek && completed.getHours() < 10) {
            mythic.thisWeek = false;
            mythic.lastWeek = true;
        }
        return mythic;
    }

    getMythicList() {
        return Object.values(this.mythic);
    }

    getPlayersNamesList() {
        return Object.keys(this.players);
    }

    apply(data) {
        this.gid = data.gid || 0;
        this.name = data.name || "Undefined";
        this.achievement_points = data.achievement_points || 0;
        this.playersCount = data.players || 0;
        this.created = data.created || 0;
        this.crest_emblem = data.crest_emblem;
        this.crest_background_color = data.crest_background_color;

        this.isGuildLoaded = false;
        this.isPlayersLoaded = false;
        this.isMythicLoaded = false;

        this.guildScore = {all: 0, thisWeek: 0, lastWeek: 0};
        this.loaded = false;
        this.wait(() => this.loaded = true);
    }


    wait(callback) {
        const wait = setInterval(() => {
            if (this.isGuildLoaded && this.isMythicLoaded && this.isPlayersLoaded) {
                callback();
                clearInterval(wait);
            }
        }, 10);
    }

    calculateGuildScore() {
        this.getMythicList().forEach(m => {
            m.members.forEach(player => {
                if (!this.hasPlayer(player.name)) return;
                if (this.isPlayerLeft(player.name)) return;

                this.getPlayer(player.name).guildScore.all += m.guildScore;
                this.guildScore.all += m.guildScore;

                if (m.thisWeek) {
                    this.getPlayer(player.name).guildScore.thisWeek += m.guildScore;
                    this.guildScore.thisWeek += m.guildScore;
                }
                if (m.lastWeek) {
                    this.getPlayer(player.name).guildScore.lastWeek += m.guildScore;
                    this.guildScore.lastWeek += m.guildScore;
                }
            });
        });
    }

    getCustomRating(size, field) {
        return this.getPlayersList()
            .sort((a, b) => a.guildScore[field] > b.guildScore[field] ? -1 : 1).slice(0, size).map(v => {
                return {name: v.name, guildScore: v.guildScore[field], allGuildScore: v.guildScore.all, player: v};
            });
    }

    getAllRatingWeek(size) {
        this.getCustomRating(size, "guildScore")
    }

    getRatingWeek(size) {
        return this.getCustomRating(size, "thisWeek")
    }

    getRatingLastWeek(size) {
        return this.getCustomRating(size, "lastWeek")
    }

    async updateGuild(callback) {
        callback(0, 1, "Получение данных о гильдии...");
        this.apply(await API.guild());
        this.isGuildLoaded = true;
    }

    async updatePlayers(callback) {
        this.players = {};
        let pages = 0;
        let page = 0;
        do {
            const temp = await API.heroes(page);
            temp.items.forEach(this.addPlayer.bind(this));
            pages = temp.pages;
            page++;
            callback(page, pages, `[${page}/${pages}] Получение списка игроков...`);
        } while (page < pages);
        this.isPlayersLoaded = true;
    }

    async updateMythic(callback) {
        this.mythic = {};
        let pages = 0;
        let page = 0;
        do {
            const temp = await API.mythic(page);
            temp.items.forEach(this.addMythic.bind(this));
            pages = temp.pages;
            page++;
            callback(page, pages, `[${page}/${pages}] Получение мификов...`);
        } while (page < pages);
        this.calculateGuildScore();
        this.isMythicLoaded = true;
    }

    /**
     * Returns true, if player from guild
     * @param name
     * @returns {boolean}
     */
    isPlayerFormGuild(name) {
        return Guild.shared.getPlayer(name) !== undefined;
    }

    getMythicByName(name) {
        const ms = [];
        this.getMythicList().forEach(m => {
            if (m.members.some(v => v.name === name) && ms.every(v => v.teah_hash !== m.team_hash))
                ms.push(m);
        });
        return ms;
    }
}
