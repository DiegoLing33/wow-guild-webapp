import {GuildAPI} from "prestij.xyz-api";

export const postsStore = {
    namespaced: true,
    state: () => ({
        loadedPosts: [],
        lastPage: 0,
        requestedPost: null,
    }),
    getters: {
        loadedPosts: state => state.loadedPosts,
        lastPage: state => state.lastPage,
        requestedPost: state => state.requestedPost,
    },
    mutations: {
        setPosts(state, payload) {
            state.loadedPosts = [
                ...state.loadedPosts,
                ...payload.filter(pl => !state.loadedPosts.includes(v => v.id === pl.id))
            ];
        },
        setLastPage(state, payload) {
            state.lastPage = payload;
        },
        setRequestedPost(state, payload) {
            state.requestedPost = payload;
        }
    },
    actions: {
        getPosts({commit}, payload) {
            GuildAPI.Posts.GetPosts().then(value => {
                commit("setPosts", value.response.items);
                commit("setLastPage", payload.page);
            });
        },
        requestPost({commit}, payload) {
            commit("setRequestedPost", null);
            GuildAPI.Posts.GetPost(payload).then(value => {
                console.log(value);
                commit("setRequestedPost", value);
            });
        }
    },
};