/**
 * API Client
 */
export default class API {
    static URL = "http://prestij.xyz/api/index.php";

    static __temp = {};

    /**
     * Makes hero request
     *
     * @param name
     * @param temp
     * @returns {Promise<unknown>}
     */
    static async hero(name, temp){
        return await API.request("hero", {name: name.toLowerCase()}, temp);
    }

    /**
     * Makes media request
     *
     * @param name
     * @param temp
     * @returns {Promise<{avatar_url: string, bust_url: string, render_url: string}>}
     */
    static async media(name, temp){
        return await API.request("media", {name: name.toLowerCase()}, temp);
    }

    /**
     * Makes heroes request
     *
     * @param page
     * @param temp
     * @returns {Promise<unknown>}
     */
    static async heroes(page, temp){
        return await API.request("heroes", {p: page}, temp);
    }

    /**
     * Makes mythic request
     *
     * @param page
     * @param temp
     * @returns {Promise<unknown>}
     */
    static async mythic(page, temp){
        return await API.request("mythic", {p: page}, temp);
    }

    /**
     * Makes guild request
     *
     * @param temp
     * @returns {Promise<unknown>}
     */
    static async guild(temp){
        return await API.request("guild", {}, temp);
    }

    /**
     * Makes an API request
     *
     * @param act
     * @param data
     * @param temp
     * @returns {Promise<*>}
     */
    static async request(act, data, temp) {
        temp = temp || true;
        try {
            data         = data || {};
            const args   = {...data, ...{act}};
            const params = Object.keys(args).map(key => `${key}=${args[key]}`).join("&");
            const path   = API.URL + "?" + params;

            if(temp && API.__temp[path] !== undefined) return Promise.resolve(API.__temp[path]);
            const ft     = await fetch(path);
            const json   = await ft.json();
            if (json["response"] !== undefined) {
                API.__temp[path] = json.response;
                return Promise.resolve(json.response);
            }
            return Promise.reject(json.error || "Undefined error!");
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
