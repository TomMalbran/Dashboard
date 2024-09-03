import React                from "react";
import NLS                  from "../Core/NLS";



/**
 * Returns true if is Mobile
 * @returns {Boolean}
 */
function isMobile() {
    return window.innerWidth < 700;
}

/**
 * Returns true if the value is a Boolean
 * @param {*} value
 * @returns {Boolean}
 */
function isBoolean(value) {
    return typeof value === "boolean";
}

/**
 * Returns true if the value is a String
 * @param {*} value
 * @returns {Boolean}
 */
function isString(value) {
    return typeof value === "string" || value instanceof String;
}

/**
 * Returns true if the value is a Number
 * @param {*} value
 * @returns {Boolean}
 */
function isNumeric(value) {
    return !isNaN(value);
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
 * Returns the Property as a boolean
 * @param {(Number|String)} property
 * @returns {Boolean}
 */
function isActive(property) {
    return Boolean(Number(property));
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
 * Returns the amount of items in the Object
 * @param {Object} object
 * @returns {Number}
 */
function count(object) {
    return object ? Object.keys(object).length : 0;
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
 * Rounds a Value with the given decimals
 * @param {Number} value
 * @param {Number} decimals
 * @returns {Number}
 */
function round(value, decimals) {
    const padding = Math.pow(10, decimals);
    return Math.round(value * padding) / padding;
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
 * Maps a Value between the Low and High to the target Low and High
 * @param {Number} value
 * @param {Number} fromLow
 * @param {Number} fromHigh
 * @param {Number} toLow
 * @param {Number} toHigh
 * @returns {Number}
 */
function mapValue(value, fromLow, fromHigh, toLow, toHigh) {
    const fromRange = fromHigh - fromLow;
    const toRange   = toHigh - toLow;
    if (fromRange === 0) {
        return toLow;
    }

    const scaleFactor = toRange / fromRange;
    let   tmpValue = value - fromLow;
    tmpValue *= scaleFactor;
    return tmpValue + toLow;
}

/**
 * Returns the Bounds of the given Ref
 * @param {React.RefObject<HTMLElement>} ref
 * @returns {Void}
 */
function triggerClick(ref) {
    if (ref && ref.current) {
        ref.current.click();
    }
}

/**
 * Returns the Bounds of the given Ref
 * @param {React.RefObject<HTMLElement>} ref
 * @returns {Object}
 */
function getBounds(ref) {
    if (ref && ref.current) {
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
 * Returns true if the given Point is in the Bounds
 * @param {Number}                       x
 * @param {Number}                       y
 * @param {React.RefObject<HTMLElement>} ref
 * @param {Number=}                      scrollTop
 * @returns {Boolean}
 */
function inRef(x, y, ref, scrollTop = 0) {
    const bounds = getBounds(ref);
    return (
        y > bounds.top - scrollTop && y < bounds.bottom &&
        x > bounds.left && x < bounds.right
    );
}

/**
 * Scrolls to the Bottom
 * @param {React.RefObject<HTMLElement>} ref
 * @param {Boolean}                      instant
 * @returns {Void}
 */
function scrollToBottom(ref, instant) {
    const node = ref.current;
    if (node) {
        node.scrollTo({
            top      : node.scrollHeight - node.offsetHeight,
            behavior : instant ? "instant" : "smooth",
        });
    }
}

/**
 * Inserts an Text in the given Message
 * @param {React.RefObject<HTMLInputElement>} ref
 * @param {String}                            message
 * @param {String}                            text
 * @returns {String}
 */
function insertText(ref, message, text) {
    if (!ref.current) {
        return message + text;
    }
    const start = ref.current.selectionStart;
    const end   = ref.current.selectionEnd;
    return (
        message.substring(0, start) +
        text +
        message.substring(end)
    );
}

/**
 * Formats the given Message
 * @param {React.RefObject<HTMLInputElement>} ref
 * @param {String}                            message
 * @param {String}                            character
 * @returns {String}
 */
function formatText(ref, message, character) {
    if (!ref.current) {
        return message;
    }
    const start = ref.current.selectionStart;
    const end   = ref.current.selectionEnd;
    return (
        message.substring(0, start) +
        character +
        message.substring(start, end) +
        character +
        message.substring(end)
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
 * Returns the Current Time
 * @returns {Number}
 */
function getCurrentTime() {
    return Math.floor(new Date().getTime() / 1000);
}

/**
 * Scrolls the Selector into View
 * @param {String}  selector
 * @param {String=} block
 * @param {String=} inline
 * @param {String=} behavior
 * @returns {Void}
 */
function scrollIntoView(selector, block, inline = "center", behavior = "smooth") {
    const node = document.querySelector(selector);
    if (node) {
        node.scrollIntoView({
            // @ts-ignore
            block, inline, behavior,
        });
    }
}



/**
 * Sets a Timeout
 * @param {React.MutableRefObject<Number>} timerRef
 * @param {Function}                       callback
 * @param {Number}                         milliseconds
 * @returns {Void}
 */
function setTimeout(timerRef, callback, milliseconds) {
    clearTimeout(timerRef);
    timerRef.current = window.setTimeout(callback, milliseconds);
}

/**
 * Returns the Timeout for the auto update
 * @param {React.MutableRefObject<Number>} timerRef
 * @param {Function}                       setUpdate
 * @param {Number=}                        update
 * @param {Number=}                        seconds
 * @returns {Void}
 */
function setUpdateTimeout(timerRef, setUpdate, update = 0, seconds = 10) {
    setTimeout(timerRef, () => {
        setUpdate(update + 1);
    }, seconds * 1000);
}

/**
 * Clears the Timeout for the auto update
 * @param {React.MutableRefObject<Number>} timerRef
 * @returns {Void}
 */
function clearTimeout(timerRef) {
    if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = 0;
    }
}

/**
 * Sets a Interval
 * @param {React.MutableRefObject<Number>} timerRef
 * @param {Function}                       callback
 * @param {Number}                         milliseconds
 * @returns {Void}
 */
function setInterval(timerRef, callback, milliseconds) {
    clearInterval(timerRef);
    timerRef.current = window.setInterval(callback, milliseconds);
}

/**
 * Clears the Interval for the auto update
 * @param {React.MutableRefObject<Number>} timerRef
 * @returns {Void}
 */
function clearInterval(timerRef) {
    if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = 0;
    }
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

    /* spell-checker: disable-next-line */
    const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    /* spell-checker: disable-next-line */
    const to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";

    // Remove accents, swap ñ for n, etc
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
 * @param {Number}  number
 * @param {Number=} decimals
 * @param {Number=} maxForDecimals
 * @returns {String}
 */
function formatNumber(number, decimals = 0, maxForDecimals = 1000) {
    const amount  = Math.pow(10, decimals);
    const float   = Math.round(number * amount) / amount;
    const integer = Math.floor(float);
    let   result  = String(integer);

    if (!maxForDecimals || float < maxForDecimals) {
        let fraction = String(Math.round(float * amount - integer * amount));
        const start  = fraction.length;

        for (let i = start; i < decimals; i++) {
            fraction = `0${fraction}`;
        }
        result = String(`${integer}.${fraction}`);
    }

    const parts = result.split(".");
    parts[0]    = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (!decimals) {
        return parts[0];
    }
    return parts.join(",");
}

/**
 * Calculates and formats a percent
 * @param {Number}   number
 * @param {Number}   total
 * @param {Number=}  decimals
 * @param {Boolean=} withPercent
 * @returns {String}
 */
function formatPercent(number, total, decimals = 0, withPercent = true) {
    const percent   = total === 0 ? 0 : (number * 100 / total);
    const formatted = formatNumber(percent, decimals);
    return formatted + (withPercent ? "%" : "");
}

/**
 * Gives an html format to prices
 * @param {Number}   price
 * @param {Boolean=} skipZeros
 * @param {String=}  zeroStr
 * @param {String=}  symbol
 * @returns {String}
 */
function formatPrice(price, skipZeros = false, zeroStr = "", symbol = "$") {
    if (skipZeros && price === 0) {
        return zeroStr || "";
    }

    const sign       = price < 0 ? "-" : "";
    const positive   = Math.abs(price);
    const noCents    = Math.floor(positive);
    const noCentsStr = noCents.toLocaleString(window.navigator.language);
    const cents      = Math.round(positive * 100 - noCents * 100);
    const centsStr   = cents < 10 ? "0" + cents : String(cents);

    return `${symbol} ${sign}${noCentsStr}<sup>${centsStr}</sup>`;
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
 * Returns Yes or No depending of the value
 * @param {(Number|String)} value
 * @returns {String}
 */
function toYesNo(value) {
    return NLS.get("GENERAL_YES_NO", Number(value) || 0);
}

/**
 * Returns Yes or Blank depending of the value
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
 * Restores an Item from Local Storage
 * @param {String} key
 * @param {String} defaultValue
 * @returns {String}
 */
function restoreItem(key, defaultValue = "") {
    try {
        const value = window.localStorage.getItem(key);
        return value || defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

/**
 * Stores an Item in Local Storage
 * @param {String}          key
 * @param {(String|Number)} value
 * @returns {Boolean}
 */
function storeItem(key, value) {
    try {
        window.localStorage.setItem(key, String(value));
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Concat the Values
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
 * Returns true if 2 objects are equal
 * @param {Object} object1
 * @param {Object} object2
 * @returns {Boolean}
 */
function areEqual(object1, object2) {
    const string1 = JSON.stringify(object1);
    const string2 = JSON.stringify(object2);
    return string1 === string2;
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
 * Returns true if the given array has the given value
 * @param {(String|Number)[]} values
 * @param {(String|Number)}   elem
 * @returns {Boolean}
 */
function hasValue(values, elem) {
    for (const value of values) {
        if (String(value) === String(elem)) {
            return true;
        }
    }
    return null;
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
 * Returns the Value at the given id with the given key
 * @param {Object[]}        data
 * @param {String}          idKey
 * @param {(Number|String)} idValue
 * @param {String=}         key
 * @returns {Array.<(Object|String)>}
 */
function getValues(data, idKey, idValue, key) {
    const result = [];
    if (data) {
        for (const elem of data) {
            if (String(elem[idKey]) === String(idValue)) {
                result.push(key ? elem[key] : elem);
            }
        }
    }
    return result;
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
            parts = Array.isArray(elem[key]) ? elem[key] : JSON.parse(String(elem[key]));
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
    const isFiltered = (child) => child && child.props && !child.props.isHidden;
    const list       = toArray(children);
    const total      = list.filter(isFiltered).length;
    const result     = [];
    let   key        = 0;
    let   realKey    = 0;

    for (const child of list) {
        if (isFiltered(child)) {
            const values  = callback(child, key, total);
            const isFirst = key === 0;
            const isLast  = key === total - 1;
            result.push(React.cloneElement(child, {
                key, realKey, isFirst, isLast, ...values,
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
 * Returns an ID depending on the type
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
 * Returns the Select items
 * @param {Number[]} itemIDs
 * @param {Object[]} options
 * @param {Object}   idsPerItem
 * @returns {Object[]}
 */
function getSelectItems(itemIDs, options, idsPerItem) {
    const result = [];
    for (const itemID of itemIDs) {
        if (idsPerItem[itemID]) {
            for (const id of idsPerItem[itemID]) {
                const item = getValue(options, "key", id);
                result.push(item);
            }
        }
    }
    return result;
}

/**
 * Returns the Select list based on a Parent
 * @param {Boolean}  loading
 * @param {Number[]} itemIDs
 * @param {Object[]} options
 * @param {Object}   idsPerItem
 * @returns {Function}
 */
function useSelectList(loading, itemIDs, options, idsPerItem) {
    const itemList = JSON.stringify(itemIDs);

    return React.useCallback(() => {
        if (!itemIDs.length) {
            return options;
        }
        return getSelectItems(itemIDs, options, idsPerItem);
    }, [ loading, itemList ]);
}

/**
 * Returns the Select list based on a Parent
 * @param {Boolean}  loading
 * @param {Number[]} itemIDs
 * @param {Number[]} subItemIDs
 * @param {Object[]} options
 * @param {Object}   idsPerItem
 * @param {Object}   subIdsPerItem
 * @returns {Function}
 */
function useSubSelectList(loading, itemIDs, subItemIDs, options, idsPerItem, subIdsPerItem) {
    const itemList    = JSON.stringify(itemIDs);
    const subItemList = JSON.stringify(subItemIDs);

    return React.useCallback(() => {
        if (!itemIDs.length && !subItemIDs.length) {
            return options;
        }
        if (subItemIDs.length) {
            return getSelectItems(subItemIDs, options, subIdsPerItem);
        }
        return getSelectItems(itemIDs, options, idsPerItem);
    }, [ loading, itemList, subItemList ]);
}



/**
 * Returns the YouTube Embed Url
 * @param {String} source
 * @returns {String}
 */
function getYouTubeEmbed(source) {
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

/**
 * Creates a Google Map Embed Url
 * @param {Number}   latitude
 * @param {Number}   longitude
 * @param {String=}  query
 * @param {Number=}  zoom
 * @param {Boolean=} satelite
 * @returns {String}
 */
function getGoogleMapEmbed(latitude, longitude, query = "", zoom = 15, satelite = false) {
    let result = "https://maps.google.com/maps?ie=UTF8&iwd=1&iwloc=B&output=embed";
    if (query) {
        result += `&q=${encodeURIComponent(query)}`;
    } else if (longitude && latitude) {
        result += `&q=${latitude},${longitude}`;
    }
    if (satelite) {
        result += "&t=k";
    }
    result += `&z=${zoom}`;
    return result;
}



/**
 * Returns a random value between from and to
 * @param {Number} from
 * @param {Number} to
 * @returns {Number}
 */
function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

/**
 * Generates a random password with the given length and sets
 * (l = letters, u = uppercase letters, d = digits, s = symbols)
 * @param {Number=} length
 * @param {String=} availableSets
 * @returns {String}
 */
function generatePassword(length = 10, availableSets = "lud") {
    const sets     = [];
    let   all      = "";
    let   password = "";

    if (availableSets.indexOf("l") > -1) {
        sets.push("abcdefghjkmnpqrstuvwxyz");
    }
    if (availableSets.indexOf("u") > -1) {
        sets.push("ABCDEFGHJKMNPQRSTUVWXYZ");
    }
    if (availableSets.indexOf("d") > -1) {
        sets.push("23456789");
    }
    if (availableSets.indexOf("s") > -1) {
        sets.push("!@#$%&*?");
    }

    for (const set of sets) {
        password += set[randomNumber(0, set.length - 1)];
        all      += set;
    }

    for (let i = 0; i < length - sets.length; i += 1) {
        password += all.charAt(randomNumber(0, all.length - 1));
    }

    password = shuffleString(password);
    return password;
}

/**
 * Shuffles the given string
 * @param {String} string
 * @returns {String}
 */
function shuffleString(string) {
    const parts = string.split("");
    for (let i = 1; i < parts.length; i += 1) {
        const random = randomNumber(0, i - 1);
        const temp   = parts[i];

        parts[i]      = parts[random];
        parts[random] = temp;
    }
    return parts.join("");
}

/**
 * Converts the text to Search
 * @param {String} text
 * @returns {String}
 */
function convertToSearch(text) {
    return text.trim().toLowerCase()
        .replaceAll("á", "a")
        .replaceAll("é", "e")
        .replaceAll("í", "i")
        .replaceAll("ó", "o")
        .replaceAll("ú", "u");
}

/**
 * Returns true if the given text has only Emojis
 * @param {String} text
 * @returns {Boolean}
 */
function isEmojiOnly(text) {
    const stringToTest = text.replace(/ /g, "");
    const emojiRegex = /^(?:(?:\p{RI}\p{RI}|\p{Emoji}(?:\p{Emoji_Modifier}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(?:\u{200D}\p{Emoji}(?:\p{Emoji_Modifier}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*)|[\u{1f900}-\u{1f9ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}])+$/u;
    return emojiRegex.test(stringToTest) && Number.isNaN(Number(stringToTest));
}

/**
 * Downloads the given File
 * @param {String} source
 * @param {String} fileName
 * @returns {Promise}
 */
function download(source, fileName) {
    return fetch(source)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([ blob ]));
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "downloaded-file";
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error("Error fetching the file:", error);
        });
}

/**
 * Prints the given Content
 * @param {String} title
 * @param {String} content
 * @returns {Void}
 */
function print(title, content) {
    const printer = window.open("", "PRINT", "height=600,width=1000");
    printer.document.write(`<html><head><title>${title}</title>`);
    printer.document.write("<style>");
    printer.document.write("body {margin:24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;background-color:white;color:rgb(22,25,28);backface-visibility:hidden;overscroll-behavior:none;}");
    printer.document.write("h1 {font-size:2em;}");
    printer.document.write("a {color:hsl(216,98%,44%);} a:hover{text-decoration:none;}");
    printer.document.write("img {max-width:calc(100vw-4*24px-4px);}");
    printer.document.write("table {width:100%;border-spacing:0;font-size:12px;}");
    printer.document.write("tr td {padding:8px 12px;border-bottom:1px solid #ebedf2;border-right:1px solid #ebedf2;}");
    printer.document.write("tr:first-child td {background:#fafbfd;border-top:1px solid #ebedf2;}");
    printer.document.write("tr td:first-child {border-left:1px solid #ebedf2;}");
    printer.document.write("tr:first-child td:first-child {border-top-left-radius:8px;}");
    printer.document.write("tr:first-child td:last-child {border-top-right-radius:8px;}");
    printer.document.write("tr:last-child td:first-child {border-bottom-left-radius:8px;}");
    printer.document.write("tr:last-child td:last-child {border-bottom-right-radius:8px;}");
    printer.document.write("tr td p {margin:0;}");
    printer.document.write("pre {padding:16px;border:1px solid #ebedf2;border-radius:10px;}");
    printer.document.write("</style>");
    printer.document.write("</head><body>");
    printer.document.write(content);
    printer.document.write("</body></html>");
    printer.document.write('<script type="text/javascript">window.onload = function() { window.print(); };</script>');
    printer.document.close();
}




// The public API
export default {
    isMobile,
    isBoolean,
    isString,
    isNumeric,
    isObject,
    isEmpty,
    isActive,
    hasProp,
    count,
    clone,
    round,
    clamp,
    mapValue,
    triggerClick,
    getBounds,
    inBounds,
    inRef,
    scrollToBottom,
    insertText,
    formatText,
    hasSelection,
    unselectAll,
    getCurrentTime,
    scrollIntoView,

    setTimeout,
    setUpdateTimeout,
    clearTimeout,
    setInterval,
    clearInterval,

    createSlug,
    formatNumber,
    formatPercent,
    formatPrice,
    getPageText,
    toYesNo,
    toYesBlank,
    getTextClass,

    restoreItem,
    storeItem,
    concat,
    removePrefix,
    toArray,
    toEntries,
    toMap,
    toSelect,
    stringsToSelect,
    createArrayOf,
    areEqual,
    areObjectsEqual,
    extend,
    merge,
    hasValue,
    getIndex,
    getValue,
    getValues,
    combineValues,

    getChildren,
    getVisibleChildren,
    cloneChildren,

    parseList,
    hasError,
    hasFormError,
    useSelectList,
    useSubSelectList,

    getYouTubeEmbed,
    getVimeoEmbed,
    getGoogleMapEmbed,

    randomNumber,
    generatePassword,
    convertToSearch,
    isEmojiOnly,
    download,
    print,
};
