import React                from "react";
import NLS                  from "../Core/NLS";



/**
 * Returns true if the value is a String
 * @param {*} value
 * @returns {Boolean}
 */
function isString(value) {
    return typeof value === "string" || value instanceof String;
}

/**
 * Returns true if the value is an Object
 * @param {*} value
 * @returns {Boolean}
 */
function isObject(value) {
    return typeof value === "object" && value !== null;
}

/**
 * Returns true if the Object is empty
 * @param {Object} object
 * @returns {Boolean}
 */
function isEmpty(object) {
    return !object || Object.keys(object).length === 0;
}

/**
 * Returns true if the Object has the given property
 * @param {Object} object
 * @param {String} property
 * @returns {Boolean}
 */
function hasProp(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
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
 * Returns true if the given Point is in the Bounds
 * @param {Number}  x
 * @param {Number}  y
 * @param {Object}  bounds
 * @param {Number=} scrollTop
 * @returns {Boolean}
 */
function inBounds(x, y, bounds, scrollTop = 0) {
    return (
        y > bounds.top - scrollTop && y < bounds.bottom &&
        x > bounds.left && x < bounds.right
    );
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
 * Formats a number
 * @param {Number} number
 * @param {Number} decimals
 * @returns {String}
 */
function formatNumber(number, decimals) {
    const amount  = Math.pow(10, decimals);
    const float   = Math.round(number * amount) / amount;
    const integer = Math.floor(float);
    let   result  = String(integer);

    if (float < 1000) {
        const fraction = Math.round(float * amount - integer * amount);
        const start    = String(fraction).length;

        result = String(`${integer}.${fraction}`);
        for (let i = start; i < decimals; i++) {
            result += "0";
        }
    }

    const parts = result.split(".");
    parts[0]    = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (!decimals) {
        return parts[0];
    }
    return parts.join(",");
}

/**
 * Gives an html format to prices
 * @param {Number}   price
 * @param {Boolean=} skipZeros
 * @param {String=}  zeroStr
 * @param {String=}  symbol
 * @returns {String}
 */
function formatPrice(price, skipZeros, zeroStr, symbol = "$") {
    if (skipZeros && price === 0) {
        return zeroStr || "";
    }

    const sign     = price < 0 ? "-" : "";
    const positive = Math.abs(price);
    const noCents  = Math.floor(positive);
    const cents    = Math.round(positive * 100 - noCents * 100);
    const centsStr = cents < 10 ? "0" + cents : String(cents);

    return `${symbol} ${sign}${noCents.toLocaleString()}<sup>${centsStr}</sup>`;
}

/**
 * Returns the Page Text
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @returns {String}
 */
function getPageText(currentPage, totalPages) {
    return NLS.format("GENERAL_PAGE", String(currentPage), String(totalPages));
}

/**
 * Returns Yes or No depnding of the value
 * @param {(Number|String)} value
 * @returns {String}
 */
function toYesNo(value) {
    return NLS.get("GENERAL_YES_NO", Number(value) || 0);
}

/**
 * Returns Yes or Blank depnding of the value
 * @param {(Number|String)} value
 * @returns {String}
 */
function toYesBlank(value) {
    return NLS.get("GENERAL_YES_BLANK", Number(value) || 0);
}

/**
 * Returns a String with the Text Class
 * @param {String} options
 * @param {Number} value
 * @returns {String}
 */
function getTextClass(options, value) {
    const color = NLS.get(options, Number(value) || 0);
    return color ? `text-${color}` : "";
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
 * Returns true if both given objects are the same at 1 level deep
 * @param {Object} a
 * @param {Object} b
 * @returns {Boolean}
 */
function areObjectsEqual(a, b) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i += 1) {
        if (String(a[aProps[i]]) !== String(b[aProps[i]])) {
            return false;
        }
    }
    return true;
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
 * Uses the keys from primary and adds the secondary values if are not set
 * @param {Object}   primary
 * @param {Object}   secondary
 * @param {Boolean=} noBinary
 * @returns {Object}
 */
function merge(primary, secondary, noBinary = false) {
    const result = { ...primary };
    for (const [ key, value ] of Object.entries(secondary)) {
        if (primary[key] === undefined) {
            if (noBinary) {
                result[key] = value;
            } else {
                result[key] = value === true ? 1 : (value === false ? 0 : value);
            }
        }
    }
    return result;
}

/**
 * Returns the Value at the given id with the given key
 * @param {Object[]}        data
 * @param {String}          idKey
 * @param {(Number|String)} idValue
 * @returns {?Number}
 */
function getIndex(data, idKey, idValue) {
    for (const [ index, elem ] of Object.entries(data)) {
        if (String(elem[idKey]) === String(idValue)) {
            return Number(index);
        }
    }
    return null;
}

/**
 * Returns the Value at the given id with the given key
 * @param {Object[]}        data
 * @param {String}          idKey
 * @param {(Number|String)} idValue
 * @param {String=}         key
 * @param {*=}              defValue
 * @returns {(Object|String)}
 */
function getValue(data, idKey, idValue, key, defValue) {
    if (data) {
        for (const elem of data) {
            if (String(elem[idKey]) === String(idValue)) {
                return key ? elem[key] : elem;
            }
        }
    }
    if (defValue !== undefined) {
        return defValue;
    }
    return key ? "" : {};
}

/**
 * Combines the Values in the given Key into a String
 * @param {Object} elem
 * @param {String} key
 * @returns {String}
 */
function combineValues(elem, key) {
    let parts = [ "" ];
    if (elem[key]) {
        try {
            parts = JSON.parse(String(elem[key]));
            if (!Array.isArray(parts)) {
                parts = [ parts ];
            }
        } catch(e) {
            parts = [ "" ];
        }
    }
    return parts.join(" - ");
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
        if (child && child.props) {
            const has = hasProp(child.props, "isHidden");
            if ((has && !child.props.isHidden) || !has) {
                result.push(child);
            }
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
    const result  = [];
    let   key     = 0;
    let   realKey = 0;

    for (const child of toArray(children)) {
        if (child && child.props && !child.props.isHidden) {
            const values = callback(child, key);
            result.push(React.cloneElement(child, {
                key, realKey, ...values,
            }));
            key += 1;
        }
        realKey += 1;
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



/**
 * Returns the Youtube Embed Url
 * @param {String} source
 * @returns {String}
 */
function getYoutubeEmbed(source) {
    if (!source) {
        return "";
    }
    let videoID = "";
    if (source.startsWith("https://youtu.be/")) {
        videoID = source.replace("https://youtu.be/", "");
    } else if (source.startsWith("https://www.youtube.com/watch?v=")) {
        videoID = source.replace("https://www.youtube.com/watch?v=", "");
    } else if (source.startsWith("https://www.youtube.com/embed/")) {
        videoID = source.replace("https://www.youtube.com/embed/", "");
    }
    if (videoID.includes("&")) {
        videoID = videoID.split("&")[0];
    }
    if (!videoID) {
        return "";
    }
    return `https://www.youtube-nocookie.com/embed/${videoID}?version=3&modestbranding=1&rel=0&showinfo=0`;
}

/**
 * Returns the Vimeo Embed Url
 * @param {String}   source
 * @param {Boolean=} showInfo
 * @returns {String}
 */
function getVimeoEmbed(source, showInfo = false) {
    if (!source) {
        return "";
    }
    let videoID = "";
    if (source.startsWith("https://vimeo.com/")) {
        videoID = source.replace("https://vimeo.com/", "");
    } else if (source.startsWith("https://www.vimeo.com/")) {
        videoID = source.replace("https://www.vimeo.com/", "");
    }
    if (!videoID) {
        return "";
    }
    let result = `https://player.vimeo.com/video/${videoID}`;
    result    += showInfo ? "?title=1&byline=1&portrait=1" : "?title=0&byline=0&portrait=0";
    return result;
}




// The public API
export default {
    isString,
    isObject,
    isEmpty,
    hasProp,
    clone,
    clamp,
    getBounds,
    inBounds,
    hasSelection,
    unselectAll,
    createSlug,
    formatNumber,
    formatPrice,
    getPageText,
    toYesNo,
    toYesBlank,
    getTextClass,

    concat,
    removePrefix,
    toArray,
    toEntries,
    toMap,
    toSelect,
    stringsToSelect,
    createArrayOf,
    areObjectsEqual,
    extend,
    merge,
    getIndex,
    getValue,
    combineValues,

    getChildren,
    getVisibleChildren,
    cloneChildren,

    parseList,
    hasError,
    hasFormError,

    getYoutubeEmbed,
    getVimeoEmbed,
};
