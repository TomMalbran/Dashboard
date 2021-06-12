// The Languages Data
const langsData   = {};
let   defaultLang = "";

// The Current Strings
let language    = null;
let stringData  = {};
let urlData     = {};
let actionData  = {};
let sectionData = {};



/**
 * Initialize a Language
 * @param {String} lang
 * @param {Object} strings
 * @param {Object} urls
 * @param {Object} actions
 * @returns {Void}
 */
function initLang(lang, strings, urls, actions) {
    langsData[lang] = {
        strings, urls,
        actions  : actions.ACTIONS,
        sections : actions.SECTIONS,
    };
    if (!defaultLang) {
        defaultLang = lang;
    }
}

/**
 * Sets the Language
 * @param {String=} lang
 * @returns {Void}
 */
function setLang(lang) {
    language = lang || (navigator.languages && navigator.languages[0]) || navigator.language || defaultLang;

    stringData  = loadLang("strings");
    urlData     = loadLang("urls");
    actionData  = loadLang("actions");
    sectionData = loadLang("sections");
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
 * @param {String}    id
 * @param {...String} args
 * @returns {String}
 */
function format(id, ...args) {
    const str = get(id);
    return (str || "").replace(/\{(\d+)\}/g, (match, num) => {
        return (args[num] !== undefined ? args[num] : match);
    });
}

/**
 * Format a string by replacing placeholder symbols with passed in arguments
 * @param {String}    id
 * @param {String}    value
 * @param {...String} args
 * @returns {String}
 */
function formatIf(id, value, ...args) {
    if (value) {
        return format(id, value, ...args);
    }
    return "";
}

/**
 * Joins the given strings to form a sentence
 * @param {String}   id
 * @param {String[]} list
 * @returns {String}
 */
function formatJoin(id, list) {
    return format(id, join(list));
}

/**
 * Returns a formated string using the correct plural string
 * @param {String}    id
 * @param {...String} args
 * @returns {String}
 */
function pluralize(id, ...args) {
    const count = Number(args[0]);
    return format(id + (count === 1 ? "_SINGULAR" : "_PLURAL"), ...args);
}

/**
 * Returns a formated string using the correct plural string
 * @param {String}   id
 * @param {String[]} list
 * @returns {String}
 */
function pluralizeList(id, list) {
    return format(id + (list.length === 1 ? "_SINGULAR" : "_PLURAL"), join(list));
}

/**
 * Joins the given strings to form a sentence
 * @param {String[]} list
 * @returns {String}
 */
function join(list) {
    let result = list[0];
    if (list.length > 1) {
        const and = " " + get("GENERAL_AND") + " ";
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
 * Returns the Section with the given ID
 * @param {String} id
 * @returns {String}
 */
function getSection(id) {
    return sectionData[id] || id;
}

/**
 * Returns the Action with the given ID
 * @param {String} id
 * @returns {String}
 */
function getAction(id) {
    return actionData[id] || id;
}



// The Public API
export default {
    initLang,
    setLang,

    get,
    getClass,
    entries,
    select,

    format,
    formatIf,
    pluralize,
    pluralizeList,
    join,
    formatJoin,

    url,
    baseUrl,
    fullUrl,

    getSection,
    getAction,
};
