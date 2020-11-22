/**
 * The player class entity
 */
export default class PlayerClass {
    /**
     * Returns the class slug by class id
     * @param classId
     * @return {*}
     */
    static getSlugByByClassId(classId) {
        return PLAYER_CLASS_SLUG[classId];
    }

    /**
     * Returns the class specializations
     * @param {number} classId
     * @return {number[]}
     */
    static getSpecializationsIdsByClassId(classId) {
        return PLAYER_CLASS_SPECIALIZATIONS[classId];
    }

    /**
     * Returns the class id by specialization
     * @param specializationId
     * @return {string|number}
     */
    static getClassIdBySpecializationId(specializationId) {
        for (const classId in PLAYER_CLASS_SPECIALIZATIONS)
            if (PlayerClass.isClassHasSpecializationId(specializationId, classId))
                return classId;
        return 0;
    }

    /**
     * Returns the class slug by specialization id
     * @param specializationId
     * @return {*}
     */
    static getSlugBySpecializationId(specializationId){
        return PlayerClass.getSlugByByClassId(PlayerClass.getClassIdBySpecializationId(specializationId));
    }


    /**
     * Returns true, if specialization id includes to class
     * @param {number} specializationId
     * @param {number} classId
     * @return {boolean}
     */
    static isClassHasSpecializationId(specializationId, classId) {
        return PlayerClass.getSpecializationsIdsByClassId(classId).includes(specializationId);
    }

    constructor({id, name} = {}) {
        /**
         * The class id
         */
        this.id = id || 0;
        /**
         * The class postTitle
         */
        this.title = name || "Undefined";

        /**
         * The player class slug
         */
        this.slug = PlayerClass.getSlugByByClassId(id) || 'war';
    }

}

/**
 * The player classes slugs
 * @type {*}
 */
export const PLAYER_CLASS_SLUG = {
    0: "undefined", // Undefined class slug
    1: "war", // War
    2: "paladin", // Paladin
    3: "hunter", // Hunter
    4: "rogue", // Rogue
    5: "priest", // Priest
    6: "dk", // Death Knight
    7: "shaman", // Shaman
    8: "mage", // Mage
    9: "warlock", // Warlock
    10: "monk", // Monk
    11: "druid", // Druid
    12: "dh", // Demon Hunter
};

/**
 * The player class specializations
 * @type {*}
 */
export const PLAYER_CLASS_SPECIALIZATIONS = {
    0: [],
    1: [71, 72, 73],
    2: [65, 66, 70],
    3: [253, 254, 255],
    4: [259, 260, 261],
    5: [256, 257, 258],
    6: [250, 251, 252],
    7: [262, 263, 264],
    8: [62, 63, 64],
    9: [265, 266, 267],
    10: [268, 269, 270],
    11: [102, 103, 104, 105],
    12: [577, 581],
};