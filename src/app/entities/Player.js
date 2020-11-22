/**
 * The player entity
 */
import GuildScore from "./GuildScore";
import PlayerSpecialization from "./player/PlayerSpecialization";
import PlayerRace from "./player/PlayerRace";
import PlayerClass from "./player/PlayerClass";
import PlayerRole from "./player/PlayerRole";
import PlayerGuildRank from "./player/PlayerGuildRank";

/**
 * The player entity
 */
export default class Player {

    constructor(raw = {}) {
        this.raw = raw || {};

        /**
         * Inline player id
         * @type {number}
         */
        this.id = raw.id || -1;

        /**
         * The game player id
         * @type {number}
         */
        this.playerId = raw.hero_id || -1;

        /**
         * The player name
         * @type {string}
         */
        this.name = raw.name || "Unknown";

        /**
         * The player level
         * @type {number}
         */
        this.level = raw.level || 0;

        /**
         * The player gear level
         * @type {number}
         */
        this.gear = raw.gear || 0;

        /**
         * The player race
         * @type {PlayerRace}
         */
        this.race = new PlayerRace(raw.race || {id: 0, name: "Unraced"});

        /**
         * The player class
         * @type {PlayerClass}
         */
        this.class = new PlayerClass(raw.class || {id: -1, name: "Unclassed"});

        /**
         * The player specialization
         * @type {PlayerSpecialization}
         */
        this.specialization = new PlayerSpecialization(raw.spec || {id: 0, name: "Unspecialized"});

        /**
         * The player role
         * @type {PlayerRole}
         */
        this.role = PlayerRole.getRoleBySpecialization(this.specialization);

        /**
         * The player guild rank
         * @type {PlayerGuildRank}
         */
        this.rank = PlayerGuildRank.getGuildRankById(raw.rank);

        /**
         * The left from guild time
         * @type {number}
         */
        this.leftFromGuild = 0; //raw.left_from_guild || 0;

        /**
         * The player guild score
         * @type {GuildScore}
         */
        this.guildScore = new GuildScore();

        /**
         * The postImage of players
         * @type {*}
         */
        this.image = null;

        /**
         * The guild flag
         * @type {boolean}
         */
        this.fromGuild = true;
    }
}