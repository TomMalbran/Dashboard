import React                from "react";



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
 * Concats the Values
 * @param {String}    glue
 * @param {...String} values
 * @returns {Object}
 */
function concat(glue, ...values) {
    const result = [];
    for (const value of values) {
        if (value) {
            result.push(value);
        }
    }
    return result.join(glue);
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
 * @param {(Array|any)} data
 * @returns {Array}
 */
function toArray(data) {
    return Array.isArray(data) ? data : [ data ];
}

/**
 * Creates an Array Entries
 * @param {(Array|any)} data
 * @returns {IterableIterator}
 */
function toEntries(data) {
    return toArray(data).entries();
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
 * Converts an Array of strings to a Select
 * @param {String[]} data
 * @returns {{key: Number, value: String}[]}
 */
function stringsToSelect(data) {
    const result = [];
    for (const [ key, value ] of data.entries()) {
        result.push({ key, value });
    }
    return result;
}

/**
 * Creates an Array of N numbers
 * @param {Number}  amount
 * @param {Number=} start
 * @returns {Number[]}
 */
function createArrayOf(amount, start = 1) {
    const result = [];
    for (let i = start; i < amount + start; i++) {
        result.push(i);
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
 * Returns the Children
 * @param {(Array|any)} children
 * @returns {IterableIterator}
 */
function getChildren(children) {
    const result = [];
    for (const child of toArray(children)) {
        if (child && child.props) {
            result.push(child);
        }
    }
    return result.entries();
}

/**
 * Returns the Visible Children
 * @param {(Array|any)} children
 * @returns {IterableIterator}
 */
function getVisibleChildren(children) {
    const result = [];
    for (const child of toArray(children)) {
        if (child && child.props && !child.props.isHidden) {
            result.push(child);
        }
    }
    return result.entries();
}

/**
 * Returns an array of Cloned Visible Children
 * @param {(Array|any)} children
 * @param {Function}    callback
 * @returns {Object[]}
 */
function cloneChildren(children, callback) {
    const result = [];
    let   key    = 0;
    for (const child of toArray(children)) {
        if (child && child.props && !child.props.isHidden) {
            const values = callback(child, key);
            result.push(React.cloneElement(child, {
                key, ...values,
            }));
            key += 1;
        }
    }
    return result;
}


/**
 * Parses the Given List
 * @param {Object[]} list
 * @param {Function} callback
 * @returns {Object[]}
 */
function parseList(list, callback) {
    if (!list) {
        return [];
    }
    for (const elem of list) {
        callback(elem);
    }
    return list;
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



// The public API
export default {
    isEmpty,
    clone,
    clamp,
    getBounds,
    hasSelection,
    unselectAll,
    createSlug,

    concat,
    removePrefix,
    toArray,
    toEntries,
    toMap,
    toSelect,
    stringsToSelect,
    createArrayOf,
    extend,
    getValue,

    getChildren,
    getVisibleChildren,
    cloneChildren,

    parseList,
    hasError,
    hasFormError,
};
