<template>
    <div>
        <b-container>
            <b-card header="Mythic+">
                Данные о прохождении подземелий участниками гильдии в сложности Mythic+
                <ol class="mt-2">
                    <li>Указанный гир - это акутальный гир, он мог быть другим в момент прохождения</li>
                    <li>"Фильтр по этой по команде" отобразит другие ключи, пройденный этим составом</li>
                </ol>
            </b-card>
            <template v-if="mythic.length > 0">
                <mythic-cards-deck :filters="['done', 'broken', 'guild']" :mythic-list="mythic"></mythic-cards-deck>
            </template>
        </b-container>
    </div>
</template>

<script>
    import ArrayUtils from "@/app/utils/ArrayUtils";
    import Guild from "@/app/Guild";
    import MythicCardsDeck from "@/components/mythic/MythicCardsDeck";

    export default {
        name:       "MythicPage",
        components: {MythicCardsDeck},
        computed:   {
            groups() {
                return ArrayUtils.splitBy(3, this.items);
            },
        },
        data() {
            return {
                mythic: [],
            }
        },
        mounted() {
            Guild.shared.wait(this.update.bind(this));
        },
        methods:    {
            update() {
                this.mythic = Guild.shared.getMythicList();
            },
        }
    }
</script>

<style scoped>

</style>
