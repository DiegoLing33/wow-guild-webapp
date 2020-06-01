/**
 * Mythic dungeon entity
 */
export default class MythicDungeon {

    /**
     * Constructor
     * @param id
     * @param name
     */
    constructor({id, name} = {id: 0, name: ""}) {
        /**
         * The dungeon identifier
         * @type {number}
         */
        this.id   = id || 0;

        /**
         * The dungeon name
         * @type {string}
         */
        this.name = name || "Undefined";
    }

}
