<template>
    <div :class="([color, 'player-name'].join(' '))">
            <span @click="click()" class="player-click">
                <img :src="image" alt="Role">
                <span :class="(player.raw.from_guild <= 0 ? 'no-guild' : '')">{{ player.raw.name }}</span>
            </span> <span v-if="gear && player.raw.gear > 0">({{ player.raw.gear }})</span>
    </div>
</template>

<script>
import {WFTClass} from "prestij.xyz-api";

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
            const hasClass = this.player.getClass;
            if (hasClass) {
                return WFTClass.getSlugById(this.player.getClass().getWID());
            } else {
                const theSpec = this.player.getActiveSpec();
                const theRoles = WFTClass.getSpecializations();

                for (const cid in theRoles) {
                    const cof = theRoles[cid];
                    if (cof.includes(theSpec.getWID())) {
                        return WFTClass.getSlugById(cid);
                    }
                }
                return 'dh';
            }
        },
        image() {
            switch (this.player.getActiveSpec().getType()) {
                default:
                case 0:
                    return require("@/assets/types/noone.svg");
                case 1:
                    return require("@/assets/types/security.svg");
                case 2:
                    return require("@/assets/types/health.svg");
                case 3:
                    return require("@/assets/types/sword.svg");
                case 4:
                    return require("@/assets/types/bow-and-arrow.svg");
            }
        }
    },
    methods: {
        click() {
            if (this.linked && (this.player.raw.gear || this.player.raw.from_guild)) {
                this.$store.dispatch("players/setPlayerOverlay", this.player.raw.wow_id);
            }
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