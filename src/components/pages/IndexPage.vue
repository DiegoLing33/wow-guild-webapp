<template>
    <div>
        <b-container>
            <b-card class="mb-3" bg-variant="primary">
                <a target="_blank" class="gd" href='https://discord.gg/8rhXHj8uDm'>
                    <div class="guild_ds">
                        <img class="guild_image" :src="guild_logo"/>
                        <div class="guild_text pl-3">
                            Присоединиться к Discord
                            <div class="small">@{{$store.getters["guild/name"]}}</div>
                        </div>
                    </div>
                </a>
            </b-card>
            <Feed class="mt-3"></Feed>
            <b-card-group deck>
                <b-card class="info-item mb-3">
                    <h2>Достижения</h2>
                    <div class="my-3 text-muted">Очки достижений</div>
                    <img :src="achievement" alt="Достижения">
                    <h3>{{ $store.getters["guild/achievementPoints"] }}</h3>
                </b-card>
                <b-card @click="$router.push('/players')" class="info-item mb-3 sector-item">
                    <h2>Игроки</h2>
                    <div class="my-3 text-muted">Количество игроков</div>
                    <img :src="antique" alt="Игроков">
                    <h3>{{ $store.getters["guild/playersCount"] }}</h3>
                </b-card>
            </b-card-group>

            <b-card-group deck>
                <b-card class="info-item mb-3">
                    <h2>MVGP</h2>
                    <div class="my-3 text-muted">Герой недели</div>
                    <img :src="medal" alt="MVGP">
                    <h3 class="mvgp-go">
<!--                        <player-name :player="mvgp" :linked="false"></player-name>-->
                        ({{ mvgp.guildScore.thisWeek }})
                    </h3>
                </b-card>
                <b-card class="info-item mb-3">
                    <h2>Активность</h2>
                    <div class="my-3 text-muted">Активность игроков {{ $store.getters["guild/name"] }}</div>
                    <img :src="rating" alt="Guild score гильдии">
                    <h3>{{ $store.getters["players/activity/maxActivity"] }}</h3>
                </b-card>
            </b-card-group>

            <b-card title="Информация">
                <div><b>Название:</b> {{$store.getters["guild/name"]}}</div>
                <div><b>Очки достижений:</b> {{$store.getters["guild/achievementPoints"]}}</div>
                <div><b>Участников:</b> {{$store.getters["guild/playersCount"]}}</div>
                <div><b>Дата создания:</b> {{ created }}</div>
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
import Player from "../../app/entities/Player";
import guild_logo from "@/assets/guild-logo.png";
import Feed from "@/modules/Posts/components/Feed";

export default {
    name: "IndexPage",
    components: {Feed},
    computed: {
        created() {
            const date = new Date(this.$store.getters["guild/createdTimestamp"] * 1);
            return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}, в ${date.toLocaleTimeString()}`;
        },
    },
    mounted() {
        Guild.shared.wait(() => {
            this.guild = Guild.shared;
            this.mvgp = Guild.shared.getPlayer(Guild.shared.getRatingWeek(1)[0].name);
        });
    },
    data() {
        return {
            achievement,
            antique,
            medal,
            rating,
            guild_logo,
            guild: {guildScore: {all: 0}},
            mvgp: new Player({}),
        }
    },

}
</script>

<style lang="scss" scoped>
.gd{
    text-decoration: none !important;
}
.info {
    padding: 15px;
    padding-bottom: 0;
}

.guild_ds {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-content: center;
    align-items: center;
    width: 100%;
    justify-content: center;
    opacity: 1;
    transition: all 0.3s;

    &:hover {
        opacity: 0.5;
        text-decoration: none !important;
    }
}

.guild_image {
    display: block;
    height: 100px;
    border-radius: 50%;
}

.guild_text {
    line-height: 1.1;
    font-size: 1.5rem;
    color: white !important;

    .small {
        opacity: 0.8;
        font-size: 1.3rem;
    }
}

.guild_text a {
    color: #e7e7e7;
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

.sector-item {
    cursor: pointer;
    transition: all 0.4s;
    opacity: 1;
}

.sector-item:hover {
    cursor: pointer;
    background-color: #434343;
    opacity: 0.4;
}
</style>
