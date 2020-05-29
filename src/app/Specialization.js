import shield from "../assets/types/security.svg";
import heal from "../assets/types/health.svg";
import sword from "../assets/types/sword.svg";
import bow from "../assets/types/bow-and-arrow.svg";
import noone from "../assets/types/noone.svg";

/**
 * Game specialization
 */
export default class Specialization {
    /**
     * Returns the role by specialization id
     * @param specializationId
     * @return {*|SpecializationRole}
     */
    static getRoleBySpecializationId(specializationId) {
        return SPECIALIZATIONS_ROLES[specializationId] || SpecializationRole.UNDEFINED;
    }
}

/**
 * The specialization roles
 */
export class SpecializationRole {

    static UNDEFINED = new SpecializationRole(0, "-", noone);
    static TANK = new SpecializationRole(1, "Т", shield);
    static HEALER = new SpecializationRole(2, "Т", heal);
    static MILLIE = new SpecializationRole(3, "МД", sword);
    static RANGE = new SpecializationRole(4, "РД", bow);

    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}

/**
 * The specializations roles ids
 * @type{*}
 */
export const SPECIALIZATIONS_ROLES = {
    "577": SpecializationRole.MILLIE,
    "581": SpecializationRole.TANK,
    "102": SpecializationRole.RANGE,
    "103": SpecializationRole.MILLIE,
    "104": SpecializationRole.TANK,
    "105": SpecializationRole.HEALER,
    "253": SpecializationRole.RANGE,
    "254": SpecializationRole.RANGE,
    "255": SpecializationRole.RANGE,
    "62": SpecializationRole.RANGE,
    "63": SpecializationRole.RANGE,
    "64": SpecializationRole.RANGE,
    "65": SpecializationRole.HEALER,
    "66": SpecializationRole.TANK,
    "70": SpecializationRole.MILLIE,
    "265": SpecializationRole.RANGE,
    "266": SpecializationRole.RANGE,
    "267": SpecializationRole.RANGE,
    "262": SpecializationRole.RANGE,
    "263": SpecializationRole.RANGE,
    "264": SpecializationRole.HEALER,
    "256": SpecializationRole.HEALER,
    "257": SpecializationRole.HEALER,
    "258": SpecializationRole.RANGE,
    "259": SpecializationRole.MILLIE,
    "260": SpecializationRole.MILLIE,
    "261": SpecializationRole.MILLIE,
    "268": SpecializationRole.TANK,
    "270": SpecializationRole.HEALER,
    "269": SpecializationRole.MILLIE,
    "250": SpecializationRole.TANK,
    "251": SpecializationRole.MILLIE,
    "252": SpecializationRole.MILLIE,
    "71": SpecializationRole.MILLIE,
    "72": SpecializationRole.MILLIE,
    "73": SpecializationRole.TANK,
};