<template>
        <div class="sticky-top" style="padding-top: 10px">
            <div class="image-bar" style="background-color: rgb(43, 43, 43); border-radius: 0.5rem; ">
                <div class="image-text">
                    Престиж
                </div>
                <div class="image-sub-text">
                    <b-icon-people-fill></b-icon-people-fill>
                    {{guild.players}}
                    <b-icon-award-fill></b-icon-award-fill>
                    {{guild.achievement_points}}
                </div>
                <img class="pony-image" :src="pony" alt="Логотип гильдии Престиж">
            </div>
            <div class="content">

            </div>
            <footer class="mt-3">
                Powered and Developed by <a href="http://ling.black">Yakov Ling</a>
                with uses of <a href="http://develop.battle.net">Battle.net</a> (BLIZZARD ENTERTAINMENT, INC) API
                <br />
                All Rights Reserved &copy; 2020
            </footer>
        </div>
</template>

<script>
    import pony from "@/assets/pony.png";

    export default {
        name: "BodySidebar",
        props: ["guild"],
        data(){
            return {
                pony,
            }
        }
    }
</script>

<style scoped>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
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
</style>
