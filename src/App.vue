<template>
    <div id="app">
        <navigation-bar></navigation-bar>
        <player-modal></player-modal>
        <loader-screen ref="loader"></loader-screen>
        <div class="main-content">
            <div class="logo-content">
                <div class="main-title">Престиж</div>
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

    import LoaderScreen from "@/components/LoaderScreen";
    import SubMenu from "@/components/navigation/SubMenu";
    import Guild from "@/app/Guild";
    import NavigationBar from "@/components/navigation/NavigationBar";
    import PlayerModal from "./components/player/PlayerModal";
    import UIPlayerOverlay from "./app/UIPlayerOverlay";

    export default {
        name: 'App',
        components: {
            PlayerModal,
            NavigationBar,
            SubMenu,
            LoaderScreen,
        },
        async mounted() {

            await Guild.shared.updateGuild(this.$refs.loader.updateBar.bind(this));
            await Guild.shared.updatePlayers(this.$refs.loader.updateBar.bind(this));
            await Guild.shared.updateMythic(this.$refs.loader.updateBar.bind(this));
            this.$refs.loader.display(false);
        },
        data() {
            return {
                guild: {achievement_points: 0, players: 0, created: 0},
            }
        },
        watch: {
            $route() {
                UIPlayerOverlay.hide();
            },
        }
    }
</script>

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
