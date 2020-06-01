/**
 * The mythic butch
 */
export default class MythicButch {

    /**
     * Constructor
     * @param {Mythic[]} mythicList
     */
    constructor(mythicList = []) {
        /**
         * The mythic list
         * @type {Mythic[]}
         */
        this.mythicList = mythicList || [];
    }

    /**
     * Adds the mythic
     * @param {Mythic} mythic
     */
    push(...mythic){
        this.mythicList.push(...mythic);
    }

}
