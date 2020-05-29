import DateUtils from "@/app/utils/DateUtils";

/**
 * WoW utilities
 */
export default class WoWUtils {

    /**
     * Returns the week number for WoW rules (wednesday)
     * @param date
     * @return {number}
     */
    static getWeekNumber(date) {
        const modifiedDate = new Date(date - (2 * 24 * 60 * 60 * 1000));
        return DateUtils.getWeekNumber(modifiedDate);
    }
}

