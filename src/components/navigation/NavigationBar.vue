<template>
    <div>
        <b-navbar
            :style="({backgroundColor: navBackgroundColor, borderBottom: `4px solid ${navColor}`, '--color': navBorderColor})"
            type="dark" toggleable="sm">
            <router-link class="navbar-brand nav-link brand" to="/">
                <img style="height: 40px" :src="$store.getters['guild/crestEmblemUrl']"/>
            </router-link>
            <b-navbar-toggle target="nav">
                <template v-slot:default="{ expanded }">
                    <b-button v-if="expanded">Меню
                        <b-icon icon="chevron-bar-up"></b-icon>
                    </b-button>
                    <b-button v-else>Меню
                        <b-icon icon="chevron-bar-down"></b-icon>
                    </b-button>
                </template>
            </b-navbar-toggle>

            <b-collapse id="nav" is-nav>
                <b-navbar-nav>
                    <router-link class="nav-item nav-link" to="/"><img :src="require('@/assets/book.svg')"/>Главная</router-link>
                    <b-nav-dropdown>
                        <template v-slot:button-content>
                            <img :src="require('@/assets/miscellaneous.svg')"/>Игроки
                        </template>
                        <li>
                            <router-link class="dropdown-item" to="/players">
                                <img :src="require('@/assets/checklist.svg')"/> Список игроков
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/leavers">
                                <img :src="require('@/assets/tombstone.svg')"/> Покинули гильдию
                            </router-link>
                        </li>
                    </b-nav-dropdown>
                    <router-link class="nav-item nav-link" to="/mythic"><img :src="require('@/assets/dungeon.png')"/>Mythic+</router-link>
                    <router-link class="nav-item nav-link" to="/addons"><img :src="require('./addons.svg')"/>Аддоны</router-link>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <a v-if="$store.getters.battleTag === ''" class="nav-item nav-link" :href="getAuthURL()">
                        <img :src="require('@/modules/Login/resources/bnet-large.png')"/> Авторизация
                    </a>
                    <b-nav-dropdown v-else>
                        <template v-slot:button-content>
                            <img :src="require('@/modules/Login/resources/bnet-large.png')"/> {{ $store.getters.battleTag }}
                        </template>
                        <li>
                            <router-link class="dropdown-item" to="/post/create">
                                <img :src="require('@/assets/checklist.svg')"/> Создать запись
                            </router-link>
                        </li>
                    </b-nav-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import BlizzardAuthService from "@/modules/Login/service/BlizzardAuthService";

export default {
    name: "NavigationBar",
    computed: {
        navBackgroundColor() {
            const rgba = this.$store.getters["guild/crestBackgroundColor"];
            return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0.72)`;
        },
        navBorderColor(){
            const rgba = this.$store.getters["guild/crestBackgroundColor"];
            return increase_brightness(rgba[0], rgba[1], rgba[2], 40);
        },
        navColor(){
            const rgba = this.$store.getters["guild/crestBackgroundColor"];
            return increase_brightness(rgba[0], rgba[1], rgba[2], 72);
        }
    },
    methods: {
        getAuthURL() {
            return BlizzardAuthService.getAuthURL();
        }
    }
}

function increase_brightness(r, g, b, percent) {
    return '#' +
        ((0 | (1 << 8) + r * (1 - percent / 100)).toString(16)).substr(1) +
        ((0 | (1 << 8) + g * (1 - percent / 100)).toString(16)).substr(1) +
        ((0 | (1 << 8) + b * (1 - percent / 100)).toString(16)).substr(1);
}
</script>

<style>
:root {
    --color: blockquote;
}

.dropdown .nav-link {
    padding: 0 !important;
    color: white !important;
}

.dropdown-item {
    transition: all 0.2s;
    color: #16181b;
}

.dropdown-item:hover, .dropdown-item:focus {
    color: #d7e2ea !important;
    text-decoration: none;
}

.dropdown-item:hover, .dropdown-item:focus {
    background-color: var(--color) !important;
}
</style>
<style scoped>
.navbar {
    padding: 15px;
}

.navbar-toggler {
    border: none;
}

.show .nav-item {
    margin-top: 0;
    margin-bottom: 0;
}

.nav-item {
    margin-top: -15px;
    margin-bottom: -15px;
    transition: all 0.5s;
    padding: 15px 15px !important;
    background-color: transparent;
    color: white !important;
}

.nav-item:hover {
    background-color: rgba(0, 0, 0, 0.33);
}

.brand {
    margin-top: -15px;
    margin-bottom: -15px;
    border: none;
    background: none;
}

.nav-link img, .dropdown-item img {
    height: 20px;
    margin-right: 5px;
}


</style>
