<template>
    <b-card title="Фильтрация">
        <b-form-group label="Фильтр по сцепиализации:">
            <b-form-checkbox-group
                    v-model="selectedSpecs"
                    :options="specsOptions"
                    name="spec-filter"
            ></b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Прочие фильтры:">
            <b-form-checkbox-group
                    v-model="selectedEtc"
                    :options="etcFilterOptions"
                    name="spec-filter"
            ></b-form-checkbox-group>
        </b-form-group>
        <b-form-input v-model="findingName" placeholder="Поиск игрока по имени..."></b-form-input>
    </b-card>
</template>

<script>
    export default {
        name: "PlayersTableFilter",
        props: ["handler"],
        watch:{
            selectedSpecs(){
                this.handler(this.selectedSpecs, this.selectedEtc, this.findingName);
            },
            selectedEtc(){
                this.handler(this.selectedSpecs, this.selectedEtc, this.findingName);
            },
            findingName(){
                this.handler(this.selectedSpecs, this.selectedEtc, this.findingName);
            }
        },
        data(){
            return {
                selectedSpecs: ["tanks", "healers", "rds", "mds"],
                selectedEtc:    [],
                findingName: "",

                specsOptions:      [
                    {text: 'Танки', value: 'tanks'},
                    {text: 'Хилы', value: 'healers'},
                    {text: 'РД', value: 'rds'},
                    {text: 'МД', value: 'mds'}
                ],
                etcFilterOptions: [
                    {text: 'Только 120-ые', value: '120lvl'},
                    {text: 'Сводка по мификам', value: 'm+'},
                    {text: 'Отображать недельный Guild Score', value: 'wgs'},
                ],
            }
        }
    }
</script>

<style scoped>

</style>
