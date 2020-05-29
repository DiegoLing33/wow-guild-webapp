<template>
    <b-container>
        <guild-score-info-common></guild-score-info-common>
        <b-card header="Общий рейтинг Guild Score">
            <b-form-radio-group
                    class="mb-3"
                    v-model="selectedWeek"
                    :options="optionsWeek"
                    buttons
            ></b-form-radio-group>
            <players-selection-view v-on:selected="onPlayersSelected"></players-selection-view>
            <hr/>
            <player-g-s-view class="mb-3" v-for="(player, i) in items"
                             :key="(`${player.name}_lw`)" :player="player" :number="(i+1)"></player-g-s-view>

            <b-button v-if="players.length-limit>0"
                      block class="mt-3" @click="(limit+=15)">Показать еще ({{players.length-limit}})
            </b-button>
        </b-card>
    </b-container>
</template>

<script>
    import GuildScoreInfoCommon from "@/components/common/GuildScoreInfoCommon";
    import PlayerGSView from "@/components/views/PlayerGSView";
    import Guild from "@/app/Guild";
    import PlayersSelectionView from "@/components/views/PlayersSelectionView";


    export default {
        name:       "GuildScoreRatingPage",
        components: {PlayersSelectionView, PlayerGSView, GuildScoreInfoCommon},
        computed:   {
            items() {
                return this.players.slice(0, this.limit);
            }
        },
        mounted() {
            Guild.shared.wait(this.update.bind(this));
        },
        watch:      {
            selectedWeek() {
                this.update()
            }
        },
        data() {
            return {
                selectedWeek:  "guildScore",
                players:       [],
                limit:         15,
                optionsWeek:   [
                    {text: "Всего очков", value: "guildScore"},
                    {text: "Текущая неделя", value: "weekGuildScore"},
                    {text: "Прошлая неделя", value: "lastWeekGuildScore"},
                ],
                playersFilter: [],
            }
        },
        methods:    {
            update() {
                this.players = Guild.shared.getCustomRating(Guild.shared.playersCount * 2,
                    this.selectedWeek).filter(p => {
                    return this.playersFilter.every(player => p.name === player);
                });
            },
            onPlayersSelected(players) {
                this.playersFilter = players;
                this.update();
            }
        },
    }
</script>

<style scoped>

</style>
