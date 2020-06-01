<template>
    <b-list-group flush>
        <b-list-group-item
                @click="modal(player)"
                :class="className(player.specialization)" v-for="player in getSortedPlayers()"
                :key="(`${mythicHash}_${player.id}`)">
            <player-name :player="player" :linked="false" :gear="true"></player-name>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    import PlayerName from "@/components/player/PlayerName";
    import UIPlayerOverlay from "@/app/UIPlayerOverlay";
    import PlayerClass from "@/app/entities/player/PlayerClass";
    import PlayersButch from "@/app/butches/PlayersButch";
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
                return new PlayersButch(this.players)
                    .sort(PlayersButch.Sorting.FIRST_LOW_ROLE, PlayersButch.Sorting.ALPHABETIC)
                    .getButch();
            },
            modal(player) {
                if (player.fromGuild)
                    UIPlayerOverlay.displayPlayer(player);
            },
            className(specialization) {
                return ['user-line', PlayerClass.getSlugBySpecializationId(specialization.id)].join(' ');
            }
        }
    }
</script>

<style scoped>

</style>
