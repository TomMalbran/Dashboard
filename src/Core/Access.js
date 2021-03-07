import NLS                  from "../Core/NLS";

// The Current Data
let accessIDs    = {};
let accessNames  = {};
let accessGroups = {};



/**
 * Initializes the Access data
 * @param {Object[]} values
 * @param {Object}   groups
 * @returns {Void}
 */
function init(values, groups) {
    accessIDs    = {};
    accessNames  = {};
    accessGroups = groups;

    for (const access of values) {
        accessIDs[access.id]     = access;
        accessNames[access.name] = access;
    }
}



/**
 * Returns true if the Access with the given name has the give id
 * @param {String} name
 * @param {Number} id
 * @returns {Boolean}
 */
function is(name, id) {
    const access = accessNames[name];
    return access && access.id === Number(id);
}

/**
 * Returns the Access ID
 * @param {String} name
 * @returns {Object}
 */
function getID(name) {
    const access = accessNames[name];
    return access ? access.id : 0;
}

/**
 * Returns the Access Name
 * @param {Number} id
 * @returns {String}
 */
function getName(id) {
    const access = accessIDs[id];
    return access ? NLS.get(access.message) : "";
}



/**
 * Returns true of the Access group contains the ID
 * @param {String} type
 * @param {Number} id
 * @returns {Boolean}
 */
function inGroup(type, id) {
    const group = accessGroups[type] || [];
    return group.includes(Number(id));
}

/**
 * Returns the Access Select
 * @param {String} type
 * @returns {Object[]}
 */
function getSelect(type) {
    const group  = accessGroups[type] || [];
    const result = [];
    for (const key of group) {
        const value = getName(key);
        result.push({ key, value });
    }
    return result;
}



// The Public API
export default {
    init,

    is,
    getID,
    getName,
    inGroup,
    getSelect,
};
