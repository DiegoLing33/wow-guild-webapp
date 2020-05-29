/**
 * The player race entity
 */
export default class PlayerRace {
    constructor({id, name} = {}) {
        /**
         * The player race id
         */
        this.id = id || -1;

        /**
         * The player race title
         */
        this.title = name || "Unknown";
    }
}