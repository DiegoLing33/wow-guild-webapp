export default class BlizzardAuthService {

    static clientId = "b737a74e00f54587b08026e2986dc334";
    static clientSecret = "szO2aKt1L1qGHdEF8dnB0GmUbb8iKXXB";

    static url = 'https://eu.battle.net/oauth/authorize';
    static urlToken = 'https://eu.battle.net/oauth/token';
    static redirectUrl = 'http://localhost:8080/callback'

    /**
     * Returns the API url with region and postfix
     * @param postfix
     * @param region
     * @return {string}
     */
    static getURL(postfix, region = 'eu') {
        return `https://${region}.battle.net/${postfix}`;
    }

    /**
     * Returns the API url with region, postfix and query
     * @param postfix
     * @param data
     * @param region
     * @return {string}
     */
    static getURLRequest(postfix, data, region = "eu") {
        return BlizzardAuthService.getURL(postfix, region) + "?" +
            new URLSearchParams(data);
    }

    /**
     * Returns the auth URL
     * @return {string}
     */
    static getAuthURL() {
        const uriData = {
            client_id: BlizzardAuthService.clientId,
            redirect_uri: BlizzardAuthService.redirectUrl,
            response_type: 'code',
            scope: 'wow.profile',
            app: 'oauth',
            state: new Date().getTime()
        };
        return BlizzardAuthService
            .getURLRequest('oauth/authorize', uriData);
    }

    static async createRequest(url, method = 'POST'){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                try {
                    const json = JSON.parse(xhr.responseText);
                    if (xhr.status !== 200) throw Error("Not loaded");
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            };
            xhr.open(method, url);
            xhr.send();
        });
    }

    /**
     * Loads the auth token
     * @param code
     * @return {Promise<any>}
     */
    static getAuthToken(code) {
        return new Promise((resolve) => {
            const uriData = {
                client_id: BlizzardAuthService.clientId,
                redirect_uri: BlizzardAuthService.redirectUrl,
                grant_type: 'authorization_code',
                code: code,
                client_secret: BlizzardAuthService.clientSecret,
            };
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                try {
                    const json = JSON.parse(xhr.responseText);
                    if (xhr.status !== 200) throw Error("Not loaded");
                    resolve(json);
                } catch (e) {
                    resolve(null);
                }
            };
            xhr.open('POST', BlizzardAuthService.urlToken + "?" + new URLSearchParams(uriData));
            xhr.send();

        });
    }

    /**
     * Loads the user info
     * @param token
     * @return {Promise<any>}
     */
    static async getUserInfo(token) {
        return new Promise((resolve, reject) => {
            const uriData = new URLSearchParams({
                access_token: token
            });
            const url = `https://eu.battle.net/oauth/userinfo?${uriData}`;
            fetch(url).then(value => {
                if(value.status !== 200){
                    reject('Bad auth');
                    return ;
                }
                value.json().then(json => resolve(json))
                    .catch(reason => reject(reason));
            })
        });

    }
}