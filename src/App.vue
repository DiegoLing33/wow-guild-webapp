<template>
    <div id="app">
        <APILoader/>
        <navigation-bar></navigation-bar>
        <player-modal></player-modal>
        <div class="main-content">
            <div class="logo-content">
                <div class="main-title">{{ $store.getters["guild/name"] }}</div>
                <div class="sub-title">Гильдия World Of Warcraft</div>
                <sub-menu></sub-menu>
            </div>
            <router-view></router-view>
            <footer class="mt-3">
                Powered and Developed by <a href="http://ling.black">Yakov Ling</a>
                with uses of <a href="http://develop.battle.net">Battle.net</a> (BLIZZARD ENTERTAINMENT, INC) API
                <br/>
                All Rights Reserved &copy; 2020
            </footer>
        </div>
    </div>
</template>

<script>

import SubMenu from "@/core/components/SubMenu";
import NavigationBar from "@/core/components/NavigationBar";
import PlayerModal from "./modules/Players/components/PlayerModal";
import APILoader from "@/modules/API/compopents/APILoader";

export default {
    name: 'App',
    components: {
        APILoader,
        PlayerModal,
        NavigationBar,
        SubMenu,
    },
    async mounted() {
        this.$store.dispatch("initAuthorization").then()
        this.$store.dispatch("guild/updateGuildInfo").then(() => {
            this.$store.dispatch("players/updatePlayers").then(() => {
                this.$store.dispatch("mythic/update");
            });
            this.$store.dispatch("players/activity/update").then();
        });
    },
}
</script>

<style lang="scss">
:root {
    --class-war: rgb(199, 156, 110);
    --class-paladin: rgb(245, 140, 186);
    --class-hunter: rgb(169, 210, 113);
    --class-rogue: rgb(245, 140, 186);
    --class-priest: rgb(255, 255, 255);
    --class-dk: rgb(196, 31, 59);
    --class-shaman: rgb(0, 112, 222);
    --class-mage: rgb(64, 199, 235);
    --class-warlock: rgb(147, 130, 201);
    --class-monk: rgb(0, 255, 150);
    --class-druid: rgb(255, 125, 106);
    --class-dh: rgb(163, 48, 201);
}

$p_classes: "war", "paladin", "hunter", "rogue", "priest", "dk",
"shaman", "mage", "warlock", "monk", "druid", "dh";

@each $p_c in $p_classes {

    // Color styles
    .#{$p_c} {
        color: var(--class-#{$p_c}) !important;
    }
    // Border color styles
    .#{$p_c}-bc {
        border-color: var(--class-#{$p_c}) !important;
    }
    // Background color styles
    .#{$p_c}-bg {
        background-color: var(--class-#{$p_c}) !important;
    }
}

.v-toast__item--error {
    background-color: #9d0404 !important;
}
</style>

<style>
body {
    background-color: #212121 !important;
    color: #e7e7e7 !important;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #2a2a2a !important;
    border: none !important;
}

.card {
    background-color: #3b3b3b !important;
}

.logo-content {
    text-align: center;
    margin-top: 20px;
}

.main-title {
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 100;
    color: white;
}

.sub-title {
    text-align: center;
    color: #e7e7e7;
}

#app {
    font-family: "PT Mono", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.wrapper {
    padding-top: 40px;
}

.sidecol {
    padding: 0 !important;
    border-radius: 0.5rem;

}

.sidecol .content {
    padding: 2px;
}

.maincol {
    padding: 0 15px;
}

.image-text {
    text-align: center;
    padding: 10px;
    color: whitesmoke;
    font-size: 20px;
}

.image-sub-text {
    text-align: center;
    padding: 10px;
    margin-top: -20px;
    color: whitesmoke;
    font-size: 13px;
}

.image-bar {

}

.pony-image {
    width: 100%;
    border-radius: 0.7rem;
}

.logo {
    text-align: center;
    padding-bottom: 20px;
}

footer {
    text-align: center;
    font-size: 10px;
    opacity: 0.5;
    text-transform: uppercase;
}

.b-overlay {
    z-index: 10010 !important;
}

footer {
    text-align: center;
    font-size: 10px;
    opacity: 0.5;
    text-transform: uppercase;
    margin-bottom: 20px;
}

.back-button {
    padding: 5px;
    margin: 8px;
    cursor: pointer;

    background: rgb(52, 52, 52);
    background: linear-gradient(0deg, rgba(52, 52, 52, 1) 0%, rgba(28, 28, 28, 1) 88%, rgba(37, 37, 37, 1) 94%, rgba(18, 18, 18, 1) 100%);
}
</style>
