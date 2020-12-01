<template>
    <div>
        <BContainer>
            <BRow>
                <BCol class="stcard" sm="12" md="6" style="margin: 0 auto" v-for="s in staticsList" :key="s.members[0].static_id">
                    <BCard no-body>
                        <BCardHeader>
                            <b>{{ s.title }}</b>
                        </BCardHeader>
                        <BCardBody>
                            <img :src="require('../../../core/navigation/assets/weapons.svg')"/>
                            <div>
                                <BButton @click="$router.push('/statics/' + s.members[0].static_id)" class="mt-3" block variant="primary">
                                    Перейти
                                </BButton>
                            </div>
                        </BCardBody>
                        <BCardFooter>
                            {{ s.description }}
                        </BCardFooter>
                    </BCard>
                </BCol>
            </BRow>
        </BContainer>
    </div>
</template>

<script>
export default {
    name: "StaticsHome",
    computed: {
        staticsList() {
            return this.$store.getters["statics/list"];
        },
    },
    mounted() {
        this.$store.dispatch("statics/loadStatics");
    }
}
</script>

<style lang="scss" scoped>
.stcard {
    text-align: center;

    b {
        text-transform: uppercase;
    }

    img {
        max-height: 200px;
    }
}
</style>