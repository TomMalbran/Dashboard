import NLS                  from "../Core/NLS";

// The Current Data
let statusIDs    = {};
let statusNames  = {};
let statusGroups = {};



/**
 * Initializes the Status data
 * @param {Object[]} values
 * @param {Object}   groups
 * @returns {Void}
 */
function init(values, groups) {
    statusIDs    = {};
    statusNames  = {};
    statusGroups = groups;

    for (const status of values) {
        statusIDs[status.id]     = status;
        statusNames[status.name] = status;
    }
}



/**
 * Returns true if the Status with the given name has the give id
 * @param {String} name
 * @param {Number} id
 * @returns {Boolean}
 */
function is(name, id) {
    const status = statusNames[name];
    return status && status.id === id;
}

/**
 * Returns the Status ID
 * @param {String} name
 * @returns {Object}
 */
function getID(name) {
    const status = statusNames[name];
    return status ? status.id : 0;
}

/**
 * Returns the Status Name
 * @param {Number}   id
 * @param {Boolean=} isFem
 * @returns {String}
 */
function getName(id, isFem = false) {
    const status = statusIDs[id];
    const suffix = isFem ? "_FEM" : "";
    return status ? NLS.get(`${status.message}${suffix}`) : "";
}

/**
 * Returns the Female Status Name
 * @param {Number} id
 * @returns {String}
 */
function getFemName(id) {
    return getName(id, true);
}

/**
 * Returns a String with the Color
 * @param {Number} id
 * @returns {String}
 */
function getColor(id) {
    const status = statusIDs[id];
    return status ? status.color : "gray";
}

/**
 * Returns a String with the Text Class
 * @param {Number} id
 * @returns {String}
 */
function getTextClass(id) {
    const status = statusIDs[id];
    return status ? `text-${status.color}` : "";
}



/**
 * Creates a Status Select
 * @param {String}  type
 * @param {Boolean} isFem
 * @returns {Object[]}
 */
function createSelect(type, isFem) {
    const group  = statusGroups[type] || [];
    const result = [];
    for (const key of group) {
        const value = getName(key, isFem);
        result.push({ key, value });
    }
    return result;
}

/**
 * Returns the Status Select
 * @param {String=}  type
 * @param {Boolean=} isFem
 * @returns {Object[]}
 */
function getSelect(type = "GENERAL", isFem = false) {
    return createSelect(type, isFem);
}

/**
 * Returns the Female Status Select
 * @param {String=} type
 * @returns {Object[]}
 */
function getFemSelect(type = "GENERAL") {
    return createSelect(type, true);
}



// The Public API
export default {
    init,

    is,
    getID,
    getName,
    getFemName,
    getColor,
    getTextClass,
    getSelect,
    getFemSelect,
};
