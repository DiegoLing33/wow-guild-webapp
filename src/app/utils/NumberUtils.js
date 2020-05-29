/**
 * Number utilities
 */
export default class NumberUtils {

    static getPercentage(val, max, dec){
        let add = 1;
        for(let i = 0; i < dec; i++) add *= 10;
        return Math.round(val / max * (100 * add)) / add;
    }

}
