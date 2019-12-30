/**
 * A List of Classes
 */
class ClassList {
    
    /**
     * Creates a new ClassList
     * @param {...String} classes
     */
    constructor(...classes) {
        this.list = [];
        for (const className of classes || []) {
            this.add(className);
        }
    }
    
    /**
     * Adds a new Tuple to the list
     * @param {String} className
     * @returns {Void}
     */
    add(className) {
        if (className) {
            this.list.push(className);
        }
    }
    
    /**
     * Adds a new Tuple to the list if the condition is true
     * @param {String}  className
     * @param {Boolean} condition
     * @returns {Void}
     */
    addIf(className, condition) {
        if (className && condition) {
            this.list.push(className);
        }
    }
    
    /**
     * Adds a new Tuple to the start of the list
     * @param {String} className
     * @returns {Void}
     */
    addFirst(className) {
        if (className) {
            this.list.unshift(className);
        }
    }
    
    
    
    /**
     * Returns the Classes
     * @returns {String}
     */
    get() {
        return this.list.join(" ");
    }
    
    /**
     * Returns true if there are items
     * @returns {Boolean}
     */
    has() {
        return this.list.length > 0;
    }
}



// The Public API
export default ClassList;
