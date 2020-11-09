<template>
    <b-card title="Фильтрация">
        <b-form-group label="Фильтр по сцепиализации:">
            <b-form-checkbox-group
                    v-model="selectedSpecializations"
                    :options="options.specializations"
                    name="spec-filter"
            ></b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Прочие фильтры:">
            <b-form-checkbox-group
                    v-model="selectedButchFilters"
                    :options="options.butchFilter"
                    name="spec-filter"
            ></b-form-checkbox-group>
        </b-form-group>
        <b-form-input v-model="findingName" placeholder="Поиск игрока по имени..."></b-form-input>
    </b-card>
</template>

<script>
    import PlayersButch from "@/app/butches/PlayersButch";

    export default {
        name:  "PlayersTableFilter",
        props: ["handler"],
        watch: {
            selectedSpecializations() {
                this.handler(this.selectedSpecializations, this.selectedButchFilters, this.findingName);
            },
            selectedButchFilters() {
                this.handler(this.selectedSpecializations, this.selectedButchFilters, this.findingName);
            },
            findingName() {
                this.handler(this.selectedSpecializations, this.selectedButchFilters, this.findingName);
            }
        },
        /**
         * The component data
         */
        data() {
            return {
                selectedSpecializations: [
                    PlayersButch.Filter.TANKS, PlayersButch.Filter.HEALERS,
                    PlayersButch.Filter.RANGED, PlayersButch.Filter.MILLIE
                ],
                selectedButchFilters: [
                    PlayersButch.Filter.IN_GUILD, PlayersButch.Filter.MAX_LEVEL_ONLY
                ],
                findingName:   "",
                options: {
                    specializations: [
                        {text: 'Танки', value: PlayersButch.Filter.TANKS},
                        {text: 'Хилы', value: PlayersButch.Filter.HEALERS},
                        {text: 'РД', value: PlayersButch.Filter.RANGED},
                        {text: 'МД', value: PlayersButch.Filter.MILLIE}
                    ],
                    butchFilter: [
                        {text: 'Только 50-ые', value: PlayersButch.Filter.MAX_LEVEL_ONLY},
                        // {text: 'Текущий состав гильдии', value: PlayersButch.Filter.IN_GUILD},
                        // {text: 'Покинули гильдию', value: PlayersButch.Filter.LEFT_GUILD},
                    ]
                },
            }
        }
    }
</script>

<style scoped>

</style>
