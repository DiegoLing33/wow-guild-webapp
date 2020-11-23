<template>
    <div>
        <b-row>
            <b-col md="6" sm="12">
                <div class="mb-3">
                    <b-button block v-b-toggle.act-filter>
                        <b-icon-filter></b-icon-filter>
                        Общие фильтры прохождений
                    </b-button>
                    <b-collapse id="act-filter" class="mt-2">
                        <b-card>
                            <b-form-group label="Фильтрация:">
                                <b-form-checkbox-group v-model="selectedFilters" :options="optionsFilter">
                                </b-form-checkbox-group>
                            </b-form-group>

                        </b-card>
                    </b-collapse>
                </div>
            </b-col>
            <b-col md="6" sm="12">
                <div class="mb-3">
                    <b-button block v-b-toggle.act-team-search>
                        <b-icon-people-fill></b-icon-people-fill>
                        Поиск по команде игроков
                    </b-button>
                    <b-collapse id="act-team-search" class="mt-2">
                        <b-card>
                            <div>
                                Выберите игроков. Из них будет софрмированна виртуальная команда,
                                sна основе которой будут отфильтрованы мифики.
                            </div>
                            <players-selection-view v-on:selected="onPlayersSelected" class="mb-3">
                            </players-selection-view>
                        </b-card>
                    </b-collapse>
                </div>
            </b-col>
        </b-row>

        <div class="mb-3">
            <b-button block v-b-toggle.act-sort>
                <b-icon-list-ol></b-icon-list-ol>
                Методы сортировки
            </b-button>
            <b-collapse id="act-sort" class="mt-2">
                <b-card>
                    <b-row>
                        <b-col md="6" sm="12" class="mb-3">
                            <div>Метод первичной сортировки</div>
                            <b-form-select v-model="selectedSortMethod" :options="sortMethods"></b-form-select>
                        </b-col>
                        <b-col md="6" sm="12" class="mb-3">
                            <div>Метод последовательной сортировки</div>
                            <b-form-select v-model="selectedSortAfterMethod" :options="sortAfterMethods"></b-form-select>
                        </b-col>
                    </b-row>
                </b-card>
            </b-collapse>
        </div>
    </div>
</template>

<script>
    import PlayersSelectionView from "@/components/views/PlayersSelectionView";
    export default {
        name: "MythicSearchPanel",
        components: {PlayersSelectionView},
        props:["filters"],
        watch:{
            selectedSortMethod(){ this.emitData() },
            selectedSortAfterMethod(){ this.emitData() },
            selectedFilters(){ this.emitData() },
            selectedPlayers(){ this.emitData() },
        },
        mounted(){
          this.emitData();
        },
        data(){
            return {
                selectedSortMethod: "new",
                selectedSortAfterMethod: "all",
                selectedFilters: this.filters,
                selectedPlayers: [],

                sortMethods: [
                    {text: "Сначала новые", value: "new"},
                    {text: "Сначала старые", value: "old"},
                    {text: "Сначала быстрые", value: "fast"},
                    {text: "Сначала долгие", value: "long"},
                    {text: "Сначала сложные", value: "hard"},
                    {text: "Сначала легкие", value: "easy"},
                    {text: "По подземелью", value: "dungeon"},
                ],

                sortAfterMethods: [
                    {text: "Сначала в тайм", value: "done"},
                    {text: "Сначала не в тайм", value: "broken"},
                    {text: "Не важно", value: "all"},
                ],

                optionsFilter: [
                    {text: "Закрыто в тайм", value: "done"},
                    {text: "Закрыто не в тайм", value: "broken"},
                    {text: "Гильдейская команда", value: "guild"},
                    {text: "С игроками из поиска", value: "lfr"},
                    {text: "Только актуальная неделя", value: "week"},
                ]
            }
        },
        methods: {
            onPlayersSelected(players){
                this.selectedPlayers = players;
            },
            emitData(){
                this.$emit("data", this.selectedSortMethod, this.selectedSortAfterMethod, this.selectedFilters, this.selectedPlayers);
            }
        }
    }
</script>

<style scoped>

</style>
