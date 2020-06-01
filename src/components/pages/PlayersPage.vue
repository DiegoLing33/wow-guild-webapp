<template>
    <div>
        <b-container>
            <players-table-filter :handler="handleFilterChanges" class="mb-3"></players-table-filter>
            <div class="my-3">
                Отображено результатов: <b>{{items.length}}</b>
            </div>
            <b-table :busy="busy" bordered :items="items" :fields="fields">
                <template v-slot:cell(name)="row">
                    <player-name :player="row.item"></player-name>
                </template>
                <template v-slot:cell(rank.id)="row">
                    {{row.item.rank.title}}
                </template>
                <template v-slot:cell(class)="row">
                    {{row.item.class.title}}
                </template>
                <template v-slot:cell(spec)="row">
                    <img class="spec-image" :src="row.item.role.image"/>
                    {{row.item.specialization.title}}
                </template>
                <template v-slot:cell(gear)="row">
                    {{row.item.gear}}
                </template>
            </b-table>
        </b-container>
    </div>
</template>

<script>
    import shield from "@/assets/types/security.svg";
    import heal from "@/assets/types/health.svg";
    import sword from "@/assets/types/sword.svg";
    import bow from "@/assets/types/bow-and-arrow.svg";
    import PlayersTableFilter from "@/components/PlayersTableFilter";
    import Guild from "@/app/Guild";
    import PlayerName from "../player/PlayerName";
    import PlayersButch from "@/app/butches/PlayersButch";

    export default {
        name:       "PlayersPage",
        components: {PlayerName, PlayersTableFilter},
        data() {
            return {
                busy:   false,
                items:  [],
                filter: {
                    specs: [
                        PlayersButch.Filter.TANKS, PlayersButch.Filter.HEALERS,
                        PlayersButch.Filter.RANGED, PlayersButch.Filter.MILLIE
                    ],
                    etc:   [
                        PlayersButch.Filter.IN_GUILD, PlayersButch.Filter.MAX_LEVEL_ONLY
                    ],
                    name:  "",
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
                    {key: "rank.id", label: "Ранг", sortable: true},
                    {key: "class", label: "Класс"},
                    {key: "guildScore.all", label: "Guild Score", sortable: true}
                ]
            }
        },
        mounted() {
            Guild.shared.wait(this.applyTable.bind(this));
        },
        methods:    {
            applyTable() {
                this.busy   = true;
                this.items = Guild.shared.createPlayersButch()
                    .filter(
                        ...this.filter.specs,
                        ...this.filter.etc
                    )
                    .sort(
                        PlayersButch.Sorting.FIRST_HIGH_RANK,
                        PlayersButch.Sorting.FIRST_HIGH_LEVEL,
                        PlayersButch.Sorting.ALPHABETIC
                    )
                    .getButchWithName(this.filter.name);
                this.busy  = false;
            },

            handleFilterChanges(specs, etc, name) {
                this.filter.specs = specs;
                this.filter.etc   = etc;
                this.filter.name  = name;
                this.applyTable();
            },
        },
    }
</script>
