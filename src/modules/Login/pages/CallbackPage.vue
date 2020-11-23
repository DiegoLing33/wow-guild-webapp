<template>
    <div>
        Redirecting...
    </div>
</template>

<script>
import {GuildAPI} from "prestij.xyz-api";

export default {
    name: "CallbackPage",
    mounted() {

        this.$store.dispatch("initLogin").then(() => {
            GuildAPI.AddUser({
                blizzard_name: this.$store.getters.battleTag,
                token: this.$store.getters.authToken,
            });
            this.$router.push('/');
        });

    }
}
</script>

<style scoped>

</style>