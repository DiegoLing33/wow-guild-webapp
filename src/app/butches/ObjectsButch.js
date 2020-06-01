/**
 * Default objects butch
 * @template T
 */
export default class ObjectsButch {

    /**
     * Constructor
     * @param {T[]} objects
     */
    constructor(objects ) {
        /**
         * @type {T[]}
         * @protected
         */
        this.__objects = objects;
    }

    /**
     * Adds items to the butch
     * @param {T} o
     * @return ObjectsButch
     */
    add(...o){
        this.__objects.push(...o);
        return this;
    }

    /**
     * Returns the butch
     * @return {T[]}
     */
    getButch() {
        return this.__objects;
    }

    /**
     * Returns the size
     * @return {number}
     */
    getSize(){
        return this.__objects.length;
    }

}
