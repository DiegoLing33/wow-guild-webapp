import ObjectsButch from "@/app/butches/ObjectsButch";

/**
 * Players butch
 *
 * @see Player
 * @augments {ObjectsButch<Player>}
 */
export default class PlayersButch extends ObjectsButch{

    /**
     *  Sorting methods
     */
    static Sorting = Object.freeze({
        FIRST_HIGH_ROLE: "FIRST_HIGH_ROLE",
        FIRST_LOW_ROLE:  "FIRST_LOW_ROLE",

        FIRST_HIGH_LEVEL: "FIRST_HIGH_LEVEL",
        FIRST_LOW_LEVEL:  "FIRST_LOW_LEVEL",

        FIRST_LOW_RANK:  "FIRST_LOW_RANK",
        FIRST_HIGH_RANK: "FIRST_HIGH_RANK",

        ALPHABETIC: "ALPHABETIC",
    });

    /**
     * Filter methods
     */
    static Filter = Object.freeze({
        IN_GUILD: "IN_GUILD",
        LEFT_GUILD: "LEFT_GUILD",

        MAX_LEVEL_ONLY:  "MAX_LEVEL_ONLY",

        TANKS:   "TANKS",
        HEALERS: "HEALERS",
        MILLIE:  "MILLIE",
        RANGED:  "RANGED",

    });

    /**
     * Constructor
     * @param {Array<Player>} players
     */
    constructor(players = []) {
        super(players);
    }

    /**
     * Returns the butch with post filter by name
     * @param {string} name
     * @return {Player[]}
     */
    getButchWithName(name){
        return this.__objects.filter(value => {
            return value.name.toLowerCase().includes(name.toLowerCase());
        });
    }

    /**
     * Sorts the butch
     *
     * @param {String} methods
     * @return {PlayersButch}
     *
     * @see PlayersButch.Sorting
     */
    sort(...methods) {
        this.__objects = this.__objects.sort((a, b) => {
            let sorting = 0;
            for (let method of methods) {
                switch (method) {
                    default:
                    case PlayersButch.Sorting.ALPHABETIC:
                        sorting = sorting || a.name.localeCompare(b.name);
                        break;
                    case PlayersButch.Sorting.FIRST_HIGH_ROLE:
                        sorting = sorting || (b.role.id - a.role.id);
                        break;
                    case PlayersButch.Sorting.FIRST_LOW_ROLE:
                        sorting = sorting || (a.role.id - b.role.id);
                        break;

                    case PlayersButch.Sorting.FIRST_HIGH_RANK:
                        sorting = sorting || (a.rank.id - b.rank.id);
                        break;
                    case PlayersButch.Sorting.FIRST_LOW_RANK:
                        sorting = sorting || (b.rank.id - a.rank.id);
                        break;

                    case PlayersButch.Sorting.FIRST_HIGH_LEVEL:
                        sorting = sorting || (b.level - a.level);
                        break;
                    case PlayersButch.Sorting.FIRST_LOW_LEVEL:
                        sorting = sorting || (a.level - b.level);
                        break;
                }
            }
            return sorting;
        });
        return this;
    }

    /**
     * Filters the butch
     *
     * @param {String} methods
     * @return {PlayersButch}
     *
     * @see PlayersButch.Filter
     */
    filter(...methods) {
        this.__objects = this.__objects.filter(player => {
            if (player.level < 120 && methods.includes(PlayersButch.Filter.MAX_LEVEL_ONLY)) return false;

            // Roles
            if (methods.includes(PlayersButch.Filter.TANKS) ||
                methods.includes(PlayersButch.Filter.HEALERS) ||
                methods.includes(PlayersButch.Filter.MILLIE) ||
                methods.includes(PlayersButch.Filter.RANGED)) {
                if (player.role.id === 1 && !methods.includes(PlayersButch.Filter.TANKS)) return false;
                if (player.role.id === 2 && !methods.includes(PlayersButch.Filter.HEALERS)) return false;
                if (player.role.id === 3 && !methods.includes(PlayersButch.Filter.MILLIE)) return false;
                if (player.role.id === 4 && !methods.includes(PlayersButch.Filter.RANGED)) return false;
            }

            if(methods.includes(PlayersButch.Filter.LEFT_GUILD) ||
                methods.includes(PlayersButch.Filter.IN_GUILD)){
                if (player.leftFromGuild > 0 && !methods.includes(PlayersButch.Filter.LEFT_GUILD)) return false;
                if (player.leftFromGuild === 0 && !methods.includes(PlayersButch.Filter.IN_GUILD)) return false;
            }

//           result = result && (methods.includes(PlayersButch.Filter.ONLY_HEALERS) && player.role.id !== 1);
            return true;
        });
        return this;
    }
}
