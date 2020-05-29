/**
 * The guild rank
 */
export default class PlayerGuildRank {

    /**
     * Returns the guild rank by id
     * @param {number} rankId
     * @return {PlayerGuildRank}
     */
    static getGuildRankById(rankId){
        return  GUILD_RANKS[rankId] || GUILD_RANKS[9];
    }
    
    constructor({id, title} = {}) {
        /**
         * The guild rank id
         */
        this.id = id;

        /**
         * The guild rank title
         */
        this.title = title;
    }

}

export const GUILD_RANKS = {
    0: new PlayerGuildRank({id: 0, title: "Лидер гильдии"}),
    1: new PlayerGuildRank({id: 1, title: "Администратор"}),
    2: new PlayerGuildRank({id: 2, title: "Психиатор"}),
    3: new PlayerGuildRank({id: 3, title: "Менеджер"}),
    4: new PlayerGuildRank({id: 4, title: "Офицер"}),
    5: new PlayerGuildRank({id: 5, title: "Инвестор"}),
    6: new PlayerGuildRank({id: 6, title: "Просвещенный"}),
    7: new PlayerGuildRank({id: 7, title: "Мастер М+"}),
    8: new PlayerGuildRank({id: 8, title: "Интеллигент"}),
    9: new PlayerGuildRank({id: 9, title: "Подмастерье"}),
}