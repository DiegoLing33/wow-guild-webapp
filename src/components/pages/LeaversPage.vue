<template>
    <b-container class="leavers-page">
        <h2 class="my-3"><img :src="tombstone" /> Игроки, которые нас покинули</h2>
        <b-table bordered :fields="fields" :items="items">
            <template v-slot:cell(left_from_guild)="row">
                {{dataFormat(row.item.left_from_guild * 1000)}}
            </template>
            <template v-slot:cell(spec)="row">
                <img class="spec-image" :src="getSpecImage(row.item.spec.id)"/>
                {{row.item.spec.name}}
            </template>
        </b-table>
    </b-container>

</template>

<script>
    import tombstone from "@/assets/tombstone.svg";
    import Guild from "@/app/Guild";
    import DateUtils from "@/app/utils/DateUtils";
    import GameData from "@/data/GameData";
    import SpecUtils from "@/app/players/SpecUtils";

    export default {
        name:    "LeaversPage",
        data() {
            return {
                tombstone,
                fields: [
                    {"key": "level", "label": "Уровень"},
                    {"key": "name", "label": "Имя"},
                    {"key": "class.name", "label": "Класс"},
                    {"key": "spec", "label": "Спек"},
                    {"key": "left_from_guild", "label": "Дата"}
                ],
                items:  [],
            }
        },
        mounted() {
            Guild.shared.wait(this.update.bind(this));
        },
        methods: {
            update() {
                this.items = Guild.shared.getPlayersList().filter(v => v.left_from_guild > 0);
            },
            dataFormat(d){
                return DateUtils.format(d);
            },
            getSpecImage(specId) {
                const specTypeId = GameData.specIdToTypeId(specId);
                return SpecUtils.getImage(specTypeId);
            },
        },
    }
</script>

<style>
    .spec-image {
        height: 20px !important;
    }
</style>
<style scoped>
    .leavers-page h2{
        text-align: center;
    }
    .leavers-page img {
        height: 40px;
    }

</style>
