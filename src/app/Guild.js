import API from "@/app/API";
import Player from "@/app/Player";
import MythicUtils from "@/app/MythicUtils";
import WoWUtils from "@/app/utils/WoWUtils";

export default class Guild {

    static shared = new Guild();

    guildRanks = [
        "Лидер гильдии",
        "Администратор",
        "Психиатор",
        "Менеджер",
        "Офицер",
        "Инвестор",
        "Просвещенный",
        "Мастер М+",
        "Ителлигент",
        "Подмастерье",
    ]

    constructor(data = {}) {
        this.apply(data);
        this.players = {};
        this.mythic  = {};
    }

    initPlayer(player) {
        player.guildScore         = 0;
        player.weekGuildScore     = 0;
        player.lastWeekGuildScore = 0;
        player.role               = {};
        player.role.id            = Player.getRoleIdBySpecId(player.spec.id)
        player.role.name          = Player.ROLES[player.role.id];
        player.rank               = {id: player.rank, name: this.guildRanks[player.rank]};
        return player;
    }

    setPlayer(name, player) {
        this.players[name.toLowerCase()] = this.initPlayer(player);
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

    getPlayer(name) {
        return this.players[name.toLowerCase()];
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
        const completed     = new Date(mythic.completed);
        mythic.isGuildRace  = MythicUtils.isGuildRace(mythic);
        mythic.thisWeek     = WoWUtils.getWeekNumber(completed)
            === WoWUtils.getWeekNumber(new Date());
        mythic.lastWeek     = WoWUtils.getWeekNumber(completed)
            === (WoWUtils.getWeekNumber(new Date()) - 1);
        mythic.guildPlayers = mythic.members.filter(v => Guild.shared.hasPlayer(v.name));
        mythic.guildScore   = MythicUtils.getGuildScoreForPlayer(mythic);

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
        this.gid                    = data.gid || 0;
        this.name                   = data.name || "Undefined";
        this.achievement_points     = data.achievement_points || 0;
        this.playersCount           = data.players || 0;
        this.created                = data.created || 0;
        this.crest_emblem           = data.crest_emblem;
        this.crest_background_color = data.crest_background_color;

        this.isGuildLoaded   = false;
        this.isPlayersLoaded = false;
        this.isMythicLoaded  = false;

        this.guildScore = {all: 0, thisWeek: 0, lastWeek: 0};
        this.loaded     = false;
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

                this.getPlayer(player.name).guildScore += m.guildScore;
                this.guildScore.all += m.guildScore;

                if (m.thisWeek) {
                    this.getPlayer(player.name).weekGuildScore += m.guildScore;
                    this.guildScore.thisWeek += m.guildScore;
                }
                if (m.lastWeek) {
                    this.getPlayer(player.name).lastWeekGuildScore += m.guildScore;
                    this.guildScore.lastWeek += m.guildScore;
                }
            });
        });
    }

    getCustomRating(size, field) {
        return this.getPlayersList()
            .sort((a, b) => a[field] > b[field] ? -1 : 1).slice(0, size).map(v => {
                return {name: v.name, guildScore: v[field], allGuildScore: v.guildScore};
            });
    }

    getAllRatingWeek(size) {
        this.getCustomRating(size, "guildScore")
    }

    getRatingWeek(size) {
        return this.getCustomRating(size, "weekGuildScore")
    }

    getRatingLastWeek(size) {
        return this.getCustomRating(size, "lastWeekGuildScore")
    }

    async updateGuild(callback) {
        callback(0, 1, "Получение данных о гильдии...");
        this.apply(await API.guild());
        this.isGuildLoaded = true;
    }

    async updatePlayers(callback) {
        this.players = {};
        let pages    = 0;
        let page     = 0;
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
        let pages   = 0;
        let page    = 0;
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
        return Guild.shared.getPlayer(name);
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
