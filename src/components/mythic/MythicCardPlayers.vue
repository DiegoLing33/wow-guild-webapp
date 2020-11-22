<template>
    <b-list-group flush>
        <b-list-group-item
                @click="modal(player)"

                v-for="(player, i) in getSortedPlayers()"
                :key="(`${mythicHash}_${player.raw.wow_id}_${i}`)">

            <player-name :player="player" :linked="false" :gear="true"></player-name>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    import PlayerName from "@/components/player/PlayerName";
    import UIPlayerOverlay from "@/app/UIPlayerOverlay";
    import PlayerClass from "@/app/entities/player/PlayerClass";
    export default {
        name: "MythicCardPlayers",
        components: {PlayerName},
        props:{
            players: {
                required: true,
                type: Array
            },
            mythicHash: {
                required: true,
                type: String
            }
        },
        methods: {
            getSortedPlayers(){
                // return new PlayersButch(this.players)
                //     .sort(PlayersButch.Sorting.FIRST_LOW_ROLE, PlayersButch.Sorting.ALPHABETIC)
                //     .getButch();

                return this.players;
            },
            modal(player) {
                if (player.isFromGuild()) UIPlayerOverlay.displayPlayer(player);
            },
            className(specialization) {
                return ['user-line', PlayerClass.getSlugBySpecializationId(specialization.id)].join(' ');
            }
        }
    }
</script>

<style scoped>

</style>
