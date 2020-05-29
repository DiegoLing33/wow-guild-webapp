import Guild from "@/app/Guild";

/**
 * Mythic+ filtering utils
 */
export default class MythicUtils {

    /**
     * Returns sorted by lvl key
     * @param ms
     * @return {void | parser.Node[] | this | this | this | this | this | this | this | this | this | this | this | this}
     */
    static getSortedByLevel(ms) {
        return ms.sort((a, b) => a.level < b.level ? 1 : -1);
    }

    /**
     * Returns filtered by done
     * @param ms
     * @return {*}
     */
    static getDone(ms) {
        return ms.filter(m => m.done_in_time);
    }

    /**
     * Returns filtered by broken
     * @param ms
     * @return {*}
     */
    static getBroken(ms) {
        return ms.filter(m => !m.done_in_time);
    }

    /**
     * Returns sorted by done and level
     * @param ms
     * @return {*[]}
     */
    static getSortedByDoneAndLevel(ms) {
        const src = MythicUtils.getSortedByLevel(ms);
        return [...MythicUtils.getDone(src), ...MythicUtils.getBroken(src)]
    }

    /**
     * Returns true if the mythic is guild race
     * @param m
     * @return {boolean}
     */
    static isGuildRace(m) {
        return m.members.every(v => Guild.shared.hasPlayer(v.name));
    }

    /**
     * Returns filtered by guild race
     * @param ms
     * @return {*}
     */
    static getGuildRace(ms) {
        return ms.filter(MythicUtils.isGuildRace);
    }

    /**
     * Returns with shorter names
     * @param m
     * @return {*}
     */
    static getWithShorterName(m) {
        m.dungeon_name = m.dungeon_name.replace('Операция "Мехагон"', 'Мехагон');
        return m;
    }

    /**
     * Returns true, if races are equals
     * @param m1
     * @param m2
     * @return {boolean}
     */
    static isMythicRaceEquals(m1, m2) {
        return m1.mythic_hash === m2.mythic_hash;
    }

    /**
     * Returns true when mythic is already in butch
     * @param mythic
     * @param butch
     * @return {*}
     */
    static isMythicInMythicButch(mythic, butch) {
        return butch.some(v => MythicUtils.isMythicRaceEquals(v, mythic));
    }

    /**
     * Returns filtered by unique
     * @param ms
     * @return {[]}
     */
    static getUniqueTeamMythicList(ms) {
        const newMs = [];
        let counter = 0;
        ms.forEach(__m => {
            const m = MythicUtils.getWithShorterName(__m);
            if (!MythicUtils.isMythicInMythicButch(m, newMs)) {
                m.si = counter++;
                newMs.push(m);
            }
        });
        return newMs;
    }

    /**
     * Returns the guild score that player will get
     * @param m
     */
    static getGuildScoreForPlayer(m) {
        let score = 0;
        score += (m.dont_in_time) ? 0.15 : 0.1;
        score += (m.guildPlayers.length / 10);
        score *= (m.level * 10);
        return Math.round(score);
    }
}
