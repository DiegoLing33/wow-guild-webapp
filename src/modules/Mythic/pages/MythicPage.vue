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
            <template v-if="items.length > 0">
                <mythic-cards-deck :filters="['done', 'broken', 'guild', 'lfr']"
                                   :mythic-list="items"></mythic-cards-deck>
            </template>
        </b-container>
    </div>
</template>

<script>
import MythicCardsDeck from "@/modules/Mythic/components/MythicCardsDeck";

export default {
    name: "MythicPage",
    components: {MythicCardsDeck},
    computed: {
        items() {
            return this.$store.getters["mythic/mythic"];
        }
    },
    mounted() {
        this.$store.dispatch("mythic/update");
    }
}
</script>

<style scoped>

</style>
