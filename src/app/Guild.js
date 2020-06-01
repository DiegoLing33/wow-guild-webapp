import API from "@/app/API";
import Player from "./entities/Player";
import Mythic from "@/app/entities/Mythic";
import PlayersButch from "@/app/butches/PlayersButch";

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
        this.mythic[mythicHash] = new Mythic(mythic);
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

    /**
     * Creates and returns the new players butch object
     * @return {PlayersButch}
     *
     * @see PlayersButch
     */
    createPlayersButch(){
        return new PlayersButch(this.getPlayersList());
    }

    /**
     * Returns the mythic list
     * @return {Mythic[]}
     */
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
            m.players.forEach(player => {
                if (!player.fromGuild) return;
                if (this.isPlayerLeft(player.name)) return;

                player.guildScore.all += m.guildScore;
                this.guildScore.all += m.guildScore;

                if (m.thisWeek) {
                    player.guildScore.thisWeek += m.guildScore;
                    this.guildScore.thisWeek += m.guildScore;
                }
                if (m.lastWeek) {
                    player.guildScore.lastWeek += m.guildScore;
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


    getMythicByName(name) {
        const ms = [];
        this.getMythicList().forEach(m => {
            if (m.players.some(v => v.name === name) && ms.every(v => v.teahHash !== m.teamHash))
                ms.push(m);
        });
        return ms;
    }
}
