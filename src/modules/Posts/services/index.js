import {store} from "@/core/store";
import {GuildAPI} from "prestij.xyz-api";

export default class PostsServices {

    /**
     * Auto adds the like
     *
     * @param postId
     * @param shadowLikes
     * @param hasLike
     * @return {Promise<*[]>}
     */
    static async like(postId, shadowLikes, hasLike) {
        let shdl = [...shadowLikes];

        const args = {
            post_id: postId,
            token: store.getters.authToken,
        };

        if (!hasLike) {
            const result = await GuildAPI.Posts.LikePost(args);
            if (result) shdl.push({raw: {user_id: store.getters.userId}});
        } else {
            await GuildAPI.Posts.UnlikePost(args);
            shdl = shdl.filter(v => v.raw.user_id !== store.getters.userId);
        }
        return shdl;
    }
}