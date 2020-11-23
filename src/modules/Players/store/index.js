import {GuildAPI} from "prestij.xyz-api";
import {playersActivityStore} from "@/modules/API/store/playersActivity";

export const playersStore = {
    namespaced: true,
    state: () => ({
        players: [],
        showPlayerOverlay: null,
    }),
    getters: {
        players: (state) => state.players,
        showPlayerOverlay: (state) => state.showPlayerOverlay,

        /**
         * Returns the guild player by name
         * @param state
         * @return {function(*): unknown}
         */
        playerWithName: (state) => (name) => state.players.find(v => v.raw.name.toLowerCase() === name.toLowerCase()),

        /**
         * Returns the guild player by WID
         * @param state
         * @return {function(*): unknown}
         */
        playerWithWID: (state) => (wow_id) => state.players.find(v => v.raw.wow_id === wow_id),
    },
    mutations: {
        setPlayers: (state, payload) => state.players = payload,
        showOverlay: (state, payload) => state.showPlayerOverlay = payload,
    },
    actions: {
        /**
         * Sets the player overlay
         * @param commit
         * @param payload
         */
        setPlayerOverlay({commit}, payload) {
            commit("showOverlay", payload);
        },
        async updatePlayers({commit, rootGetters}) {
            commit('loader', {
                max: rootGetters['guild/playersCount'],
                current: 0,
                text: `Загрузка персонажей: `
            }, {root: true});
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