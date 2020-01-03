/**
 * Returns true if the Object is empty
 * @param {Object} object
 * @returns {Boolean}
 */
function isEmpty(object) {
    return !object || Object.keys(object).length === 0;
}

/**
 * Clones an Object
 * @param {Object} object
 * @returns {Object}
 */
function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

/**
 * Clamps a Value between the Min and Max
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Returns the Bounds of the given Ref
 * @param {React.RefObject<HTMLElement>} ref
 * @returns {Object}
 */
function getBounds(ref) {
    if (ref.current) {
        return ref.current.getBoundingClientRect();
    }
    return {};
}

/**
 * Returns true if something is Selected
 * @returns {Boolean}
 */
function hasSelection() {
    return window.getSelection().toString() !== "";
}

/**
 * Unselects all that is Selected
 * @returns {Void}
 */
function unselectAll() {
    window.getSelection().removeAllRanges();
}

/**
 * Creates a Slug from a string
 * @param {String} value
 * @returns {String}
 */
function createSlug(value) {
    let result = value;
    result = result.replace(/^\s+|\s+$/g, ""); // trim
    result = result.toLowerCase();
    
    // Remove accents, swap ñ for n, etc
    const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
        result = result.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }
    
    // Remove invalid chars
    result = result.replace(/[^a-z0-9 -]/g, "");
    result = result.trim();
    // Collapse whitespace and replace by -
    result = result.replace(/\s+/g, "-");
    // Collapse dashes
    result = result.replace(/-+/g, "-");
    
    return result;
}




/**
 * Removes the Prefix
 * @param {Object}   data
 * @param {String}   prefix
 * @param {Boolean=} lower
 * @returns {Object}
 */
function removePrefix(data, prefix, lower = false) {
    const result = {};
    for (const [ key, value ] of Object.entries(data)) {
        if (key.startsWith(prefix)) {
            let id = key.replace(prefix, "");
            if (lower) {
                id = id.charAt(0).toLocaleLowerCase() + id.substring(1);
            }
            result[id] = value;
        }
    }
    return result;
}

/**
 * Creates an Array
 * @param {(any[]|any)} data
 * @returns {any[]}
 */
function toArray(data) {
    return Array.isArray(data) ? data : [ data ];
}

/**
 * Creates a Map from an Array
 * @param {Object[]} data
 * @param {String}   id
 * @returns {Object}
 */
function toMap(data, id) {
    const result = {};
    for (const elem of data) {
        result[elem[id]] = elem;
    }
    return result;
}

/**
 * Converts an Array with an id and name to a Select
 * @param {Object[]} data
 * @returns {{key: Number, value: String}[]}
 */
function toSelect(data) {
    const result = [];
    for (const elem of data) {
        result.push({
            key   : elem.key   || elem.id,
            value : elem.value || elem.name,
        });
    }
    return result;
}

/**
 * Uses the keys from primary and sets the secondary values if are set
 * @param {Object}   primary
 * @param {Object}   secondary
 * @param {Boolean=} noBinary
 * @returns {Object}
 */
function extend(primary, secondary, noBinary = false) {
    const result = {};
    for (const [ key, value ] of Object.entries(primary)) {
        const sec = secondary[key];
        if (sec !== undefined) {
            if (noBinary) {
                result[key] = sec;
            } else {
                result[key] = sec === true ? 1 : (sec === false ? 0 : sec);
            }
        } else {
            result[key] = value;
        }
    }
    return result;
}

/**
 * Returns the Value at the given id with the given key
 * @param {Object[]}        data
 * @param {String}          idKey
 * @param {(Number|String)} idValue
 * @param {String=}         key
 * @returns {(Object|String)}
 */
function getValue(data, idKey, idValue, key) {
    for (const elem of data) {
        if (String(elem[idKey]) === String(idValue)) {
            return key ? elem[key] : elem;
        }
    }
    return key ? "" : {};
}



/**
 * Returns an ID depeding on the type
 * @param {Object}    action
 * @param {...String} types
 * @returns {Boolean}
 */
function hasError(action, ...types) {
    return types.indexOf(action.type) > -1 && (!action.data || action.data.error);
}

/**
 * Returns true if the there is an error in the Form
 * @param {Object} errors
 * @returns {Boolean}
 */
function hasFormError(errors) {
    for (const error of Object.values(errors)) {
        if (error) {
            return true;
        }
    }
    return false;
}



/**
 * Returns the Circle Classes for the given color
 * @param {String} color
 * @returns {String}
 */
function getCircleClass(color) {
    return `circle circle-${color}`;
}




// The public API
export default {
    isEmpty,
    clone,
    clamp,
    getBounds,
    hasSelection,
    unselectAll,
    createSlug,

    removePrefix,
    toArray,
    toMap,
    toSelect,
    extend,
    getValue,

    hasError,
    hasFormError,

    getCircleClass,
};
