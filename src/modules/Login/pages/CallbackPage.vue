<template>
    <div>
        Redirecting...
    </div>
</template>

<script>
export default {
    name: "CallbackPage",
    mounted() {

        this.$store.dispatch("initLogin").then(() => {
            this.$router.push('/');
        });

    }
}
</script>

<style scoped>

</style>