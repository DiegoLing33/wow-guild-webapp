import noone from "../../../assets/types/noone.svg";
import shield from "../../../assets/types/security.svg";
import heal from "../../../assets/types/health.svg";
import sword from "../../../assets/types/sword.svg";
import bow from "../../../assets/types/bow-and-arrow.svg";

/**
 * The player role entity
 */
export default class PlayerRole {
    static UNDEFINED = new PlayerRole({id: 0, title: "-", image: noone});
    static TANK = new PlayerRole({id: 1, title: "Т", image: shield});
    static HEALER = new PlayerRole({id: 2, title: "Т", image: heal});
    static MILLIE = new PlayerRole({id: 3, title: "МД", image: sword});
    static RANGE = new PlayerRole({id: 4, title: "РД", image: bow});

    /**
     * Returns the role by specialization
     * @param {PlayerSpecialization} specialization
     * @return {PlayerRole}
     */
    static getRoleBySpecialization(specialization) {
        return PlayerRole.getRoleBySpecializationId(specialization.id);
    }

    /**
     * Returns the role by specialization id
     * @param {number} specializationId
     * @return {PlayerRole}
     */
    static getRoleBySpecializationId(specializationId) {
        return SPECIALIZATIONS_ROLES[specializationId];
    }

    constructor({id, title, image} = {}) {
        /**
         * The role id
         */
        this.id = id;

        /**
         * The title
         */
        this.title = title;

        /**
         * The image
         */
        this.image = image;
    }
}


/**
 * The specializations roles ids
 * @type{*}
 */
export const SPECIALIZATIONS_ROLES = {
    "577": PlayerRole.MILLIE,
    "581": PlayerRole.TANK,
    "102": PlayerRole.RANGE,
    "103": PlayerRole.MILLIE,
    "104": PlayerRole.TANK,
    "105": PlayerRole.HEALER,
    "253": PlayerRole.RANGE,
    "254": PlayerRole.RANGE,
    "255": PlayerRole.RANGE,
    "62": PlayerRole.RANGE,
    "63": PlayerRole.RANGE,
    "64": PlayerRole.RANGE,
    "65": PlayerRole.HEALER,
    "66": PlayerRole.TANK,
    "70": PlayerRole.MILLIE,
    "265": PlayerRole.RANGE,
    "266": PlayerRole.RANGE,
    "267": PlayerRole.RANGE,
    "262": PlayerRole.RANGE,
    "263": PlayerRole.RANGE,
    "264": PlayerRole.HEALER,
    "256": PlayerRole.HEALER,
    "257": PlayerRole.HEALER,
    "258": PlayerRole.RANGE,
    "259": PlayerRole.MILLIE,
    "260": PlayerRole.MILLIE,
    "261": PlayerRole.MILLIE,
    "268": PlayerRole.TANK,
    "270": PlayerRole.HEALER,
    "269": PlayerRole.MILLIE,
    "250": PlayerRole.TANK,
    "251": PlayerRole.MILLIE,
    "252": PlayerRole.MILLIE,
    "71": PlayerRole.MILLIE,
    "72": PlayerRole.MILLIE,
    "73": PlayerRole.TANK,
    "0": PlayerRole.UNDEFINED,
};