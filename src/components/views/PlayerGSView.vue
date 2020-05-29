<template>
    <div class="player-gs-view">
        <div class="gs-table" @click="$router.push(`/player/${player.name}`)">
            <div class="gs-cell gs-position">
                <b>{{number}}</b>
            </div>
            <div class="gs-cell gs-image" >
                <img class="spec-gs-image" :src="getSpecImage(player.name)" />
            </div>
            <div class="gs-cell gs-name" >
                <b>{{player.name}}</b>
                <div>Всего Guild Score: {{player.allGuildScore}}</div>
            </div>
            <div class="gs-cell gs-score" >
                {{player.guildScore}}
            </div>
        </div>
    </div>
</template>

<script>
    import SpecUtils from "@/app/players/SpecUtils";
    import Guild from "@/app/Guild";

    export default {
        name: "PlayerGSView",
        props: ["player", "number"],
        methods: {
            getSpecImage(name) {
                return SpecUtils.getImage(Guild.shared.getPlayer(name).role.id);
            },
        }
    }
</script>

<style>
    .gs-table{
        display: table;
        width: 100%;
        border-bottom: 1px solid grey;
        cursor: pointer;
        transition: all 0.4s;
        opacity: 1;
    }
    .gs-table:hover{
        opacity: 0.4;
    }
    .gs-cell{
        padding: 6px;
        display: table-cell;
        vertical-align: middle;
    }
    .spec-gs-image{
        height: 35px;
    }
    .gs-position{
        width: 50px;
    }
    .gs-name{
        word-break: break-word;
    }
    .gs-score, .gs-image {
        font-size: 24px;
        font-weight: 100;
        width: 60px;
    }
</style>
