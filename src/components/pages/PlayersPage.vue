<template>
    <div>
        <b-container>
            <players-table-filter :handler="handleFilterChanges" class="mb-3"></players-table-filter>
            <div class="my-3">
                Отображено результатов: <b>{{ items.length }}</b>
            </div>
            <b-table :busy="busy" bordered :items="guildPlayers" :fields="fields">
                <template v-slot:cell(name)="row">
                    <player-name :player="row.item"></player-name>
                </template>
<!--                <template v-slot:cell(rank.id)="row">-->
<!--                    {{ row.item.rank.title }}-->
<!--                </template>-->
<!--                <template v-slot:cell(class)="row">-->
<!--                    {{ row.item.class.title }}-->
<!--                </template>-->
<!--                <template v-slot:cell(spec)="row">-->
<!--                    <img class="spec-image" :src="row.item.role.image"/>-->
<!--                    {{ row.item.specialization.title }}-->
<!--                </template>-->
<!--                <template v-slot:cell(gear)="row">-->
<!--                    {{ row.item.gear }}-->
<!--                </template>-->
<!--                <template v-slot:cell(activity)="row">-->
<!--                    <player-activity :player="row.item"/>-->
<!--                </template>-->
<!--                <template v-slot:cell(realname)="row">-->
<!--                    {{ row.item.raw.realname }}-->
<!--                </template>-->
<!--                <template v-slot:cell(name)>-->

<!--                </template>-->
            </b-table>
            <margin top="20" bottom="20" class="text-muted">
                Мета информация:
            </margin>
            <b-textarea readonly v-model="countedMetaData" rows="6"/>
        </b-container>
    </div>
</template>

<script>
import shield from "@/assets/types/security.svg";
import heal from "@/assets/types/health.svg";
import swords from "@/assets/types/sword.svg";
import bow from "@/assets/types/bow-and-arrow.svg";
import PlayersTableFilter from "@/components/PlayersTableFilter";
import PlayersButch from "@/app/butches/PlayersButch";
import Margin from "@/components/utils/Margin";
import PlayerName from "@/components/player/PlayerName";

export default {
    name: "PlayersPage",
    components: {PlayerName, PlayersTableFilter, Margin},
    data() {
        return {
            busy: false,
            metaText: '...',
            items: [],
            filter: {
                specs: [
                    PlayersButch.Filter.TANKS, PlayersButch.Filter.HEALERS,
                    PlayersButch.Filter.RANGED, PlayersButch.Filter.MILLIE
                ],
                etc: [
                    PlayersButch.Filter.IN_GUILD, PlayersButch.Filter.MAX_LEVEL_ONLY
                ],
                name: "",
            },
            images: {
                shield,
                bow,
                heal,
                swords
            },
            fields: [
                {key: "level", label: "Уровень", sortable: true},
                {key: "name", label: "Имя"},
                {key: "role.title", label: "Ранг", sortable: true},
                {key: "character_class.title", label: "Класс"},
                // {key: "activity", label: "Активность", sortable: true},
                {key: "meta_text", label: "Заметка", sortable: true}
            ]
        }
    },
    mounted() {

    },
    computed:{
        guildPlayers(){
            const players = this.$store.getters["players/players"];
            console.log(players);
            return players.sort((a, b) => a.role.role_index - b.role.role_index);
        },
        countedMetaData(){
            let metaContent = '';
            this.guildPlayers.forEach(player => {
                metaContent += player.name + '-Гордунни|';
                metaContent += player.character_spec.type + '-' + Math.floor(player.gear) + " ";
                if (player.meta_text) metaContent += `(${player.meta_text})`;
                metaContent += "\n";
            });
            return metaContent;
        }
    },
    methods: {
        applyTable() {
            this.busy = true;
            // this.items = Guild.shared.createPlayersButch()
            //     .filter(
            //         ...this.filter.specs,
            //         ...this.filter.etc
            //     )
            //     .sort(
            //         PlayersButch.Sorting.FIRST_HIGH_RANK,
            //         PlayersButch.Sorting.FIRST_HIGH_LEVEL,
            //         PlayersButch.Sorting.ALPHABETIC
            //     )
            //     .getButchWithName(this.filter.name);

            this.busy = false;
        },

        countMetaData() {

        },

        handleFilterChanges(specs, etc, name) {
            this.filter.specs = specs;
            this.filter.etc = etc;
            this.filter.name = name;
            this.applyTable();
        },
    },
}
</script>

<style>
textarea {
    background-color: #2a2a2a !important;
    border-color: #16181b !important;
    color: #b5b5b5 !important;
}
</style>