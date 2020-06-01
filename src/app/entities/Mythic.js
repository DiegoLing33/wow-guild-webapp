import Guild from "@/app/Guild";
import Player from "@/app/entities/Player";
import WoWUtils from "@/app/utils/WoWUtils";
import MythicDungeon from "@/app/entities/mythic/MythicDungeon";

/**
 * The mythic entity
 * @class Mythic
 */
export default class Mythic {

    /**
     * Returns the guild score that player will get
     * @param {Mythic} m
     */
    static getGuildScoreForPlayer(m) {
        let score = 0;
        score += (m.isDone) ? 0.15 : 0.1;
        score += (m.guildPlayers.length / 10);
        score *= (m.level * 10);
        return Math.round(score);
    }

    /**
     * Returns true, if mythic was in this week
     * @param {Mythic} mythic
     * @param [date = new Date()]
     * @return {boolean}
     */
    static isThisWeek(mythic, date) {
        date = date || new Date();
        return WoWUtils.getWeekNumber(mythic.completed) === WoWUtils.getWeekNumber(date);
    }


    /**
     * Returns true, if mythic was in the last week
     * @param {Mythic} mythic
     * @param [date = new Date()]
     * @return {boolean}
     */
    static isLastWeek(mythic, date) {
        date = date || new Date();
        return WoWUtils.getWeekNumber(mythic.completed) === (WoWUtils.getWeekNumber(date) - 1);
    }

    /**
     * Constructor
     * @param {*} raw
     */
    constructor(raw = {}) {
        raw = raw || {};
        /**
         * The identifier
         * @type {number}
         */
        this.id = raw.id;

        /**
         * The mythic primary hash
         * @type {string}
         */
        this.mythicHash = raw.mythic_hash;

        /**
         * The team primary hash
         * @type {string}
         */
        this.teamHash = raw.team_hash;

        /**
         * The affixes hash
         * @type {string}
         */
        this.affixesHash = raw.affixes_hash;

        /**
         * The affixes
         * @type {Array<{id: number, name: string}>}
         */
        this.affixes = raw.affixes;

        /**
         * The level
         * @type {number}
         */
        this.level = parseInt(raw.level) || 0;

        /**
         * The time in that mythic+ was done
         * @type {number}
         */
        this.doneInTime = parseInt(raw.done_in) || 0;

        /**
         * The time in that mythic+ was done (formatted: hh:mm:ss)
         * @type {number}
         */
        this.doneInTimeFormat = raw.done_in_formatted || "00:00:00";

        /**
         * True, if mythic was done successful
         * @type {boolean}
         */
        this.isDone = raw.done_in_time;

        /**
         * The dungeon
         * @type {MythicDungeon}
         */
        this.dungeon = new MythicDungeon({id: raw.dungeon_id, name: raw.dungeon_name});

        /**
         * The date number when mythic was completed
         * @type {number}
         */
        this.completed = raw.completed || 0;

        /**
         * The date when mythic was completed
         * @type {Date}
         */
        this.completedDate = new Date(this.completed);

        /**
         * True, if mythic was done in this week
         * @type {boolean}
         */
        this.thisWeek = Mythic.isThisWeek(this, new Date());

        /**
         * * True, if mythic was done in the last week
         * @type {boolean}
         */
        this.lastWeek = Mythic.isLastWeek(this, new Date());

        /**
         * The players that were in race
         * @type {Player[]}
         */
        this.players = raw.members.map(player => {
            const temp = new Player(player);
            if (Guild.shared.hasPlayer(player.name)) {
                const guildPlayer  = Guild.shared.getPlayer(temp.name);
                temp.gear        = guildPlayer.gear;
                temp.race        = guildPlayer.race;
                temp.guildScore  = guildPlayer.guildScore;
                temp.class.id    = guildPlayer.class.id;
                temp.rank        = guildPlayer.rank;
                temp.class.title = guildPlayer.class.title;
                temp.fromGuild   = true;
            } else {
                temp.gear      = 0;
                temp.fromGuild = false;
            }
            return temp;
        });

        /**
         * The guild players
         * @type {Player[]}
         */
        this.guildPlayers = this.players.filter(v => v.fromGuild);

        /**
         * The guild score for this race
         * @type {number}
         */
        this.guildScore = Mythic.getGuildScoreForPlayer(this);

        //fixme: - It seems like a broken moment !
        if (this.completedDate.getDay() === 3 && this.thisWeek && this.completedDate.getHours() < 10) {
            this.thisWeek = false;
            this.lastWeek = true;
        }
    }

    /**
     * Returns true if mythic's is equals
     * @param {Mythic} withMythic
     * @return {boolean}
     */
    isEquals(withMythic){
        return this.mythicHash === withMythic.mythicHash;
    }

    /**
     * Returns true, if this was a guild race
     * @return {boolean}
     */
    isGuildRace() {
        return this.guildPlayers.length === 5;
    }

}
