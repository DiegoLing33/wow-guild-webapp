<template>
    <div>
        callback
    </div>
</template>

<script>
export default {
    name: "CallbackPage",
    mounted() {

        this.$store.dispatch("initLogin").then(value => {
            console.log(value);
        });

    }
}
</script>

<style scoped>

</style>