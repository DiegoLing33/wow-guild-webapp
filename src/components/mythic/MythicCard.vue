<template>
    <b-card
            :border-variant="borderVariant" no-body  :footer="formattedDate" :header="(`${dungeon} (${level})`)">
        <b-card-body>
                <b-badge v-if="in_time" variant="success">В ТАЙМ: {{duration}}</b-badge>
                <b-badge v-else variant="danger">НЕ В ТАЙМ: {{duration}}</b-badge>
        </b-card-body>
        <div class="mt-2">
            <b-list-group flush>
                <b-list-group-item
                        @click="($router.push({path: '/player/'+player.name}).catch(() => {}))"
                        class="user-line" v-for="player in sortedMembers" :key="(`${mythic.mythic_hash}_${player.id}`)">
                    <img class="spec-image" :src="getSpecImage(player.spec.id)"/>
                    {{player.name}} ({{getGear(player.name)}})
                </b-list-group-item>
            </b-list-group>
            <b-card-body>
                <slot></slot>
                <b-badge
                        class="mr-2"
                        variant="warning" style="cursor: pointer; user-select: none"
                        v-b-popover.hover.top="affixes">Аффиксы</b-badge>
                <b-badge
                        v-if="mythic.thisWeek"
                        class="mr-2"
                        variant="primary" style="cursor: pointer; user-select: none"
                        v-b-popover.hover.top="'Подземелье пройдено на этой недели'">Неделя</b-badge>
                <b-badge
                        variant="info" style="cursor: pointer; user-select: none"
                        v-b-popover.hover.top="'Очки Guild Score, которые заработали участники прохождения'">+{{mythic.guildScore}} GS</b-badge>
            </b-card-body>
        </div>
    </b-card>
</template>

<script>
    import DateUtils from "@/app/utils/DateUtils";
    import GameData from "@/data/GameData";
    import SpecUtils from "@/app/players/SpecUtils";
    import Guild from "@/app/Guild";
    import MythicUtils from "@/app/MythicUtils";

    export default {
        name:     "MythicCard",
        props:    ["date", "level", "dungeon", "in_time", "duration", "members", "mythic_hash", "mythic"],
        computed: {
            affixes() {
                return this.mythic.affixes.map(v => v.name).join(", ");
            },
            formattedDate() {
                return DateUtils.format(this.date > 9999999999 ? this.date : this.date * 1000)
            },
            sortedMembers() {
                return this.getMembers();
            },
            borderVariant() {
                const m = Guild.shared.mythic[this.mythic_hash];
                if (MythicUtils.isGuildRace(m)) return "primary";
                return m.done_in_time ? "success" : "danger";
            }
        },
        methods:  {
            getMembers() {
                return this.members.sort((a, b) => {
                    const aS = GameData.specIdToTypeId(a.spec.id);
                    const bS = GameData.specIdToTypeId(b.spec.id);
                    return aS > bS ? 1 : -1;
                });
            },
            getSpecImage(specId) {
                const specTypeId = GameData.specIdToTypeId(specId);
                return SpecUtils.getImage(specTypeId);
            },
            getGear(name) {
                return Guild.shared.hasPlayer(name) ?
                    Guild.shared.getPlayer(name).gear :
                    "-";
            }
        }
    }
</script>

<style scoped>
    .user-line {
        cursor: pointer;
        transition: all 0.6s;
        opacity: 1;
    }

    .user-line:hover {
        background-color: #5d5d5d !important;
    }
</style>
