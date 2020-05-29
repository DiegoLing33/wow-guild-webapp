<template>
    <b-container>
        <guild-score-info-common></guild-score-info-common>
        <b-card-group deck>
            <b-card header="Guild Score ТОП-5 (Текущая неделя)">
                <player-g-s-view class="mb-3" v-for="(player, i) in week"
                                 :key="(`${player.name}_lw`)" :player="player" :number="(i+1)"></player-g-s-view>
            </b-card>
            <b-card header="Guild Score ТОП-5 (Прошлая неделя)">
                <player-g-s-view class="mb-3" v-for="(player, i) in lastWeek"
                                 :key="(`${player.name}_lw`)" :player="player" :number="(i+1)"></player-g-s-view>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
    import PlayerGSView from "@/components/views/PlayerGSView";
    import Guild from "@/app/Guild";
    import GuildScoreInfoCommon from "@/components/common/GuildScoreInfoCommon";
    export default {
        name: "GuildScorePage",
        components: {GuildScoreInfoCommon, PlayerGSView},
        data(){
            return {
                week: [],
                lastWeek: [],
            }
        },
        mounted(){
            Guild.shared.wait(this.update.bind(this));
        },
        methods:{
            update(){
                this.week = Guild.shared.getRatingWeek(5);
                this.lastWeek = Guild.shared.getRatingLastWeek(5);
            }
        }
    }
</script>

<style scoped>

</style>
