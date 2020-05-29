<template>
    <b-container>
        <guild-score-info-common></guild-score-info-common>
        <b-card header="Калькулятор GS Mythic+">
            <b-row>
                <b-col md="6" sm="12">
                    <div class="mb-3">
                        <div>Кол-во согильдейцев в команде:</div>
                        <b-form-spinbutton id="demo-sb" v-model="guildPlayersCount" min="1" max="5"></b-form-spinbutton>
                    </div>
                </b-col>
                <b-col md="6" sm="12">
                    <div class="mb-3">
                        <div>Уровень ключа:</div>
                        <b-form-spinbutton id="demo-sb" v-model="keyLevel" min="2" max="40"></b-form-spinbutton>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col>
                    <b-form-checkbox
                            id="checkbox-1"
                            v-model="doneInTime"
                            name="checkbox-1"
                            value="1"
                            unchecked-value="0"
                    > Ключ будет закрыт в тайм</b-form-checkbox>
                </b-col>
            </b-row>
            <h4 class="pt-3">Вы получите: {{result}} Guild Score</h4>
        </b-card>
    </b-container>
</template>

<script>
    import GuildScoreInfoCommon from "@/components/common/GuildScoreInfoCommon";
    import MythicUtils from "@/app/MythicUtils";
    export default {
        name: "GuildSocreCalcPage",
        components: {GuildScoreInfoCommon},
        computed:{
          result(){
              return MythicUtils.getGuildScoreForPlayer({
                  done_in_time: (this.doneInTime === "1") ? 0.15 : 0.1,
                  guildPlayers: {length: this.guildPlayersCount},
                  level: this.keyLevel
              });
          }
        },
        data(){
            return {
                guildPlayersCount: 1,
                keyLevel: 2,
                doneInTime: "1",
            }
        }
    }
</script>

<style scoped>

</style>
