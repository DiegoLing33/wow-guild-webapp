<template>
    <div>
        <b-container>
            <players-table-filter :handler="handleFilterChanges" class="mb-3"></players-table-filter>
            <div class="my-3">
                Отображено результатов: <b>{{items_count}}</b>
            </div>
            <b-table :busy="busy" bordered :items="items" :fields="fields">
                <template v-slot:cell(name)="row">
                    <router-link :to="(`/player/${row.item.name}`)">{{row.item.name}}</router-link>
                </template>
                <template v-slot:cell(rank.id)="row">
                    {{row.item.rank.name}}
                </template>
                <template v-slot:cell(class)="row">
                    {{row.item.class.name}}
                </template>
                <template v-slot:cell(spec)="row">
                    <img class="spec-image" :src="getSpecImage(row.item.spec.id)"/>
                    {{row.item.spec.name}}
                </template>
                <template v-slot:cell(gear)="row">
                    {{row.item.gear}}
                </template>
                <template v-slot:cell(id)="row">
                    {{getMythicDone(row.item.name)}}
                </template>
                <template v-slot:cell(mythic)="row">
                    {{getMythicRace(row.item.name)}}
                </template>
                <template v-slot:head(mythic)>
                    ГИ / Поиск <a
                        v-b-popover.hover.top="'ГИ - поход только с игроками гильдии / Поиск - добор людей из поиска'"
                        href="#">?</a>
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
    import GameData from "@/data/GameData";
    import PlayersTableFilter from "@/components/PlayersTableFilter";
    import MythicUtils from "@/app/MythicUtils";
    import Guild from "@/app/Guild";

    export default {
        name:       "PlayersPage",
        components: {PlayersTableFilter},
        computed:   {
            items_count() {
                return this.items.length;
            },
            fields() {
                const arr = [
                    {key: "level", label: "Уровень", sortable: true},
                    {key: "name", label: "Имя"},
                ];
                if (this.filter.etc.includes("m+")) arr.push(...[
                    {key: "id", label: "Тайм / Слом"},
                    {key: "mythic", label: "ГИ / Поиск"}
                ]);
                if(!this.filter.etc.includes("m+")) arr.push(...[
                    {key: "rank.id", label: "Ранг", sortable: true},
                    {key: "class", label: "Класс"},
                ])
                arr.push({key: "spec", label: "Спек", sortable: true});
                arr.push({key: "gear", label: "ГИР", sortable: true});

                if(this.filter.etc.includes("wgs")) arr.push({key: "weekGuildScore", label: "Guild Score (Week)", sortable: true});
                else arr.push({key: "guildScore", label: "Guild Score", sortable: true});
                return arr;
            }
        },
        mounted() {
            Guild.shared.wait(this.applyTable.bind(this));
        },
        methods:    {
            getSpecImage(id) {
                const typeId = GameData.specIdToTypeId(id);
                if (typeId === 1) return this.images.shield;
                if (typeId === 2) return this.images.heal;
                if (typeId === 3) return this.images.sword;
                if (typeId === 4) return this.images.bow;
                return this.images.sword;
            },
            getAllPlayers() {
                const source = Guild.shared.getPlayersList().filter(p => !Guild.shared.isPlayerLeft(p.name));
                return source
                    .sort((a, b) => a.level > b.level ? 1 : -1)
                    .sort((a, b) => a.rank.id > b.rank.id ? 1 : -1);
            },
            applyTable() {
                this.busy = true;
                this.items = this.getAllPlayers().filter(value => {
                    if(value.left_from_guild > 0) return false;
                    if(!value.name.toLowerCase().includes(this.filter.name.toLowerCase())) return false;
                    const specId = GameData.specIdToTypeId(value.spec.id);
                    if (specId === 1 && !this.filter.specs.includes("tanks")) return false;
                    if (specId === 2 && !this.filter.specs.includes("healers")) return false;
                    if (specId === 3 && !this.filter.specs.includes("mds")) return false;
                    if (specId === 4 && !this.filter.specs.includes("rds")) return false;

                    if (value.level < 120 && this.filter.etc.includes("120lvl")) return false;
                    return true;
                });
                this.busy = false;
            },
            handleFilterChanges(specs, etc, name) {
                this.filter.specs = specs;
                this.filter.etc   = etc;
                this.filter.name   = name;
                this.applyTable();
            },
            getMythicRace(name){
                const ms = Guild.shared.getMythicByName(name);
                const guild = MythicUtils.getGuildRace(ms).length;
                const lfr = ms.length - guild;
                return `${guild} / ${lfr}`
            },
            getMythicDone(name){
                const ms = Guild.shared.getMythicByName(name);
                const done = MythicUtils.getDone(ms).length;
                const broke = ms.length - done;
                return `${done} / ${broke}`
            }
        },
        data() {
            return {
                busy: false,
                items:  [],
                filter: {
                    specs: ["tanks", "healers", "rds", "mds"],
                    etc:   [],
                    name: "",
                },
                images: {
                    shield,
                    bow,
                    heal,
                    sword
                }
            }
        }
    }
</script>
<style>
    .table {
        color: #d5d5d5;
    }

    .table-bordered {
        border: 1px solid #444444 !important;
    }

    .table-bordered th, .table-bordered td {
        border: 1px solid #444444 !important;
    }

    .table thead th {
        vertical-align: bottom;
        border-bottom: 1px solid #444444 !important;
        background-color: #111;
    }

    .table thead th {
        color: white !important;
    }

    .table th {
        color: white !important;
    }

    .table th, .table td {

    }

    .table.b-table > thead > tr > [aria-sort="none"], .table.b-table > tfoot > tr > [aria-sort="none"] {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='grey' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
    }
</style>
<style>
    .spec-image {
        height: 20px;
    }
</style>
