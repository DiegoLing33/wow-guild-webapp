/**
 * Players activity state
 */
import {GuildAPI} from "prestij.xyz-api";

export const playersActivityStore = {
    namespaced: true,
    state: () => ({
        maxActivity: 0,
        maxPlayer: null,
        players: [],
    }),
    getters: {
        maxActivity: state => state.maxActivity,
        maxPlayer: state => state.maxPlayer,
        players: state => state.players,
        byWID: (state) => (wid) => {
            return state.players.find(value => {
                return value.raw.wow_id === wid;
            })
        },
    },
    mutations: {
        setup: (state, payload) => {
            state.players = payload.players;
            state.maxPlayer = payload.maxPlayer;
            state.maxActivity = payload.maxActivity;
        },
    },
    actions: {
        async update({commit}) {
            const activity = await GuildAPI.GetActivity();
            commit("setup", {
                players: activity.getPlayers(),
                maxPlayer: activity.getMaxActivePlayer(),
                maxActivity: activity.getMaxActivityPoints(),
            });
        },
    },
};