<template>
    <div>
        <player-name v-for="p in players" :key="p.id" :player="p"></player-name>
    </div>
</template>

<script>
    import PlayerName from "../player/PlayerName";
    import Guild from "../../app/Guild";
    export default {
        name: "DevelopPage",
        components: {PlayerName},
        mounted() {
            Guild.shared.wait(()=>{
               this.players.push(...Guild.shared.getPlayersList().sort((a,b)=>a.rank.id < b.rank.id ? -1 : 1).slice(0, 10));
            });
        },
        data(){
            return {
                players: [],
            }
        }
    }
</script>

<style scoped>

</style>