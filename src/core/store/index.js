import Vuex from "vuex";
import Vue from "vue";
import {mythicStore} from "@/modules/Mythic/store/mythicStore";
import {loginStore} from "@/modules/Login/store";
import {apiStore} from "@/modules/API/store";
import {postsStore} from "@/modules/Posts/store";
import {playersStore} from "@/modules/Players/store";
import {staticsStore} from "@/modules/Statics/store";

Vue.use(Vuex);

/**
 * The index store
 */
export const store = new Vuex.Store({
    state: {
        authCode: '123',
        authToken: '',
        userId: 0,
        battletag: '',
    },
    modules: {
        login: loginStore,
        mythic: mythicStore,
        apiStore,
        posts: postsStore,
        players: playersStore,
        statics: staticsStore,
    },
    getters: {},
    mutations: {},
    actions: {},
});