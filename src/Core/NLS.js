// The Languages Data
let   defaultLang  = "";
const stringsData  = {};
const urlsData     = {};
const actionsData  = {};
const sectionsData = {};

// The Current Strings
let language = null;
let strings  = null;
let urls     = null;
let actions  = null;
let sections = null;



/**
 * Initialize a Language
 * @param {String} lang
 * @param {Object} strings
 * @param {Object} urls
 * @param {Object} actions
 * @returns {Void}
 */
function initLang(lang, strings, urls, actions) {
    stringsData[lang]  = strings;
    urlsData[lang]     = urls;
    actionsData[lang]  = actions.ACTIONS;
    sectionsData[lang] = actions.SECTIONS;

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

    strings  = loadLang(language, stringsData);
    urls     = loadLang(language, urlsData);
    actions  = loadLang(language, actionsData);
    sections = loadLang(language, sectionsData);
}

/**
 * Loads the Language Strings
 * @param {String} lang
 * @param {Object} data
 * @returns {Object}
 */
function loadLang(lang, data) {
    const langNoRegion    = lang.toLowerCase().split(/[_-]+/)[0];
    const messages        = data[langNoRegion] || data[lang] || data.es;
    const defaultMessages = data[defaultLang];

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
    const message = strings[id] || id;
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
 * @param {String} id
 * @param {String} value
 * @returns {String}
 */
function formatIf(id, value) {
    if (value) {
        return format(id, value);
    }
    return "";
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
 * Returns the url with a prefix path
 * @param {String}  id
 * @param {String=} path
 * @param {Number=} elemID
 * @returns {String}
 */
function url(id, path = "", elemID = 0) {
    const url    = urls[id] !== undefined ? urls[id] : id;
    const suffix = elemID ? `/${elemID}` : "";
    return `${path}/${url}${suffix}`;
}

/**
 * Returns the url with a prefix path
 * @param {String} id
 * @param {Number} elemID
 * @returns {String}
 */
function href(id, elemID) {
    return url(id, "", elemID);
}



/**
 * Returns the Section with the given ID
 * @param {String} id
 * @returns {String}
 */
function getSection(id) {
    return sections[id] || id;
}

/**
 * Returns the Action with the given ID
 * @param {String} id
 * @returns {String}
 */
function getAction(id) {
    return actions[id] || id;
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
    url,
    href,
    getSection,
    getAction,
};
