<template>
    <b-container :key="(name+'_page')">
        <b-card-group deck class="mb-3">
            <b-card no-body>
                <div style="text-align: center; text-transform: uppercase; font-weight: 100">
                    <b-card-body>
                        <h2><img :alt="(`${player.name} spec`)" :src="specImage" class="spec-image"/>
                            {{player.name}}</h2>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>Уровень: {{player.level}}</b-list-group-item>
                        <b-list-group-item>ГИР: {{player.gear}}</b-list-group-item>
                        <b-list-group-item>GS: {{player.guildScore}}</b-list-group-item>
                    </b-list-group>
                </div>
            </b-card>
            <b-card header="Информация">
                <b-row>
                    <b-col sm="6">Расса:</b-col>
                    <b-col sm="6"><b>{{player.race.name}}</b></b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">Класс:</b-col>
                    <b-col sm="6"><b>{{player.class.name}}</b></b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">Специализация:</b-col>
                    <b-col sm="6"><b>{{player.spec.name}}</b></b-col>
                </b-row>
                <b-row>
                    <b-col sm="6">Week Guild Score:</b-col>
                    <b-col sm="6"><b>{{player.weekGuildScore}}</b></b-col>
                </b-row>
            </b-card>
        </b-card-group>
        <b-card class="text-center">Информация о прохождениях M+</b-card>
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
    import SpecUtils from "@/app/players/SpecUtils";
    import GameData from "@/data/GameData";
    import MythicUtils from "@/app/MythicUtils";
    import Guild from "@/app/Guild";
    import MythicCardsDeck from "@/components/mythic/MythicCardsDeck";

    export default {
        name:       "WarriorPage",
        components: {MythicCardsDeck},
        props:      ["name"],
        watch:      {
            $route() {
                this.update();
            },
            selectedFilters() {
                this.filter();
            },
        },
        data() {
            return {
                player:    {race: {name: ""}, class: {name: ""}, spec: {name: "", id: 106}},
                specImage: null,
                mythic:    [],
                items:     [],
                count:     0,

                keystones:{
                    counter:{
                        countDoneInTime:0,
                        countWithGuild: 0,
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
                this.specImage = SpecUtils.getImage(GameData.specIdToTypeId(this.player.spec.id));
                this.mythic    = MythicUtils.getSortedByLevel(MythicUtils.getUniqueTeamMythicList(Guild.shared.getMythicByName(this.player.name)));
            },
        }
    }
</script>

<style scoped>
    .spec-image {
        height: 35px;
    }
</style>
