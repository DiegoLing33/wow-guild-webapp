export default class StringUtils {

    static title(text){
        const str = text.trim().toLowerCase();
        return str.substr(0, 1).toUpperCase() +
            str.substr(1).toLowerCase();
    }

}
