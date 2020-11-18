<template>
    <div :class="([color, 'player-name'].join(' '))">
            <span @click="click()" class="player-click">
                <img :src="image" alt="Role">
                <span :class="(player.fromGuild <= 0 ? 'no-guild' : '')">{{player.getName()}}</span>
            </span> <span v-if="gear && player.getGear() > 0">({{player.getGear()}})</span>
    </div>
</template>

<script>
    import PlayerClass from "../../app/entities/player/PlayerClass";
    import UIPlayerOverlay from "../../app/UIPlayerOverlay";

    export default {
        name: "PlayerName",
        props: {
            player: {
                type: Object,
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
            color() {
                return PlayerClass.getSlugByByClassId(this.player.getClass().getWID());
            },
            image(){
                const type = this.player.getActiveSpec().getType();
                switch (type){
                    default:
                    case 0: return require("@/assets/types/noone.svg");
                    case 1: return require("@/assets/types/security.svg");
                    case 2: return require("@/assets/types/health.svg");
                    case 3: return require("@/assets/types/sword.svg");
                    case 4: return require("@/assets/types/bow-and-arrow.svg");
                }
            }
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