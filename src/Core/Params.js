// All the params
const PARAMS = {};



/**
 * Initializes the Params
 * @param {Object} params
 * @returns {Void}
 */
function init(params) {
    for (const [ key, value ] of Object.entries(params)) {
        PARAMS[key.toLocaleUpperCase()] = value;
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
 * Returns all the params
 * @param {Object} params
 * @returns {Object}
 */
function getAll(params) {
    const result = {};
    for (const key of Object.values(PARAMS)) {
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
    const key = `${type}ID`;
    return params[key] || 0;
}

/**
 * Unsets the Params
 * @param {Object} params
 * @returns {Object}
 */
function unset(params) {
    for (const key of Object.values(PARAMS)) {
        params[key] = 0;
    }
    return params;
}




// The public API
export default {
    init,
    getFrom,
    getAll,
    getOne,
    unset,
};
