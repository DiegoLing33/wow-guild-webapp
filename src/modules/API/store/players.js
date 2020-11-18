import {GuildAPI} from "prestij.xyz-api";
import {playersActivityStore} from "@/modules/API/store/playersActivity";

export const playersStore = {
    namespaced: true,
    state: () => ({
        players: [],
    }),
    getters: {
        players: (state) => state.players,
    },
    mutations: {
        setPlayers: (state, payload) => state.players = payload,
    },
    actions: {
        async updatePlayers({commit, rootGetters}) {
            commit('loader', {max: rootGetters['guild/playersCount'], current: 0, text: `Загрузка персонажей: `}, {root: true});
            const players = await GuildAPI.GetAll(GuildAPI.GetCharacters, (all, current) => {
                commit('loader', {max: all, current, text: `Загрузка персонажей: `}, {root: true});
            });
            commit("setPlayers", players);
        }
    },
    modules: {
        activity: playersActivityStore,
    },
};