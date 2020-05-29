<template>
    <div :class="([getClassSlugColor, 'player-name'].join(' '))">
            <span @click="click()" class="player-click">
                <img :src="player.role.image">
                <span :class="(player.fromGuild <= 0 ? 'no-guild' : '')">{{player.name}}</span>
            </span> <span v-if="gear && player.gear > 0">({{player.gear}})</span>
    </div>
</template>

<script>
    import Player from "../../app/entities/Player";
    import PlayerClass from "../../app/entities/player/PlayerClass";
    import UIPlayerOverlay from "../../app/UIPlayerOverlay";

    export default {
        name: "PlayerName",
        props: {
            player: {
                type: Player,
                required: true,
            },
            tooltip: {
                type: Boolean,
                required: false,
                default: true,
            },
            linked: {
                type: Boolean,
                required: false,
                default: true,
            },
            gear: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            getClassSlugColor() {
                return PlayerClass.getSlugBySpecializationId(this.player.specialization.id);
            },
        },
        methods: {
            click() {
                if (this.linked && this.player.fromGuild)
                    UIPlayerOverlay.displayPlayer(this.player);
            }
        }
    }
</script>

<style scoped>
    .player-name a, .player-name .player-click {
        color: inherit;
        text-decoration: none;
        transition: 0.4s all;
        cursor: pointer;
        user-select: none;
    }

    .player-name a:hover, .player-name .player-click:hover {
        opacity: 0.5;
    }

    .player-name img {
        height: 24px;
        padding-right: 12px;
    }

    .no-guild {
        text-decoration: line-through;
    }
</style>