<template>
    <b-card
            :border-variant="borderVariant" no-body :footer="formattedDate"
            :header="(`${mythic.dungeon_name} (${mythic.level})`)">
        <b-card-body>
            <b-badge v-if="mythic.done_in_time" variant="success">В ТАЙМ: {{mythic.done_in_formatted}}</b-badge>
            <b-badge v-else variant="danger">НЕ В ТАЙМ: {{mythic.done_in_formatted}}</b-badge>
        </b-card-body>
        <div class="mt-2">
            <b-list-group flush>
                <b-list-group-item
                        @click="modal(player)"
                        :class="className(player.specialization)" v-for="player in sortedMembers"
                        :key="(`${mythic.mythic_hash}_${player.id}`)">
                    <player-name :player="player" :linked="false" :tooltip="false" :gear="true"></player-name>
                </b-list-group-item>
            </b-list-group>
            <b-card-body>
                <slot></slot>
                <b-badge
                        class="mr-2"
                        variant="warning" style="cursor: pointer; user-select: none"
                        v-b-popover.hover.top="affixes">Аффиксы
                </b-badge>
                <b-badge
                        v-if="mythic.thisWeek"
                        class="mr-2"
                        variant="primary" style="cursor: pointer; user-select: none"
                        v-b-popover.hover.top="'Подземелье пройдено на этой недели'">Неделя
                </b-badge>
                <b-badge
                        variant="info" style="cursor: pointer; user-select: none"
                        v-b-popover.hover.top="'Очки Guild Score, которые заработали участники прохождения'">
                    +{{mythic.guildScore}} GS
                </b-badge>
            </b-card-body>
        </div>
    </b-card>
</template>

<script>
    import DateUtils from "@/app/utils/DateUtils";
    import Guild from "@/app/Guild";
    import MythicUtils from "@/app/MythicUtils";
    import PlayerClass from "../../app/entities/player/PlayerClass";
    import PlayerName from "../player/PlayerName";
    import UIPlayerOverlay from "../../app/UIPlayerOverlay";

    export default {
        name: "MythicCard",
        components: {PlayerName},
        props: ["mythic"],
        computed: {
            affixes() {
                return this.mythic.affixes.map(v => v.name).join(", ");
            },
            formattedDate() {
                return DateUtils.format(this.mythic.completed > 9999999999 ? this.mythic.completed : this.mythic.completed * 1000)
            },
            sortedMembers() {
                return this.getMembers();
            },
            borderVariant() {
                const m = Guild.shared.mythic[this.mythic.mythic_hash];
                if (MythicUtils.isGuildRace(m)) return "primary";
                return m.done_in_time ? "success" : "danger";
            }
        },
        methods: {
            getMembers() {
                return this.mythic.members.sort((a, b) => {
                    return a.role.id > b.role.id ? 1 : -1;
                });
            },
            getGear(name) {
                return Guild.shared.hasPlayer(name) ?
                    Guild.shared.getPlayer(name).gear :
                    "-";
            },
            className(specialization) {
                return ['user-line', PlayerClass.getSlugBySpecializationId(specialization.id)].join(' ');
            },
            modal(player) {
                if (player.fromGuild)
                    UIPlayerOverlay.displayPlayer(player);
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
