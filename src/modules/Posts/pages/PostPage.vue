<template>
    <b-container>
        <div v-if="post">
            <BCard
                :img-src="post.raw.image"
                no-body
            >
                <BCardHeader style="position: relative">
                    <div class="button_like button_item" @click="handleClickLike">
                        <img class="img_item"
                             :src="hasLike ? require('../assets/like_red.svg') : require('../assets/like.svg')" alt=""/>
                        <div class="like_text">{{ shadowLikes.length }}</div>
                    </div>
                    <BCardTitle>
                        <b>{{ post.raw.category.title }}</b>: {{ post.raw.title }}
                        <b-dropdown v-if="isMine" no-caret toggle-class="action_button__btn" class="action_button">
                            <template #button-content>
                                <img class="img_item" :src="require('../assets/actions.svg')" alt=""/>
                            </template>
                            <b-dropdown-item @click="() => $router.push('/post/create?edit=' + post.getId())">
                                Редактировать
                            </b-dropdown-item>
                            <b-dropdown-item @click="handleDeleteClick" variant="danger" href="#">Удалить
                            </b-dropdown-item>
                        </b-dropdown>
                    </BCardTitle>
                    <div class="description">
                        {{ post.getCreatedString() }} -
                        <router-link :to="'/posts/p/' + post.getUser().getBlizzardId()">
                            {{ post.getUser().getBlizzardName() }}
                        </router-link>
                    </div>
                </BCardHeader>
                <BCardBody class="content-h" v-html="post.raw.content"/>
            </BCard>
        </div>
    </b-container>
</template>

<script>
import {GuildAPI} from "prestij.xyz-api";
import PostsServices from "@/modules/Posts/services";

export default {
    name: "PostPage",
    props: ['reqId'],
    data: () => ({
        post: null,
        shadowLikes: [],
    }),
    created() {

    },
    async mounted() {
        this.post = await GuildAPI.Posts.GetPost(this.reqId);
        this.shadowLikes = [...this.post.getLikes()];
    },
    computed: {
        hasLike() {
            return !!this.shadowLikes.find(v => v.raw.user_id === this.$store.getters.userId);
        },
        isMine() {
            return this.post.getUser().getBlizzardId() === this.$store.getters.userId;
        }
    },
    methods: {
        async handleClickLike() {
            this.shadowLikes = await PostsServices.like(
                this.post.getId(),
                this.shadowLikes,
                this.hasLike,
            );
        },
        async handleDeleteClick() {
            const res = await GuildAPI.Posts.DeletePost(this.post.getId(), {
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

<style lang="scss" scoped>
.description {
    opacity: 0.7;
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
    position: absolute;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 8px 16px;
    top: -60px;
    display: flex;
    align-items: center;
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


</style>