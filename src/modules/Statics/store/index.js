import {GuildAPI} from "prestij.xyz-api";

export const staticsStore = {
        state: () => ({
            statics: [],
        }),
        namespaced: true,
        getters: {
            list: state => state.statics,
        },
        mutations: {
            setStatics(state, payload) {
                state.statics = payload
            }
        },
        actions: {
            loadStatics({commit}) {
                GuildAPI.CreateRequest("statics").then(value => {
                    commit("setStatics", value);
                })
            }
        }
    }
;