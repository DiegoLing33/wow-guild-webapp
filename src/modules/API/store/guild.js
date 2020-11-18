import {GuildAPI} from "prestij.xyz-api";

export const guildStore = {
    namespaced: true,
    state: () => ({
        guildName: '',
        guildPlayersCount: 0,
        guildCreatedTimestamp: 0,
        guildFactionName: 0,
        guildCrestEmblemUrl: '',
        guildCrestBackgroundColor: '',
        guildAchievementPoints: 0,
    }),
    getters: {
        name: (state) => state.guildName,
        factionName: (state) => state.guildFactionName,

        playersCount: (state) => state.guildPlayersCount,
        createdTimestamp: (state) => state.guildCreatedTimestamp,
        achievementPoints: (state) => state.guildAchievementPoints,

        crestBackgroundColor: (state) => state.guildCrestBackgroundColor.split(',')
            .map(v => parseInt(v.trim())),
        crestEmblemUrl: (state) => state.guildCrestEmblemUrl,
    },
    mutations: {
        updateData(state, payload) {

            state.guildName = payload['guild_name'] || 'Unnamed';
            state.guildPlayersCount = payload['players'] || 0;
            state.guildCreatedTimestamp = payload['created_timestamp'] || 0;

            state.guildFactionName = payload['faction_name'] || 'Alirda?';
            state.guildAchievementPoints = payload['achievement_points'] || 0;

            state.guildCrestEmblemUrl = payload['crest_emblem_url'] || '';
            state.guildCrestBackgroundColor = payload['crest_background_color'] || '';
        },
    },
    actions: {
        /**
         * Updates guild data
         * @param commit
         * @return {Promise<void>}
         */
        updateGuildInfo({commit}) {
            commit("loader", {max: 1, current: 0, text: 'Получение данных о гильдии: '}, {root: true});
            GuildAPI.GetGuildObject().then(value => {
                commit("updateData", value);
                commit("loader", {max: 1, current: 1, text: 'Получение данных о гильдии: '}, {root: true});
            });
        },
    },
};