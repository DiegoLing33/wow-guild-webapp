<template>
    <div>
        <b-container>
            <b-button block v-b-toggle.p-act-filter>
                <b-icon-filter></b-icon-filter>
                Фильтры игроков
            </b-button>
            <b-collapse id="p-act-filter" class="mt-2">
                <BCard>
                    <BCardBody>
                        <BRow>
                            <BCol class="mb-3">
                                <h4>Расса</h4>
                                <BCheckboxGroup v-model="selectedRaces">
                                    <BCheckbox :key="id" :value="id" v-for="(text, id) in racesList">
                                        {{ text }}
                                    </BCheckbox>
                                </BCheckboxGroup>
                            </BCol>
                            <BCol class="mb-3">
                                <h4>Класс</h4>
                                <BCheckboxGroup v-model="selectedClasses">
                                    <BCheckbox :key="id" :value="id" v-for="(text, id) in classesList">
                                        {{ text }}
                                    </BCheckbox>
                                </BCheckboxGroup>
                            </BCol>
                        </BRow>
                        <BRow>
                            <BCol class="mb-3">
                                <h4>Специализация</h4>
                                <BCheckboxGroup v-model="selectedSpecializations">
                                    <BCheckbox :key="id" :value="id" v-for="(text, id) in specializationsList">
                                        {{ text }}
                                    </BCheckbox>
                                </BCheckboxGroup>
                            </BCol>
                            <BCol class="mb-3">
                                <h4>Дополнительно</h4>
                                <BCheckboxGroup v-model="selectedOthers">
                                    <BCheckbox :key="id" :value="id" v-for="(text, id) in otherList">
                                        {{ text }}
                                    </BCheckbox>
                                </BCheckboxGroup>
                            </BCol>
                        </BRow>
                    </BCardBody>
                </BCard>
            </b-collapse>
            <div class="my-3">
                Найдено результатов: <b>{{ guildPlayers.length }}</b>
            </div>
            <b-table no-local-sorting @sort-changed="onSortChanged" bordered :items="visiblePlayers" :fields="fields">
                <template v-slot:cell(raw.name)="row">
                    <player-name :player="row.item"></player-name>
                </template>
                <template v-slot:cell(raw.activity)="row" style="vertical-align: center">
                    <b-progress
                        :title="`Активность: ${progressPoints(row.item)}`"
                        v-b-tooltip.hover
                        max="1"
                        :value="progress(row.item)"
                    />
                </template>
            </b-table>
            <BButton
                v-if="countWouldLoad > 0"
                @click="()=>currentPage += 1"
                block variant="primary">Загрузить еще ({{ countWouldLoad }})
            </BButton>
            <margin top="20" bottom="20" class="text-muted">
                Мета информация:
            </margin>
            <b-textarea readonly v-model="countedMetaData" rows="6"/>
        </b-container>
    </div>
</template>

<script>
import Margin from "@/components/utils/Margin";
import PlayerName from "@/modules/Player/components/PlayerName";
import {WFTSpecialization} from "prestij.xyz-api";

function getFilter(filter) {
    const fv = filter !== null && filter.length > 0;
    return [fv, fv ? filter : []];
}

function getFilterIntegers(filter) {
    const [f, v] = getFilter(filter);
    return [f, v.map(i => parseInt(i))];
}

function byString(o, s) {
    s = s.replace(/\[(\w+)]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    let a = s.split('.');
    for (let i = 0; i < a.length; ++i) {
        let k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

export default {
    name: "PlayersPage",
    components: {PlayerName, Margin},
    data() {
        return {
            selectedRaces: null,
            selectedClasses: null,
            selectedRole: null,
            selectedSpecializations: null,
            selectedOthers: null,
            currentPage: 0,
            currentSortMethod: null,

            metaText: '...',
            items: [],
            fields: [
                {
                    key: "raw.level",
                    label: "Уровень",
                    sortable: true
                },
                {
                    key: "raw.name",
                    label: "Имя",
                    sortable: true
                },
                {
                    key: "raw.gear",
                    label: "Gear",
                    sortable: true
                },
                {
                    key: "raw.role.title",
                    label: "Ранг",
                    sortable: true
                },
                {
                    key: "raw.character_class.title",
                    label: "Класс",
                    sortable: true
                },
                {
                    key: "raw.activity",
                    label: "Активность",
                    sortable: true
                },
            ]
        }
    },
    watch: {
        selectedRaces() {
            this.currentPage = 0;
        },
        selectedClasses() {
            this.currentPage = 0;
        },
        selectedRole() {
            this.currentPage = 0;
        },
        selectedSpecializations() {
            this.currentPage = 0;
        },
        selectedOthers() {
            this.currentPage = 0;
        },
    },
    mounted() {

    },
    computed: {
        allPlayers() {
            return this.$store.getters["players/players"];
        },
        visiblePlayers() {
            return this.guildPlayers.slice(0, 20 + (20 * this.currentPage));
        },
        countWouldLoad() {
            const max = this.guildPlayers.length;
            const vs = this.visiblePlayers.length;
            return max - vs;
        },
        guildPlayers() {
            let players = this.allPlayers;

            const [isRaces, races] = getFilterIntegers(this.selectedRaces);
            const [isClasses, classes] = getFilterIntegers(this.selectedClasses);
            const [isSpecs, specializations] = getFilterIntegers(this.selectedSpecializations);
            const [isOthers, others] = getFilter(this.selectedOthers);

            players = players.filter(player => {
                // Race filters
                if (isRaces && !races.includes(player.getRace().getWID())) return false;

                // Class filters
                if (isClasses && !classes.includes(player.getClass().getWID())) return false;

                // Specialization filters
                if (isSpecs && !specializations.includes(player.getActiveSpec().getType())) return false;

                // Other filters
                if (isOthers) {
                    if (others.includes('HIGH') && player.getLevel() < 50) return false;
                }

                // Default true
                return true;
            });
            if (this.currentSortMethod) {
                const [field, desc] = this.currentSortMethod;
                players = players.sort((a, b) => {
                    if (desc) return byString(a, field) > byString(b, field) ? 1 : -1;
                    else return byString(a, field) > byString(b, field) ? -1 : 1;
                });
            }
            return players;
        },

        /**
         * Counts the meta data
         */
        countedMetaData() {
            let metaContent = '';
            this.allPlayers.forEach(player => {
                metaContent += player.getName() + '-Гордунни|';
                metaContent += WFTSpecialization.getRusRoleSlugById(player.getActiveSpec().getType()) + '-' + Math.floor(player.getGear()) + " ";
                if (player.getMetaText()) metaContent += `(${player.getMetaText()})`;
                metaContent += "\n";
            });
            return metaContent;
        },

        /**
         * Returns the races list
         */
        racesList() {
            const list = {};
            this.allPlayers.forEach(player => list[player.getRace().getWID()] = player.getRace().getTitle());
            return list;
        },

        /**
         * Returns the class list
         */
        classesList() {
            const list = {};
            this.allPlayers.forEach(player => list[player.getClass().getWID()] = player.getClass().getTitle());
            return list;
        },

        otherList() {
            return {
                'HIGH': 'Только максимальный уровень',
            }
        },

        /**
         * Returns the specializations list
         * @return {{"1": string, "2": string, "3": string, "4": string}}
         */
        specializationsList() {
            return {1: 'Танк', 2: 'Исцеление', 3: 'Ближний бой', 4: 'Дальний бой'};
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
        onSortChanged(e) {
            console.log(e);
            this.currentPage = 0;
            this.currentSortMethod = [e.sortBy, e.sortDesc];
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

td {
    vertical-align: middle !important;
}
</style>