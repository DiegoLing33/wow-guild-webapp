/**
 * The guild score entity
 */
export default class GuildScore {
    constructor({all, week, lastWeek} = {}) {
        /**
         * The all guild score
         * @type {number}
         */
        this.all = all || 0;

        /**
         * The week guild score
         * @type {number}
         */
        this.thisWeek = week || 0;

        /**
         * The last week guild score
         * @type {number}
         */
        this.lastWeek = lastWeek || 0;
    }
}