/**
 * The player modal component
 */
export default class UIPlayerOverlay {

    /**
     * The player modal component
     * @type {*}
     */
    static component = null;

    /**
     * Displays the player modal
     * @param {Player} player
     */
    static displayPlayer(player) {
        UIPlayerOverlay.component.show(player);
    }

    /**
     * Hides the player modal card
     */
    static hide(){
        this.component.hide();
    }

}
