<template>
    <b-list-group flush>
        <b-list-group-item

            v-for="(player, i) in getSortedPlayers()"
            :key="(`${mythicHash}_${player.raw.wow_id}_${i}`)">

            <player-name :player="player" :linked="true" :gear="true"></player-name>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import PlayerName from "@/modules/Player/components/PlayerName";
import PlayerClass from "@/app/entities/player/PlayerClass";

export default {
    name: "MythicCardPlayers",
    components: {PlayerName},
    props: {
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
        getSortedPlayers() {
            // return new PlayersButch(this.players)
            //     .sort(PlayersButch.Sorting.FIRST_LOW_ROLE, PlayersButch.Sorting.ALPHABETIC)
            //     .getButch();

            return this.players;
        },
        className(specialization) {
            return ['user-line', PlayerClass.getSlugBySpecializationId(specialization.id)].join(' ');
        }
    }
}
</script>

<style scoped>

</style>
