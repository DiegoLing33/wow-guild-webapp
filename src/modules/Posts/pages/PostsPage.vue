<template>
    <BContainer>
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
name: "PostsPage",
    components: {FeedPostView},
    data: () => ({
        postsList: []
    }),
    mounted() {
        this.update();
    },
    methods: {
        update() {
            GuildAPI.Posts.GetPosts().then(response => {
                this.postsList = response.response.items;
            });
        }
    }
}
</script>

<style>
.feed-container {
    display: flex;
    margin: 0 -10px;
    flex-wrap: wrap;
}

.feed-inner {
    padding: 10px;
    width: 50%;
}

.feed-inner:first-child:last-child{
    margin: 0 auto;
}

@media (max-width: 1000px) {
    .feed-inner {
        width: 100%;
    }
}

</style>