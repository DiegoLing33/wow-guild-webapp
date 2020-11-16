import Vue from 'vue'
import App from './App.vue'
import BootstrapVue, {BootstrapVueIcons} from 'bootstrap-vue';
import VueRouter from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.css'
import './wow-guild.css';

import IndexPage from "./components/pages/IndexPage";
import PlayersPage from "./components/pages/PlayersPage";
import VersionsPage from "./components/pages/VersionsPage";
import MythicPage from "./components/pages/MythicPage";
import WarriorPage from "./components/pages/WarriorPage";
import LeaversPage from "./components/pages/LeaversPage";
import GuildScorePage from "./components/pages/GuildScore/GuildScorePage";
import GuildSocreCalcPage from "./components/pages/GuildScore/GuildSocreCalcPage";
import GuildScoreRatingPage from "./components/pages/GuildScore/GuildScoreRatingPage";
import DevelopPage from "./components/pages/DevelopPage";
import Vuex from "vuex";
import BlizzardAuthService from "@/modules/Login/service/BlizzardAuthService";
import {apiStore} from "@/modules/API/store";

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);

const store = new Vuex.Store({
    state: {
        authCode: '123',
        authToken: '',
        userId: 0,
        battletag: '',
    },
    modules:{
      apiStore,
    },
    getters: {
        authCode: state => state.authCode,
        authToken: state => state.authToken,
        battleTag: state => state.battletag,
        userId: state => state.userId,
    },
    mutations: {
        setAuthCode: (state, payload) => {
            state.authCode = payload;
        },
        setToken(state, payload) {
            state.authToken = payload;
        },
        setAuth(state, payload) {
            state.userId = payload.id;
            state.battletag = payload.battletag;
        },
    },
    actions: {
        initAuthorization: async (inject) => {
            // Token
            const localToken = localStorage.getItem('token');
            if (localToken) await inject.dispatch("authByToken", localToken);

            // Code
            const url = new URL(window.location);
            const code = url.searchParams.get('code');

            if (code && code !== '') {
                console.log('Code: ' + code);
                const token = await inject.dispatch("authByCode", code);
                console.log('Token: ' + token);
                if (token !== false) {
                    await inject.dispatch("authByToken", token);
                }
            }
        },

        /**
         * Authorization by token
         *
         * @param inject
         * @param payload
         * @return {Promise<unknown>}
         */
        authByToken: async (inject, payload) => {
            return new Promise((resolve) => {
                BlizzardAuthService.getUserInfo(payload)
                    .then((data) => {
                        inject.commit("setAuth", data);
                        resolve(true)
                    })
                    .catch(() => resolve(false));
            });
        },

        /**
         * Authorization by code
         *
         * @param inject
         * @param payload
         * @return {Promise<unknown>}
         */
        authByCode: async (inject, payload) => {
            return new Promise(resolve => {
                BlizzardAuthService.getAuthToken(payload).then(result => {
                    if (result !== null) {
                        inject.commit("setAuthCode", payload);
                        inject.commit("setToken", result['access_token']);
                        localStorage.setItem('token', result['access_token']);
                        resolve(result['access_token']);
                    } else {
                        console.log('Error');
                        resolve(false);
                    }
                });
            });
        },
    },
});

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: IndexPage},
        {path: '/players', component: PlayersPage},
        {path: '/dev', component: DevelopPage},
        {path: '/leavers', component: LeaversPage},
        {path: '/mythic', component: MythicPage},
        {path: '/score', component: GuildScorePage},
        {path: '/score/calc', component: GuildSocreCalcPage},
        {path: '/score/rating', component: GuildScoreRatingPage},
        {path: '/versions', component: VersionsPage},
        {path: '/player/:name', component: WarriorPage, props: true},
    ]
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
