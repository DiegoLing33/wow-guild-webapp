<template>
    <div v-if="hidden === false" class="player-modal d-flex justify-content-center">
        <div @click="hide()" class="bg-block"></div>
        <div class="player-view">
            <div @click="hide()" class="cross">&times;</div>
            <b-card no-body :img-src="image">
                <b-card-body class="text-center">
                    <h2 style="text-align: center">
                        <player-name :player="player" :linked="false"></player-name>
                    </h2>
                    ({{player.rank.title}})
                </b-card-body>
                <b-list-group flush>
                    <b-list-group-item>ГИР: {{player.gear}}</b-list-group-item>
                    <b-list-group-item>Расса: {{player.race.title}}</b-list-group-item>
                    <b-list-group-item>Класс: {{player.class.title}}</b-list-group-item>
                    <b-list-group-item>Guild Score: {{player.guildScore.all}}</b-list-group-item>
                </b-list-group>
                <template v-slot:footer>
                    <router-link :to="'/player/'+player.name">
                    <b-button variant="primary" block>Перейти в профиль</b-button>
                    </router-link>
                    <b-button class="mt-2" @click="hide()" variant="secondary" block>Закрыть</b-button>
                </template>
            </b-card>
        </div>
    </div>
</template>

<script>
    import Player from "../../app/entities/Player";
    import PlayerName from "./PlayerName";
    import UIPlayerOverlay from "../../app/UIPlayerOverlay";

    export default {
        name: "PlayerModal",
        components: {PlayerName},
        data() {
            return {
                player: new Player({}),
                image: null,
                hidden: true,
            }
        },
        mounted() {
            UIPlayerOverlay.component = this;
        },
        methods: {
            show(player) {
                this.player = player;
                this.image = player.image;
                this.hidden = false;
            },
            hide(){
                this.hidden = true;
            }
        }
    }
</script>

<style scoped>
    .player-modal {
        z-index: 999999;
    }

    .player-modal .player-view .cross{
        position: absolute;
        right: -20px;
        top: 10px;
        background-color: #5d0000;
        padding: 5px;
        font-size: 20px;
        width: 40px;
        text-align: center;
        border-radius: 50%;
        z-index: 133;
        cursor: pointer;
        transition: all 0.4s;
    }
    .player-modal .player-view .cross:hover{
        opacity: 0.7;
    }

    .player-modal .bg-block {
        z-index: 10;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.74);
    }

    .player-modal .player-view {
        padding-top: 25px;
        position: fixed;
        top: 0;
        z-index: 122;
        max-width: 90%;
        width: 440px;
    }
</style>