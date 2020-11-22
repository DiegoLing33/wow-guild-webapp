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
         * The guild rank postTitle
         */
        this.title = title;
    }

}

export const GUILD_RANKS = {
    0: new PlayerGuildRank({id: 0, postTitle: "Лидер гильдии"}),
    1: new PlayerGuildRank({id: 1, postTitle: "Администратор"}),
    2: new PlayerGuildRank({id: 2, postTitle: "?"}),
    3: new PlayerGuildRank({id: 3, postTitle: "Офицер"}),
    4: new PlayerGuildRank({id: 4, postTitle: "?"}),
    5: new PlayerGuildRank({id: 5, postTitle: "?"}),
    6: new PlayerGuildRank({id: 6, postTitle: "?"}),
    7: new PlayerGuildRank({id: 7, postTitle: "?"}),
    8: new PlayerGuildRank({id: 8, postTitle: "?"}),
    9: new PlayerGuildRank({id: 9, postTitle: "?"}),
}