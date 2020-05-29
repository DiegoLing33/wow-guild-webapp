<template>
    <b-container class="leavers-page">
        <h2 class="my-3">Игроки, которые нас покинули</h2>
        <b-table bordered :fields="fields" :items="items">
            <template v-slot:cell(leftFromGuild)="row">
                {{dataFormat(row.item.leftFromGuild * 1000)}}
            </template>
            <template v-slot:cell(name)="row">
                <player-name :player="row.item"></player-name>
            </template>
        </b-table>
    </b-container>

</template>

<script>
    import Guild from "@/app/Guild";
    import DateUtils from "@/app/utils/DateUtils";
    import PlayerName from "../player/PlayerName";

    export default {
        name: "LeaversPage",
        components: {PlayerName},
        data() {
            return {
                fields: [
                    {"key": "level", "label": "Уровень"},
                    {"key": "name", "label": "Имя"},
                    {"key": "guildScore.all", "label": "GS", sortable: true},
                    {"key": "gear", "label": "ГИР", sortable: true},
                    {"key": "leftFromGuild", "label": "Дата"}
                ],
                items: [],
            }
        },
        mounted() {
            Guild.shared.wait(this.update.bind(this));
        },
        methods: {
            update() {
                this.items = Guild.shared.getPlayersList()
                    .filter(v => v.leftFromGuild > 0).sort((a, b) =>
                        a.leftFromGuild > b.leftFromGuild ? -1 : 1);
            },
            dataFormat(d) {
                return DateUtils.format(d);
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
    .leavers-page h2 {
        text-align: center;
    }

    .leavers-page img {
        height: 40px;
    }

</style>
