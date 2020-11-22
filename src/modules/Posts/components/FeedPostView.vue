<template>
    <div class="feed-node"
         :style="{
        '--mainR': mainColor[0],
        '--mainG': mainColor[1],
        '--mainB': mainColor[2],
    }">

        <b-dropdown v-if="isMine" no-caret toggle-class="action_button__btn" class="action_button">
            <template #button-content>
                <img class="img_item" :src="require('../assets/actions.svg')" alt=""/>
            </template>
            <b-dropdown-item @click="() => $router.push('/post/create?edit=' + postId)">Редактировать</b-dropdown-item>
            <b-dropdown-item @click="handleDeleteClick" variant="danger" href="#">Удалить</b-dropdown-item>
        </b-dropdown>

        <div class="image_div" @click="goPost" :style="{backgroundImage: `url('${image}')`}">
            <div class="header_div">
                <div class="header_category">{{ category }}</div>
                <div class="header_name" @click="goPost">{{ title }}</div>
            </div>
        </div>
        <div class="body_div">
            <div class="body_text content-h-m" v-html="decodedContent"/>
        </div>
        <div class="body_date">{{ date }}</div>
        <div class="footer_div">
            <div class="buttons_div">
                <div class="button_like button_item" @click="handleClickLike">
                    <img class="img_item"
                         :src="hasLike ? require('../assets/like_red.svg') : require('../assets/like.svg')" alt=""/>
                    <div class="like_text">{{ shadowLikes.length }}</div>
                </div>
                <div class="button_comment button_item">
                    <img class="img_item" :src="require('../assets/comment.svg')" alt=""/>
                    <div class="comment_text">{{ comments.length }}</div>
                </div>
            </div>
            <div class="author_div button_item">
                <img class="img_item" :src="require('../assets/user.svg')" alt=""/>
                <div class="author_text">{{ user.getBlizzardName().split('#')[0] }}</div>
            </div>
        </div>
    </div>
</template>

<script>

import FastAverageColor from "fast-average-color";
import tinycolor from "tinycolor2";
import PostsServices from "@/modules/Posts/services";
import {GuildAPI} from "prestij.xyz-api";

export default {
    name: "FeedPostView",

    props: {
        postId: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
        likes: {
            type: Array,
            required: true,
        },
        comments: {
            type: Array,
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
    },

    data: () => ({
        mainColor: [30, 30, 30],
        shadowLikes: [],
    }),
    computed: {
        hasLike() {
            return !!this.shadowLikes.find(v => v.raw.user_id === this.$store.getters.userId);
        },
        decodedContent() {
            return this.content.substr(0, 200);
        },
        isMine() {
            return this.user.getBlizzardId() === this.$store.getters.userId;
        }
    },
    created() {
        this.shadowLikes = [...this.likes];
        const img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const fac = new FastAverageColor();
            fac.getColorAsync(img).then(color => {
                const __tc = tinycolor(color.hex);
                while (__tc.getBrightness() > 50) __tc.darken(10)
                const tc = __tc.toRgb();
                this.mainColor = [tc.r, tc.g, tc.b];
            });
        };
        img.src = this.image;
    },
    methods: {
        goPost() {
            this.$router.push('/post/' + this.postId);
        },
        async handleClickLike() {
            this.shadowLikes = await PostsServices.like(
                this.postId,
                this.shadowLikes,
                this.hasLike,
            );
        },
        async handleDeleteClick() {
            const res = await GuildAPI.Posts.DeletePost(this.postId, {
                token: this.$store.getters.authToken
            });
            if (res.detail) return this.$toast.error(res.detail);
            if (res === true) {
                this.$emit('Запись успешно удалена!');
                this.$emit('shouldReload');
            }
        }
    }
}
</script>

<style lang="scss">
.content-h-m {
    table {
        display: none !important;
    }
}
</style>
<style lang="scss">
.action_button__btn {
    background-color: rgba(0, 0, 0, 0.5) !important;
    border-radius: 8px;
    border: none;
    outline: none !important;
    transition: all 0.4s;
    opacity: 0.7;
    box-shadow: none !important;

    &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.5);
    }

    &:active, &:focus {
        opacity: 1;
        outline: none !important;
        background-color: rgba(0, 0, 0, 0.8) !important;
    }
}
</style>
<style scoped lang="scss">
.feed-node {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 600px;
    background-color: rgb(var(--mainR), var(--mainG), var(--mainB));
    border-radius: 16px;
}

.image_div {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;

    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 417px;
    background-position: center top;
    background-size: auto 100%;
    background-repeat: no-repeat;
    content: " ";

    cursor: pointer;
    transition: all 0.4s;

    &:hover {
        background-size: auto 120%;

        .header_div {
            height: 194px;
        }
    }
}

.header_div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 124px;
    background-image: linear-gradient(180deg, rgba(50, 50, 50, 0.00) 0%, rgba(var(--mainR), var(--mainG), var(--mainB), 0.74) 64%, rgb(var(--mainR), var(--mainG), var(--mainB)) 90%);
    padding: 0 16px;
    transition: all 0.4s;
}

.header_category {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.73);

    opacity: 1;
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
        opacity: 0.6;
    }
}

.header_name {
    font-size: 24px;
    color: rgba(255, 255, 255, 1);

    opacity: 1;
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
        opacity: 0.6;
    }
}

.body_div {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    padding-top: 8px;
}

.body_text {
    color: rgba(130, 130, 130, 1);
    font-size: 17px;
    overflow: hidden;
    max-height: 66px;
    height: 66px;
}

.body_date {
    width: 100%;
    text-align: right;
    margin-top: auto;
    color: rgba(91, 91, 91, 1);
    font-size: 11px;
    padding: 0 16px;
    padding-bottom: 12px;
}

.action_button {
    padding: 2px 8px;
    position: absolute;
    top: 8px;
    right: 8px;
}

.footer_div {
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;

    display: flex;
    height: 60px;
    align-items: flex-end;
    background-image: linear-gradient(180deg, rgba(30, 30, 30, 0.77) 1%, rgba(50, 50, 50, 0.00) 2%, rgba(1, 1, 1, 0.11) 90%);
    padding: 0 16px;
    padding-bottom: 12px;
}

.buttons_div {
    display: flex;
    align-items: center;
}

.button_item {
    opacity: 1;
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
        opacity: 0.6;
    }
}

.button_like {
    display: flex;
    align-items: center;

    margin-right: 16px;
}

.img_item {
    width: 30px;
    height: 30px;
    margin-right: 4px;
}

.like_text {
    font-size: 17px;
    color: rgba(161, 161, 161, 1);
}

.button_comment {
    display: flex;
    align-items: center;
    margin-right: 16px;
}

.comment_text {
    font-size: 17px;
    color: rgba(161, 161, 161, 1);
}

.author_div {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: flex-end;
}

.author_text {
    font-size: 17px;
    color: rgba(161, 161, 161, 1);
}


</style>