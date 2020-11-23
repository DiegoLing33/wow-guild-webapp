import PostPage from "@/modules/Posts/pages/PostPage";
import PostCreatePage from "@/modules/Posts/pages/PostCreatePage";
import PostsPage from "@/modules/Posts/pages/PostsPage";
import PostsPlayerPage from "@/modules/Posts/pages/PostsPlayerPage";

export const feedRoutes = [
    {path: '/post/create', component: PostCreatePage},
    {path: '/post/:reqId', component: PostPage, props: true},

    {path: '/posts/p/:playerId', component: PostsPlayerPage, props: true},
    {path: '/posts', component: PostsPage},
];