export default class DateUtils {

    /**
     * Returns formatted date
     * @param timecode
     * @returns {string}
     */
    static format(timecode) {
        const date = new Date(timecode);
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}, в ${date.toLocaleTimeString()}`;
    }

    /**
     * Returns the UTC date
     * @param date
     * @return {Date}
     */
    static getUTCDate(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    /**
     * Returns the UTC date with nearest sunday
     * @param date
     * @return {Date}
     */
    static getSundayUTCDate(date) {
        const utcDate = DateUtils.getUTCDate(date);
        utcDate.setUTCDate(utcDate.getUTCDate() + 4 - (utcDate.getUTCDay() || 7));
        return utcDate;
    }

    /**
     * Returns the current year first date
     * @param date
     * @return {Date}
     */
    static getCurrentYearFirstDate(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    }

    /**
     * Returns the week number from begin of the year
     * @param date
     * @return {number}
     */
    static getWeekNumber(date) {
        const utc = DateUtils.getSundayUTCDate(date);
        return Math.ceil((((utc - DateUtils.getCurrentYearFirstDate(utc)) / 86400000) + 1) / 7);
    }

}
