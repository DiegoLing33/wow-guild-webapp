import BlizzardAuthService from "@/modules/Login/service/BlizzardAuthService";

export const loginStore = {
    state: () => ({
        authCode: '123',
        authToken: '',
        userId: 0,
        battletag: '',
    }),
    getters: {
        authCode: state => state.authCode,
        authToken: state => state.authToken,
        battleTag: state => state.battletag,
        userId: state => state.userId,
    },
    mutations: {
        setAuthCode: (state, payload) => {
            state.authCode = payload;
        },
        setToken(state, payload) {
            state.authToken = payload;
        },
        setAuth(state, payload) {
            state.userId = payload.id;
            state.battletag = payload.battletag;
        },
    },
    actions: {
        initAuthorization: async (inject) => {
            // Token
            const localToken = localStorage.getItem('token');
            if (localToken) await inject.dispatch("authByToken", localToken);
        },

        initLogin: async (inject) => {
            // Code
            const url = new URL(window.location);
            const code = url.searchParams.get('code');

            if (code && code !== '') {
                console.log('Code: ' + code);
                const token = await inject.dispatch("authByCode", code);
                console.log('Token: ' + token);
                if (token !== false) {
                    await inject.dispatch("authByToken", token);
                }
                return Promise.resolve(token);
            }
            return Promise.resolve(null);
        },

        /**
         * Authorization by token
         *
         * @param inject
         * @param payload
         * @return {Promise<unknown>}
         */
        authByToken: async (inject, payload) => {
            inject.commit("setToken", payload);
            return new Promise((resolve) => {
                BlizzardAuthService.getUserInfo(payload)
                    .then((data) => {
                        inject.commit("setAuth", data);
                        resolve(true)
                    })
                    .catch(() => resolve(false));
            });
        },

        /**
         * Authorization by code
         *
         * @param inject
         * @param payload
         * @return {Promise<unknown>}
         */
        authByCode: async (inject, payload) => {
            return new Promise(resolve => {
                BlizzardAuthService.getAuthToken(payload).then(result => {
                    if (result !== null) {
                        inject.commit("setAuthCode", payload);
                        inject.commit("setToken", result['access_token']);
                        localStorage.setItem('token', result['access_token']);
                        resolve(result['access_token']);
                    } else {
                        console.log('Error');
                        resolve(false);
                    }
                });
            });
        },
    }
};