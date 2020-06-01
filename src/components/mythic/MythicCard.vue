<template>
    <b-card
            :border-variant="borderVariant" no-body :footer="formattedDate"
            :header="(`${mythic.dungeon.name} (${mythic.level})`)">
        <b-card-body>
            <b-badge v-if="mythic.isDone" variant="success">В ТАЙМ: {{mythic.doneInTimeFormat}}</b-badge>
            <b-badge v-else variant="danger">НЕ В ТАЙМ: {{mythic.doneInTimeFormat}}</b-badge>
        </b-card-body>
        <div class="mt-2">
            <mythic-card-players
                    :players="mythic.players"
                    :mythic-hash="mythic.mythicHash">
            </mythic-card-players>
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
    import Mythic from "@/app/entities/Mythic";
    import MythicCardPlayers from "@/components/mythic/MythicCardPlayers";

    export default {
        name: "MythicCard",
        components: {MythicCardPlayers},
        props: {
            mythic: {
                required: true,
                type: Mythic
            }
        },
        computed: {
            affixes() {
                return this.mythic.affixes.map(v => v.name).join(", ");
            },
            formattedDate() {
                return DateUtils.format(this.mythic.completed);
            },
            borderVariant() {
                if (this.mythic.isGuildRace()) return "primary";
                return this.mythic.isDone ? "success" : "danger";
            }
        },
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
