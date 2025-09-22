import NLS                  from "../Core/NLS";

// The Current Data
let statusIDs    = {};
let statusNames  = {};
let statusGroups = {};



/**
 * Initializes the Status data
 * @param {object[]} values
 * @param {object}   groups
 * @returns {void}
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
 * @param {string} name
 * @param {number} id
 * @returns {boolean}
 */
function is(name, id) {
    const status = statusNames[name];
    return status && status.id === id;
}

/**
 * Returns the Status ID
 * @param {string} name
 * @returns {object}
 */
function getID(name) {
    const status = statusNames[name];
    return status ? status.id : 0;
}

/**
 * Returns the Status Name
 * @param {number}   id
 * @param {boolean=} isFem
 * @returns {string}
 */
function getName(id, isFem = false) {
    const status = statusIDs[id];
    const suffix = isFem ? "_FEM" : "";
    return status ? NLS.get(`${status.message}${suffix}`) : "";
}

/**
 * Returns the Female Status Name
 * @param {number} id
 * @returns {string}
 */
function getFemName(id) {
    return getName(id, true);
}

/**
 * Returns a String with the Color
 * @param {number} id
 * @returns {string}
 */
function getColor(id) {
    const status = statusIDs[id];
    return status ? status.color : "gray";
}

/**
 * Returns a String with the Text Class
 * @param {number} id
 * @returns {string}
 */
function getTextClass(id) {
    const status = statusIDs[id];
    return status ? `text-${status.color}` : "";
}



/**
 * Creates a Status Select
 * @param {string}  type
 * @param {boolean} isFem
 * @returns {object[]}
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
 * @param {string=}  type
 * @param {boolean=} isFem
 * @returns {object[]}
 */
function getSelect(type = "GENERAL", isFem = false) {
    return createSelect(type, isFem);
}

/**
 * Returns the Female Status Select
 * @param {string=} type
 * @returns {object[]}
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
