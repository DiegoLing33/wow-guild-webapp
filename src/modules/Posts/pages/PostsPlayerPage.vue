<template>
    <BContainer v-if="user">
        <BCard class="text-center">
            <h3 style="margin: 0;">Записи: {{ user.getBlizzardName() }}</h3>
        </BCard>
        <PostsContainer
            @shouldReload="update"
            :posts="posts"/>
    </BContainer>
    <BContainer class="text-center" v-else>
        <template v-if="error === ''">
            Загрузка данных...
        </template>
        <template v-else>
            <BAlert variant="danger" show>{{ error }}</BAlert>
        </template>
    </BContainer>
</template>

<script>
import {GuildAPI} from "prestij.xyz-api";
import PostsContainer from "@/modules/Posts/components/PostsContainer";

export default {
    name: "PostsPlayerPage",
    components: {PostsContainer},
    props: ["playerId"],
    data: () => ({
        posts: [],
        user: null,
        error: '',
    }),
    async mounted() {
        this.update();
    },
    methods: {
        async update() {
            try {
                this.user = await GuildAPI.GetUser(this.playerId);

                const temp = await GuildAPI.Posts.GetPostsByBlizzardId(this.playerId);
                this.posts = temp.response.items;
            } catch (e) {
                this.error = 'Пользователь не найден!';
            }
        }
    }
}
</script>

