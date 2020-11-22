import {GuildAPI} from "prestij.xyz-api";

export const mythicStore = {
    state: () => ({
        mythic: [],
    }),
    namespaced: true,
    getters: {
        mythic: state => state.mythic,
    },
    mutations: {
        setMythicList(state, payload) {
            state.mythic = payload;
        }
    },
    actions: {
        async update({commit}) {
            commit('loader', {
                max: 1,
                current: 0,
                text: `Загрузка подземелий: `
            }, {root: true});
            const mythic = await GuildAPI.GetAll(GuildAPI.GetMythic, (all, current) => {
                commit('loader', {max: all, current, text: `Загрузка подземелий: `}, {root: true});
            });
            commit("setMythicList", mythic.filter(value => value.getMembers().length === 5 && value.getGuildPlayers() > 0));
        }
    },
};