import Vue from 'vue'
import App from './App.vue'
import BootstrapVue, {BootstrapVueIcons} from 'bootstrap-vue';
import VueRouter from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.css'

import IndexPage from "@/components/pages/IndexPage";
import PlayersPage from "@/components/pages/PlayersPage";
import VersionsPage from "@/components/pages/VersionsPage";
import MythicPage from "@/components/pages/MythicPage";
import WarriorPage from "@/components/pages/WarriorPage";
import LeaversPage from "@/components/pages/LeaversPage";
import GuildScorePage from "@/components/pages/GuildScore/GuildScorePage";
import GuildSocreCalcPage from "@/components/pages/GuildScore/GuildSocreCalcPage";
import GuildScoreRatingPage from "@/components/pages/GuildScore/GuildScoreRatingPage";

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: IndexPage },
    { path: '/players', component: PlayersPage },
    { path: '/leavers', component: LeaversPage },
    { path: '/mythic', component: MythicPage },
    { path: '/score', component: GuildScorePage },
    { path: '/score/calc', component: GuildSocreCalcPage },
    { path: '/score/rating', component: GuildScoreRatingPage },
    { path: '/versions', component: VersionsPage },
    { path: '/player/:name', component: WarriorPage, props: true },
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
