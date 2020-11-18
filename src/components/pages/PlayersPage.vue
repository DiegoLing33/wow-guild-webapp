<template>
    <div>
        <b-container>
            <players-table-filter :handler="handleFilterChanges" class="mb-3"></players-table-filter>
            <BCard title="Фильтры">
                <BCardBody>
                    <BRow>
                        <BCol>
                            <h4>Расса</h4>
                            <BCheckboxGroup v-model="selectedRaces">
                                <BCheckbox :key="id" :value="id" v-for="(text, id) in racesList">
                                    {{ text }}
                                </BCheckbox>
                            </BCheckboxGroup>
                        </BCol>
                        <BCol>
                            <h4>Класс</h4>
                            <BCheckboxGroup v-model="selectedClasses">
                                <BCheckbox :key="id" :value="id" v-for="(text, id) in classesList">
                                    {{ text }}
                                </BCheckbox>
                            </BCheckboxGroup>
                        </BCol>
                    </BRow>
                </BCardBody>
            </BCard>
            <div class="my-3">
                Отображено результатов: <b>{{ guildPlayers.length }}</b>
            </div>
            <b-table :busy="busy" bordered :items="guildPlayers" :fields="fields">
                <template v-slot:cell(raw.name)="row">
                    <player-name :player="row.item"></player-name>
                </template>
                <template v-slot:cell(activity)="row" style="vertical-align: center">
                    <b-progress
                        :title="`Активность: ${progressPoints(row.item)}`"
                        v-b-tooltip.hover
                        max="1"
                        :value="progress(row.item)"
                    />
                </template>
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

function retype(i){
    if(i === 0) return '?';
    if(i === 1) return 'Т';
    if(i === 2) return 'Х';
    if(i === 3) return 'МД';
    if(i === 4) return 'РД';
}

export default {
    name: "PlayersPage",
    components: {PlayerName, PlayersTableFilter, Margin},
    data() {
        return {
            selectedRaces: null,
            selectedClasses: null,
            selectedRole: null,

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
                {key: "raw.level", label: "Уровень", sortable: true},
                {key: "raw.name", label: "Имя"},
                {key: "raw.gear", label: "Gear"},
                {key: "raw.role.title", label: "Ранг", sortable: true},
                {key: "raw.character_class.title", label: "Класс"},
                {key: "activity", label: "Активность", sortable: true},
                {key: "raw.meta_text", label: "Заметка", sortable: true}
            ]
        }
    },
    mounted() {

    },
    computed: {
        allPlayers() {
            return this.$store.getters["players/players"];
        },
        guildPlayers() {
            let players = this.allPlayers;

            const isRaceFilter = this.selectedRaces !== null && this.selectedRaces.length > 0;
            const races = isRaceFilter ? this.selectedRaces.map(v => parseInt(v)) : [];

            const isClassFilter = this.selectedClasses !== null && this.selectedClasses.length > 0;
            const classes = isClassFilter ? this.selectedClasses.map(v => parseInt(v)) : [];

            players = players.filter(player => {
                if (isRaceFilter && !races.includes(player.getRace().getWID())) return false;
                if (isClassFilter && !classes.includes(player.getClass().getWID())) return false;
                return true;
            });
            return players.sort((a, b) => a.getGuildRank().getIndex() - b.getGuildRank().getIndex());
        },
        countedMetaData() {
            let metaContent = '';
            this.allPlayers.forEach(player => {
                metaContent += player.getName() + '-Гордунни|';
                metaContent += retype(player.getActiveSpec().getType()) + '-' + Math.floor(player.getGear()) + " ";
                if (player.getMetaText()) metaContent += `(${player.getMetaText()})`;
                metaContent += "\n";
            });
            return metaContent;
        },

        racesList() {
            const list = {};
            this.allPlayers.forEach(player => {
                list[player.getRace().getWID()] = player.getRace().getTitle();
            });
            return list;
        },

        classesList() {
            const list = {};
            this.allPlayers.forEach(player => {
                list[player.getClass().getWID()] = player.getClass().getTitle();
            });
            return list;
        }
    },
    methods: {
        progress(item) {
            return this.$store.getters['players/activity/byWID'](item.raw.wow_id).raw.activity;
        },
        progressPoints(item) {
            const p = Math.round(this.$store.getters['players/activity/byWID'](item.raw.wow_id).raw.activity * 100);
            const points = this.$store.getters['players/activity/byWID'](item.raw.wow_id).raw.activity_points;
            return `${points} (${p}%)`;
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

td{
    vertical-align: middle !important;
}
</style>