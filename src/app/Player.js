import shield from "@/assets/types/security.svg";
import heal from "@/assets/types/health.svg";
import sword from "@/assets/types/sword.svg";
import bow from "@/assets/types/bow-and-arrow.svg";
import Guild from "@/app/Guild";

export default class Player {

    static ROLES = ["-", "Т", "Х", "МД", "РД"];

    static getRoleIdBySpecId(specId){
        return {
            "577": 3,
            "581": 1,
            "102": 4,
            "103": 3,
            "104": 1,
            "105": 2,
            "253": 4,
            "254": 4,
            "255": 4,
            "62": 4,
            "63": 4,
            "64": 4,
            "65": 2,
            "66": 1,
            "70": 3,
            "265": 4,
            "266": 4,
            "267": 4,
            "262": 4,
            "263": 4,
            "264": 2,
            "256": 2,
            "257": 2,
            "258": 4,
            "259": 3,
            "260": 3,
            "261": 3,
            "268": 1,
            "270": 2,
            "269": 3,
            "250": 1,
            "251": 3,
            "252": 3,
            "71": 3,
            "72": 3,
            "73": 1,
        }[specId] || null;
    }

    static getRoleImageByName(playerName){
        return Player.getRoleImage(Guild.shared.getPlayer(playerName));
    }

    /**
     * Returns the spec image
     * @param player
     */
    static getRoleImage(player) {
        switch (player.role.id) {
            case 1:
                return shield;
            case 2:
                return heal;
            default:
            case 3:
                return sword;
            case 4:
                return bow;
        }
    }
}
