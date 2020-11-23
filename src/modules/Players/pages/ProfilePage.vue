<template>
    <BContainer>
        <BAlert show variant="danger" v-if="error !== ''">
            {{ error }}
        </BAlert>
        <div v-else-if="error === '' && data">
            <BCard class="text-center mb-3">
                <h3 style="margin: 0;">Профиль: {{ data.getBlizzardName() }}</h3>
            </BCard>
            <BTable
                bordered
                caption="Персонажи"
                caption-top
                :items="accounts"
                :fields="[
                        {'key': 'raw.name', 'label': 'Имя'},
                        {'key': 'raw.realm_title', 'label': 'Сервер'},
                        {'key': 'raw.faction', 'label': 'Фракция'},
                        {'key': 'raw.level', 'label': 'Уровень'},
                    ]"
            />
        </div>
    </BContainer>
</template>

<script>
import {GuildAPI} from "prestij.xyz-api";

export default {
    name: "ProfilePage",
    data: () => ({
        error: '',
        accounts: [],
        data: null,
    }),
    computed: {
        userId() {
            return this.$store.getters.userId || this.$route.query.user;
        },
    },
    mounted() {
        this.update();
    },
    methods: {
        async update() {
            try {
                await this.$store.dispatch("initAuthorization");
                this.data = await GuildAPI.GetUser(this.userId);
                this.accounts = await GuildAPI.GetWAccounts(this.userId, this.$store.getters.authToken);
            } catch (e) {
                this.error = e;
            }
        }
    }
}
</script>

<style scoped>

</style>