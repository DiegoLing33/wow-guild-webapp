<template>
    <PostsContainer
        @shouldReload="update"
        :posts="posts"/>
</template>

<script>
import {GuildAPI} from "prestij.xyz-api";
import PostsContainer from "@/modules/Posts/components/PostsContainer";

export default {
    name: "Feed",
    components: {PostsContainer},
    data: () => ({
        postsList: []
    }),
    mounted() {
        this.update();
    },
    computed: {
        posts() {
            const src = this.postsList;
            const c = src.length === 3 ? 2 : 4;
            return src.slice(0, c);
        }
    },
    methods: {
        update() {
            GuildAPI.Posts.GetPosts({limit: 4}).then(response => {
                this.postsList = response.response.items;
            });
        }
    }
}
</script>
