import shield from "@/assets/types/security.svg";
import heal from "@/assets/types/health.svg";
import sword from "@/assets/types/sword.svg";
import bow from "@/assets/types/bow-and-arrow.svg";

export default class SpecUtils {

    /**
     * Returns the spec image
     * @param specTypeId
     */
    static getImage(specTypeId) {
        switch (specTypeId) {
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
