<template>
    <div class="player-gs-view">
        <div class="gs-table" @click="modal(player.player)">
            <div class="gs-cell gs-position">
                <b>{{number}}</b>
            </div>
            <div class="gs-cell gs-image">
                <img class="spec-gs-image" :src="getSpecImage(player.name)" />
            </div>
            <div class="gs-cell gs-name" >
                <b :class="getSpecClass(player.name)">{{player.name}}</b>
                <div>Всего Guild Score: {{player.allGuildScore}}</div>
            </div>
            <div class="gs-cell gs-score" >
                {{player.guildScore}}
            </div>
        </div>
    </div>
</template>

<script>
    import Guild from "@/app/Guild";
    import UIPlayerOverlay from "../../app/UIPlayerOverlay";

    export default {
        name: "PlayerGSView",
        props: ["player", "number"],
        methods: {
            getSpecImage(name) {
                return Guild.shared.getPlayer(name).role.image;
            },
            getSpecClass(name){
                return  Guild.shared.getPlayer(name).class.slug;
            },
            modal(player){
                UIPlayerOverlay.displayPlayer(player);
            }
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
