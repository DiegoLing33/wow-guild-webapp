<template>
    <div>
        <b-progress
            v-b-tooltip.hover :title="`Активность ${proc}`"
            max="1"
            :value="playerActivity()"
        />
    </div>
</template>

<script>
import Guild from "@/app/Guild";

export default {
    name: "PlayerActivity",
    props:{
      player: null,
    },
    data: () => ({
        proc: "0%"
    }),
    methods: {
        playerActivity() {
            const total = (this.player.guildScore.lastWeek || 0) +
                (this.player.guildScore.thisWeek || 0);
            const dif = total / Guild.shared.maxActivity;
            this.proc = (Math.round(dif * 10000) / 100) + "%";
            return dif;
        },
    }
}
</script>

<style scoped>

</style>