<template>
    <div>
        <BContainer v-if="staticData">
            <BCard :header="staticData.title">
                {{ staticData.description }}
            </BCard>
            <BTable
                class="mt-3"
                bordered
                :fields="[
                        {key: 'role_id', label: 'Роль'},
                        {key: 'character.name', label: 'Имя'},
                        {key: 'character.level', label: 'Уровень'},
                        {key: 'character.gear', label: 'Gear'},
                        {key: 'character.character_class.title', label: 'Класс'},
                    ]"
                :items="members()"
            >
                <template v-slot:cell(role_id)="row">
                    <div style="text-align: center">
                        <img :src="image(row.item.role_id)" style="height: 24px" alt="role"/>
                    </div>
                </template>
                <template v-slot:cell(character.name)="row">
                    <PlayerName
                        :role="false"
                        v-if="$store.getters['players/playerWithWID'](row.item.character.wow_id)"
                        :player="$store.getters['players/playerWithWID'](row.item.character.wow_id)"/>
                    <div v-else>{{ row.item.character.name }}</div>
                </template>
            </BTable>
        </BContainer>
        <BContainer v-else>
            <BCard>
                Получение данных...
            </BCard>
        </BContainer>
    </div>
</template>

<script>
import PlayerName from "@/modules/Player/components/PlayerName";

export default {
    name: "StaticPage",
    components: {PlayerName},
    computed: {
        staticData() {
            return this.$store.getters["statics/list"]
                .find(v => String(v.members[0].static_id) === this.$route.params.id);
        },
    },
    mounted() {
        this.$store.dispatch("statics/loadStatics");
    },
    methods: {
        image(id) {
            switch (id) {
                default:
                case 0:
                    return require("@/assets/types/noone.svg");
                case 1:
                    return require("@/assets/types/security.svg");
                case 2:
                    return require("@/assets/types/health.svg");
                case 3:
                    return require("@/assets/types/sword.svg");
                case 4:
                    return require("@/assets/types/bow-and-arrow.svg");
            }
        },

        members() {
            return this.staticData.members.sort((a, b) => a.role_id - b.role_id);
        }
    }
}
</script>

<style scoped>

</style>