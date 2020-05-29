export default class PlayersUtils {

    /**
     *
     * @param {{name: string, id: string}[]|*[]} players
     * @return {string}
     */
    static getHash(players){
        const line = players.reduce((previousValue, currentValue) => previousValue + (currentValue.name + currentValue.id), "");
        return line;
    }

}
