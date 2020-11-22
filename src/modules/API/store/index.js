import {guildStore} from "@/modules/API/store/guild";
import {playersStore} from "@/modules/API/store/players";

export const apiStore = {
    modules: {
        guild: guildStore,
        players: playersStore,
    },
    state: () => ({
        loaderMax: 1,
        loaderCurrent: 1,
        loaderText: '',
        loaderEnds: false,
    }),
    getters: {
        loaderMax: s => s.loaderMax,
        loaderCurrent: s => s.loaderCurrent,
        loaderText: s => s.loaderText,

        shouldLoaderDisplay(state) {
            return state.loaderCurrent < state.loaderMax
        }
    },
    mutations: {
        loader(state, payload) {
            state.loaderMax = payload.max ?? 1;
            state.loaderCurrent = payload.current ?? 0;
            state.loaderText = payload.text;
            state.loaderEnds = state.loaderCurrent >= state.loaderMax;
        }
    }
};