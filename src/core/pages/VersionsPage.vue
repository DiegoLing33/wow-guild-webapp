<template>
    <BContainer>
        <BCard class="text-center">
            <h3 style="margin: 0;">Версии</h3>
        </BCard>
        <div class="feed-container">
            <div class="feed-inner mb-1" v-for="post in postsList" :key="post.getId()">
                <FeedPostView
                    :post-id="post.raw.id"
                    :image="post.raw.image"
                    :content="post.raw.content"
                    :category="post.getCategory().getTitle()"
                    :title="post.raw.title"
                    :likes="post.getLikes()"
                    :comments="post.getComments()"
                    :user="post.getUser()"
                    :date="post.getCreatedString().split('T')[0]"
                    @shouldReload="update"
                >
                    {{ post.raw.content }}
                </FeedPostView>
            </div>
        </div>
    </BContainer>
</template>

<script>

import FeedPostView from "@/modules/Posts/components/FeedPostView";
import {GuildAPI} from "prestij.xyz-api";

export default {
    name: "VersionsPage",
    components: {FeedPostView},
    data: () => ({
        postsList: []
    }),
    mounted() {
        this.update();
    },
    methods: {
        update() {
            GuildAPI.Posts.GetPostsByCategory(3).then(response => {
                this.postsList = response.response.items;
            });
        }
    }
}
</script>
