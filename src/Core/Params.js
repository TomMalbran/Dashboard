// All the params
const paramTypes = {};



/**
 * Initializes the Params
 * @param {Object} params
 * @returns {Void}
 */
function init(params) {
    for (const [ key, value ] of Object.entries(params)) {
        paramTypes[key] = value;
    }
}



/**
 * Returns the From Route
 * @param {String} route
 * @returns {String}
 */
function getFrom(route) {
    return route.split("/").slice(0, -2).join("/");
}

/**
 * Returns the Parent Route
 * @param {String} route
 * @returns {String}
 */
function getParent(route) {
    const parent = route.split("/").slice(0, -1).join("/");
    return parent || "/";
}

/**
 * Returns all the params
 * @param {Object} params
 * @returns {Object}
 */
function getAll(params) {
    const result = {};
    for (const key of Object.values(paramTypes)) {
        result[key] = Number(params[key] || 0);
    }
    return result;
}

/**
 * Returns a single param
 * @param {Object} params
 * @param {String} type
 * @returns {Number}
 */
function getOne(params, type) {
    if (paramTypes[type]) {
        return params[paramTypes[type]] || 0;
    }
    return 0;
}

/**
 * Unsets the Params
 * @param {Object} params
 * @returns {Object}
 */
function unset(params) {
    for (const key of Object.values(paramTypes)) {
        params[key] = 0;
    }
    return params;
}




// The public API
export default {
    init,
    getFrom,
    getParent,
    getAll,
    getOne,
    unset,
};
