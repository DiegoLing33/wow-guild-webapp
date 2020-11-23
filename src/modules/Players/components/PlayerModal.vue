<template>
    <div v-if="selectedPlayerWowId" class="player-modal d-flex justify-content-center">
        <div @click="hide" class="bg-block"></div>
        <div class="player-view">
            <div @click="hide" class="cross">&times;</div>
            <b-card no-body :img-src="image">
                <b-card-body class="text-center">
                    <h2 style="text-align: center">
                        <player-name :player="selectedPlayer" :linked="false"></player-name>
                    </h2>
                    ({{ selectedPlayer.getGuildRank().getTitle() }})
                </b-card-body>
                <b-list-group flush>
                    <b-list-group-item>ГИР: {{ selectedPlayer.getGear() }}</b-list-group-item>
                    <b-list-group-item>Расса: {{ selectedPlayer.getRace().getTitle() }}</b-list-group-item>
                    <b-list-group-item>Класс: {{ selectedPlayer.getClass().getTitle() }}</b-list-group-item>
                    <b-list-group-item>Активность: {{ selectedPlayer.getActivityPoints() }}</b-list-group-item>
                </b-list-group>
                <template v-slot:footer>
                    <!--                    <router-link :to="'/player/'+selectedPlayer.name">-->
                    <!--                        <b-button disabled variant="primary" block>Перейти в профиль</b-button>-->
                    <!--                    </router-link>-->
                    <b-button
                        class="mt-2"
                        @click="hide"
                        variant="secondary"
                        block
                    >
                        Закрыть
                    </b-button>
                </template>
            </b-card>
        </div>
    </div>
</template>

<script>
import PlayerName from "../../Player/components/PlayerName";

export default {
    name: "PlayerModal",
    components: {PlayerName},
    mounted() {

    },
    computed: {
        selectedPlayerWowId() {
            return this.$store.getters["players/showPlayerOverlay"];
        },
        selectedPlayer() {
            return this.$store.getters["players/players"]
                .find(value => value.raw.wow_id === this.selectedPlayerWowId);
        },
        image() {
            return `http://server.prestij.xyz/static/characters/${this.selectedPlayer.getName().toLowerCase()}_avatar.png`
        }
    },
    methods: {
        /**
         * Hides the modal
         */
        hide() {
            this.$store.dispatch('players/setPlayerOverlay', null);
        }
    },
}
</script>

<style scoped>
.player-modal {
    z-index: 999999;
}

.player-modal .player-view .cross {
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

.player-modal .player-view .cross:hover {
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
