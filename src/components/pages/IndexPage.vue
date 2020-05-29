<template>
    <div>
        <b-container>
            <b-card-group deck>
                <b-card class="info-item mb-3">
                    <h2>Достижения</h2>
                     <div class="my-3 text-muted">Очки достижений</div>
                    <img :src="achievement" alt="Достижения">
                    <h3>{{guild.achievement_points}}</h3>
                </b-card>
                <b-card @click="$router.push('/players')" class="info-item mb-3 sector-item">
                    <h2>Игроки</h2>
                    <div class="my-3 text-muted">Количество игроков</div>
                    <img :src="antique" alt="Игроков">
                    <h3>{{guild.playersCount}}</h3>
                </b-card>
            </b-card-group>

            <b-card-group deck>
                <b-card @click="$router.push('/score')" class="info-item mb-3 sector-item">
                    <h2>MVGP</h2>
                    <div class="my-3 text-muted">Герой недели</div>
                    <img :src="medal" alt="MVGP">
                    <h3 class="mvgp-go">{{mvgp.name}} ({{mvgp.guildScore}})</h3>
                </b-card>
                <b-card @click="$router.push('/players')" class="info-item mb-3 sector-item">
                    <h2>GS</h2>
                    <div class="my-3 text-muted">Guild Score {{guild.name}}</div>
                    <img :src="rating" alt="Guild score гильдии">
                    <h3>{{guild.guildScore.all}}</h3>
                </b-card>
            </b-card-group>

            <b-card title="Информация">
                <div><b>Название:</b> {{guild.name}}</div>
                <div><b>Очки достижений:</b> {{guild.achievement_points}}</div>
                <div><b>Участников:</b> {{guild.playersCount}}</div>
                <div><b>Дата создания:</b> {{created}}</div>
            </b-card>
        </b-container>
    </div>
</template>

<script>
    import achievement from "@/assets/achievement.svg";
    import antique from "@/assets/antique.svg";
    import medal from "@/assets/medal.svg";
    import rating from "@/assets/rating.svg";
    import Guild from "@/app/Guild";

    export default {
        name:     "IndexPage",
        computed: {
            created() {
                const date = new Date(this.guild.created);
                return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}, в ${date.toLocaleTimeString()}`;
            },
        },
        mounted() {
            Guild.shared.wait(() => {
                this.guild = Guild.shared;
                this.mvgp = Guild.shared.getRatingWeek(1)[0];
            });
        },
        data() {
            return {
                achievement,
                antique,
                medal,
                rating,
                guild: {},
                mvgp: "",
            }
        },

    }
</script>

<style scoped>
    .info {
        padding: 15px;
        padding-bottom: 0;
    }


    .info-item {
        text-align: center;
        background-color: gray;
        padding: 15px;
    }


    .info-item img {
        max-width: 100%;
        height: 100px;
    }

    h3 {
        padding: 10px;
        font-weight: bold;
    }
    .sector-item{
        cursor: pointer;
        transition: all 0.4s;
        opacity: 1;
    }
    .sector-item:hover{
        cursor: pointer;
        background-color: #434343;
        opacity: 0.4;
    }
</style>
