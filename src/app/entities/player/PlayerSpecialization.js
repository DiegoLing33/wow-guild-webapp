/**
 * The player specialization entity
 */
export default class PlayerSpecialization {
    constructor({id, name} = {}) {
        /**
         * The player specialization id
         */
        this.id = id;

        /**
         * The player specialization title
         */
        this.title = name;
    }
}