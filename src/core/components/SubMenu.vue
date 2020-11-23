<template>
    <div class="sub-menu">
        <div class="sub-menu-item" @click="$router.push('/')">
            <img :src="book" alt="Главная">
            <div>Главная</div>
        </div>
        <div class="sub-menu-item" @click="$router.push('/players')">
            <img :src="warriors" alt="Игроки">
            <div>Игроки</div>
        </div>
        <div class="sub-menu-item" @click="$router.push('/posts')">
            <img :src="require('../assets/news.svg')" alt="News">
            <div>Новости</div>
        </div>
        <div class="sub-menu-item"  @click="$router.push('/mythic')">
            <img :src="dungeon" alt="Мифик+">
            <div>Мифик+</div>
        </div>
    </div>
</template>

<script>
    import book from "@/assets/book.svg";
    import log from "@/assets/log.svg";
    import warriors from "@/assets/miscellaneous.svg";
    import dungeon from "@/assets/dungeon.png";

    export default {
        name: "SubMenu",
        data() {
            return {
                book,
                log,
                warriors,
                dungeon
            }
        }
    }
</script>

<style scoped>

    .sub-menu{
        text-align: center;
        margin: 10px;
    }

    .sub-menu-item {
        display: inline-block;
        margin: 15px;
        opacity: 1;
        transition: all 0.7s;
        text-transform: uppercase;
        font-size: 12px;
        cursor: pointer;
    }
    .sub-menu-item:hover{
        opacity: 0.6;
    }

    .sub-menu-item img {
        height: 50px;
    }
</style>
