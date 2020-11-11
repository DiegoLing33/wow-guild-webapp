<template>
    <div>
        <b-navbar
                :style="({backgroundColor: navColor, borderBottom: `4px solid ${navColor}`, '--color': navBorderColor})"
                type="dark" toggleable="sm">
            <router-link class="navbar-brand nav-link brand" to="/">
                <img style="height: 40px" :src="navImage"/>
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
                    <router-link class="nav-item nav-link" to="/"><img :src="book"/>Главная</router-link>
                    <b-nav-dropdown>
                        <template v-slot:button-content>
                            <img :src="warriors"/>Игроки
                        </template>
                        <li>
                            <router-link class="dropdown-item" to="/players">
                                <img :src="checklist"/> Список игроков
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/leavers">
                                <img :src="tombstone"/> Покинули гильдию
                            </router-link>
                        </li>
                    </b-nav-dropdown>
<!--                    <b-nav-dropdown>-->
<!--                        <template v-slot:button-content>-->
<!--                            <img :src="medal"/>Guild Score-->
<!--                        </template>-->
<!--                        <li>-->
<!--                            <router-link class="dropdown-item" to="/score">-->
<!--                                <img :src="star"/> ТОП-5 GS-->
<!--                            </router-link>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <router-link class="dropdown-item" to="/score/rating">-->
<!--                                <img :src="rating"/> Общий рейтинг GS-->
<!--                            </router-link>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <router-link class="dropdown-item" to="/score/calc">-->
<!--                                <img :src="clipboard"/> Калькулятор GS-->
<!--                            </router-link>-->
<!--                        </li>-->
<!--                    </b-nav-dropdown>-->
                    <router-link class="nav-item nav-link" to="/mythic"><img :src="dungeon"/>Mythic+</router-link>
                    <router-link class="nav-item nav-link" to="/versions"><img :src="log"/>Версии</router-link>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <a v-if="$store.getters.battleTag === ''" class="nav-item nav-link" :href="getAuthURL()" >
                        <img :src="bnet"/> Авторизация
                    </a>
                    <router-link class="nav-item nav-link" to="/profile" v-else :href="getAuthURL()" >
                        <img :src="bnet"/> {{$store.getters.battleTag}}
                    </router-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import book from "@/assets/book.svg";
    import log from "@/assets/log.svg";
    import warriors from "@/assets/miscellaneous.svg";
    import dungeon from "@/assets/dungeon.png";
    import checklist from "@/assets/checklist.svg";
    import tombstone from "@/assets/tombstone.svg";
    import medal from "@/assets/medal.svg";
    import clipboard from "@/assets/clipboard.svg";
    import star from "@/assets/star.svg";
    import rating from "@/assets/rating.svg";
    import bnet from "@/modules/Login/resources/bnet-large.png";

    import Guild from "@/app/Guild";
    import BlizzardAuthService from "@/modules/Login/service/BlizzardAuthService";

    export default {
        name:    "NavigationBar",
        data() {
            return {
                bnet,
                book,
                log,
                warriors,
                dungeon,
                checklist,
                tombstone,
                medal,
                clipboard,
                star,
                rating,

                navColor:       "rgb(0, 0, 0)",
                navBorderColor: "rgb(0, 0, 0)",
                navImage:       null,
            }
        },
        mounted() {
            Guild.shared.wait(this.update.bind(this));
        },
        methods: {
            update() {
                this.navImage       = Guild.shared.crest_emblem;
                const rgba          = Guild.shared.crest_background_color.split(",");
                this.navColor       = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0.72)`;
                this.navBorderColor = increase_brightness(rgba[0], rgba[1], rgba[2], 40);
            },
            getAuthURL(){
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
