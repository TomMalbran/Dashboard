// The Languages Data
const langsData   = {};
let   defaultLang = "";

// The Current Strings
let language      = null;
let stringData    = {};
let urlData       = {};
let actionData    = {};



/**
 * Initialize a Language
 * @param {String} lang
 * @param {Object} strings
 * @param {Object} urls
 * @param {Object} actions
 * @returns {Void}
 */
function initLang(lang, strings, urls, actions) {
    langsData[lang] = { strings, urls, actions };
    if (!defaultLang) {
        defaultLang = lang;
    }
}

/**
 * Gets the Language
 * @returns {String}
 */
function getLang() {
    return (navigator.languages && navigator.languages[0]) || navigator.language || defaultLang;
}

/**
 * Gets the Language
 * @returns {String}
 */
function getCurrentLang() {
    return language;
}

/**
 * Sets the Language
 * @param {String=} lang
 * @returns {Void}
 */
function setLang(lang) {
    language = lang || getLang();

    stringData = loadLang("strings");
    urlData    = loadLang("urls");
    actionData = loadLang("actions");
}

/**
 * Loads the Language Strings
 * @param {String} key
 * @returns {Object}
 */
function loadLang(key) {
    const langNoRegion    = language.toLowerCase().split(/[_-]+/)[0];
    const data            = langsData[langNoRegion] || langsData[language] || langsData[defaultLang];
    const messages        = data[key];
    const defaultMessages = langsData[defaultLang][key];

    for (const key of Object.keys(defaultMessages)) {
        if (!messages[key]) {
            messages[key] = defaultMessages[key];
        }
    }
    return messages;
}



/**
 * Returns a String from an ID
 * @param {String}           id
 * @param {(Number|String)=} elem
 * @returns {String}
 */
function get(id, elem = null) {
    const message = stringData[id] || id;
    return elem !== null ? message[elem] : message;
}

/**
 * Returns a String from an ID
 * @param {String}          id
 * @param {(Number|String)} elem
 * @returns {String}
 */
function getValue(id, elem) {
    for (const item of stringData[id] || []) {
        if (item.key === String(elem)) {
            return item.value;
        }
    }
    return "";
}

/**
 * Returns a String from an ID with the Class
 * @param {String}          id
 * @param {(Number|String)} elem
 * @param {String}          className
 * @returns {String}
 */
function getClass(id, elem, className) {
    return `${className}-${get(id, elem)}`;
}

/**
 * Returns the Entries from the NLS Object
 * @param {String} id
 * @returns {[String, String][]}
 */
function entries(id) {
    return Object.entries(get(id));
}

/**
 * Returns the Entries from the NLS Object as a Select
 * @param {String} id
 * @returns {Object[]}
 */
function select(id) {
    const data   = entries(id);
    const result = [];
    for (const [ key, value ] of data) {
        result.push({ key, value });
    }
    return result;
}

/**
 * Format a string by replacing placeholder symbols with passed in arguments
 * @param {String}             id
 * @param {...(String|Number)} args
 * @returns {String}
 */
function format(id, ...args) {
    const str = get(id);
    return (str || "").replace(/\{(\d+)\}/g, (match, num) => {
        return (args[num] !== undefined ? String(args[num]) : match);
    });
}

/**
 * Format a string by replacing placeholder symbols with passed in arguments
 * @param {String}             id
 * @param {String}             value
 * @param {...(String|Number)} args
 * @returns {String}
 */
function formatIf(id, value, ...args) {
    if (value) {
        return format(id, value, ...args);
    }
    return "";
}

/**
 * Formats and Joins the given strings to form a sentence
 * @param {String}   id
 * @param {String[]} list
 * @param {Boolean=} useOr
 * @returns {String}
 */
function formatJoin(id, list, useOr) {
    return format(id, join(list, useOr));
}

/**
 * Returns a formatted string using the correct plural string
 * @param {String}             id
 * @param {(Number|String)}    amount
 * @param {...(String|Number)} args
 * @returns {String}
 */
function pluralize(id, amount, ...args) {
    const suffix = Number(amount) === 1 ? "_SINGULAR" : "_PLURAL";
    return format(id + suffix, String(amount), ...args);
}

/**
 * Returns a formatted string using the correct plural string
 * @param {String}   id
 * @param {String[]} list
 * @returns {String}
 */
function pluralizeList(id, list) {
    const suffix = list.length === 1 ? "_SINGULAR" : "_PLURAL";
    return format(id + suffix, join(list));
}

/**
 * Joins the given strings to form a sentence
 * @param {String[]} list
 * @param {Boolean=} useOr
 * @returns {String}
 */
function join(list, useOr) {
    let result = list[0];
    if (list.length > 1) {
        const and = " " + get(useOr ? "GENERAL_OR" : "GENERAL_AND") + " ";
        for (let i = 1; i < list.length; i++) {
            result += (i < list.length - 1 ? ", " : and) + list[i];
        }
    }
    return result;
}



/**
 * Returns the url with the given arguments
 * @param {...(String|Number)} args
 * @returns {String}
 */
function url(...args) {
    const result = [];
    for (const arg of args) {
        const url = urlData[arg] !== undefined ? urlData[arg] : arg;
        if (url) {
            result.push(url);
        }
    }
    return result.join("/");
}

/**
 * Returns the base Url with the given arguments
 * @param {...(String|Number)} args
 * @returns {String}
 */
function baseUrl(...args) {
    const result = url(...args);
    return result[0] !== "/" ? `/${result}` : result;
}

/**
 * Returns the full Url with the given arguments
 * @param {...(String|Number)} args
 * @returns {String}
 */
function fullUrl(...args) {
    return process.env.REACT_APP_URL + url(...args);
}

/**
 * Returns the Key of the given Url
 * @param {String}    currUrl
 * @param {...String} keys
 * @returns {String}
 */
function urlToKey(currUrl, ...keys) {
    for (const key of keys) {
        if (currUrl === url(key)) {
            return key;
        }
    }
    return "";
}



/**
 * Returns the Module name
 * @param {String} module
 * @returns {String}
 */
function getModule(module) {
    if (actionData[module]) {
        return actionData[module].name;
    }
    return module;
}

/**
 * Returns the Action name
 * @param {String} module
 * @param {String} action
 * @returns {String}
 */
function getAction(module, action) {
    if (actionData[module] && actionData[module].actions[action]) {
        return actionData[module].actions[action];
    }
    return module + action;
}



// The Public API
export default {
    initLang,
    getLang,
    getCurrentLang,
    setLang,

    get,
    getValue,
    getClass,
    entries,
    select,

    format,
    formatIf,
    formatJoin,
    pluralize,
    pluralizeList,
    join,

    url,
    baseUrl,
    fullUrl,
    urlToKey,

    getModule,
    getAction,
};
