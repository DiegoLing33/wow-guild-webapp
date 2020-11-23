<template>
    <div>
        <mythic-search-panel :filters="filters" v-on:data="onSearch" class="mt-3"></mythic-search-panel>
        <div class="my-3">
            <div>Найдено результатов: <b>{{items.length}}</b></div>
            <div class="small text-muted">
                В тайм: {{counters.doneInTime}} ({{getPercentage(counters.doneInTime, items.length)}})
                Гильдейский марш: {{counters.guildRace}} ({{getPercentage(counters.guildRace, items.length)}})
            </div>
        </div>
        <b-card-group class="mb-4" deck v-for="(m, i) in groups" :key="i">
            <mythic-card v-for="item in m" :key="`${item.raw.mythic_hash}_${i}`" :mythic-hash="item.raw.mythic_hash" :mythic="item">
            </mythic-card>
        </b-card-group>
        <template v-if="items.length-limit>0">
            <b-button @click="onMoreClick" block>Показать еще ({{items.length-limit}})</b-button>
        </template>
    </div>
</template>

<script>
    import MythicCard from "@/modules/Mythic/components/MythicCard";
    import MythicSearchPanel from "@/modules/Mythic/components/MythicSearchPanel";
    import ArrayUtils from "@/app/utils/ArrayUtils";
    import NumberUtils from "@/app/utils/NumberUtils";

    const PAGE_LIMIT = 21;

    export default {
        name:       "MythicCardsDeck",
        components: {MythicSearchPanel, MythicCard},
        props:      ["mythicList", "filters"],
        data() {
            return {
                items: [],
                limit: PAGE_LIMIT,

                counters: {
                    doneInTime: 0,
                    guildRace:  0,
                }
            }
        },
        computed:   {
            groups() {
                return ArrayUtils.splitBy(3, this.items.slice(0, this.limit));
            },
        },
        methods:    {
            applyFilters(filters) {
                this.items = this.items.filter(m => {
                    if (!m.thisWeek && filters.includes("week")) return false;
                    if (m.isDone() && !filters.includes("done")) return false;
                    if (!m.isDone() && !filters.includes("broken")) return false;
                    if (m.isGuildRace() && !filters.includes("guild")) return false;
                    if (!m.isGuildRace() && !filters.includes("lfr")) return false;
                    return true;
                });
            },
            applyPlayersFilter(players) {
                this.items = this.items.filter(m => {
                    return players.every(player => m.getMembers().find(v => v.getName() === player));
                });
            },
            applySortMethods(sortA, sortB) {
                if (sortA === "dungeon") this.items = this.items.sort((a, b) => {
                    return a.getLevel() > b.getLevel() ? -1 : 1;
                });
                this.items = this.items.sort((a, b) => {
                    if (sortA === "new") return a.raw.completed > b.raw.completed ? -1 : 1;
                    if (sortA === "old") return a.raw.completed < b.raw.completed ? -1 : 1;
                    if (sortA === "fast") return a.getDurationInSeconds() < b.getDurationInSeconds() ? -1 : 1;
                    if (sortA === "long") return a.getDurationInSeconds() > b.getDurationInSeconds() ? -1 : 1;

                    if (sortA === "hard") return a.getLevel() > b.getLevel() ? -1 : 1;
                    if (sortA === "easy") return a.getLevel() < b.getLevel() ? -1 : 1;
                    if (sortA === "dungeon") return parseInt(a.getWowDungeonID()) < parseInt(b.getWowDungeonID()) ? -1 : 1;
                    return a.raw.completed > b.raw.completed ? -1 : 1;
                });
                if (sortB === "done") {
                    this.items = [
                        ...this.items.filter(m => m.isDone()),
                        ...this.items.filter(m => !m.isDone()),
                    ];
                } else if (sortB === "broken") {
                    this.items = [
                        ...this.items.filter(m => !m.isDone()),
                        ...this.items.filter(m => m.isDone())
                    ];
                }
            },
            applyCounters() {
                this.counters.doneInTime = 0;
                this.counters.guildRace  = 0;
                this.items.forEach(m => {
                    if (m.isDone()) this.counters.doneInTime++;
                    if (m.isGuildRace()) this.counters.guildRace++;
                });
            },
            onSearch(sort, afterSort, selectedFilters, selectedPlayers) {
                this.limit = 9;
                this.items = this.mythicList;
                this.applyFilters(selectedFilters);
                this.applyPlayersFilter(selectedPlayers);
                this.applySortMethods(sort, afterSort);
                this.applyCounters();
            },
            onMoreClick() {
                this.limit += PAGE_LIMIT;
            },
            getPercentage(val, max) {
                return NumberUtils.getPercentage(val, max, 2) + "%";
            }
        }
    }
</script>

<style scoped>

</style>
