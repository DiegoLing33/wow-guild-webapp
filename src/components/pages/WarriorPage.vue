<template>
    <b-container :key="(name+'_page')">
        <b-card-group deck class="mb-3">
            <b-card no-body>
                <div style="text-align: center; text-transform: uppercase; font-weight: 100">
                    <b-card-body>
                        <h2>
                            <player-name :linked="false" :player="player"></player-name>
                        </h2>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>Уровень: {{player.level}}</b-list-group-item>
                        <b-list-group-item>ГИР: {{player.gear}}</b-list-group-item>
                        <b-list-group-item>GS: {{player.guildScore.all}}</b-list-group-item>
                    </b-list-group>
                </div>
            </b-card>
            <b-card header="Информация">
                <b-row>
                    <b-col sm="6">Расса:</b-col>
                    <b-col sm="6"><b>{{player.race.title}}</b></b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">Класс:</b-col>
                    <b-col sm="6"><b>{{player.class.title}}</b></b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">Специализация:</b-col>
                    <b-col sm="6"><b>{{player.specialization.title}}</b></b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">Week Guild Score:</b-col>
                    <b-col sm="6"><b>{{player.guildScore.thisWeek}}</b></b-col>
                </b-row>
            </b-card>
        </b-card-group>

        <div>
            <b-button variant="primary" block v-b-toggle.gs-graph class="my-4">Активность Guild Score</b-button>
            <b-collapse id="gs-graph">
                <b-card class="mb-3">
                    <line-chart height="200" :options="{responsive: true}" :chart-data="datacollection"></line-chart>
                </b-card>
            </b-collapse>
        </div>

        <b-card class="text-center mb-3">Информация о прохождениях M+</b-card>
        <template v-if="mythic.length > 0">
            <mythic-cards-deck :filters="['done', 'broken', 'guild', 'lfr']" :mythic-list="mythic"></mythic-cards-deck>
        </template>
        <template v-else>
            <b-alert variant="warning" :show="true">
                Игрок с ником {{player.name}} еще не был в ключах.
            </b-alert>
        </template>
    </b-container>
</template>

<script>
    import Guild from "@/app/Guild";
    import MythicCardsDeck from "@/components/mythic/MythicCardsDeck";
    import PlayerName from "../player/PlayerName";
    import Player from "../../app/entities/Player";
    import LineChart from "@/components/LineChart";
    import DateUtils from "@/app/utils/DateUtils";

    export default {
        name:       "WarriorPage",
        components: {LineChart, PlayerName, MythicCardsDeck},
        props:      ["name"],
        watch:      {
            selectedFilters() {
                this.filter();
            },
            $route() {
                this.update();
            }
        },
        data() {
            return {
                player:         new Player({}),
                specImage:      null,
                datacollection: {
                    datasets: []
                },
                mythic:         [],
                items:          [],
                count:          0,

                keystones: {
                    counter: {
                        countDoneInTime: 0,
                        countWithGuild:  0,
                    }
                },
            }
        },
        mounted() {
            Guild.shared.wait(this.update.bind(this));
        },
        methods:    {
            update() {
                this.player    = Guild.shared.getPlayer(this.name);
                this.specImage = this.player.role.image;
                this.mythic    = Guild.shared.getMythicByName(this.player.name);
                this.fillData();
            },
            fillData() {
                const src           = this.mythicUtilsGet(this.mythic);
                this.datacollection = {
                    labels:   Object.keys(src),
                    datasets: [{
                        label:           "Guild Score",
                        backgroundColor: '#9ff879',
                        data:            Object.values(src),
                    }],
                };
            },

            mythicUtilsGet(mythic) {
                let _items = {};
                mythic.forEach((m) => {
                    const key = DateUtils.format(m.completed).split(" ")[0];
                    if (_items[key] === undefined) _items[key] = 0;
                    _items[key] += m.guildScore;
                });
                return _items;
            },
        }
    }
</script>

<style scoped>
    .spec-image {
        height: 35px;
    }
</style>
