import Vue from 'vue'
import App from './App.vue'
import BootstrapVue, {BootstrapVueIcons} from 'bootstrap-vue';
import VueRouter from 'vue-router';


// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue-icons.css';
import './wow-guild.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import {store} from "@/core/store";
import {coreRoutes} from "@/core/route";
import {playersRoutes} from "@/modules/Players/routes";
import {mythicRoutes} from "@/modules/Mythic/routes";
import {authRoutes} from "@/modules/Login/routes";
import {feedRoutes} from "@/modules/Posts/routes";
import CKEditor from 'ckeditor4-vue';
import VueToast from "vue-toast-notification";
import {staticsRouter} from "@/modules/Statics/routes";

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
Vue.use(CKEditor);
Vue.use(VueToast, {
    position: 'top'
});

/**
 * Core router
 * @type {VueRouter}
 */
const router = new VueRouter({
    mode: 'history',
    routes: [
        ...feedRoutes,
        ...authRoutes,
        ...coreRoutes,
        ...playersRoutes,
        ...mythicRoutes,
        ...staticsRouter,
    ]
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
