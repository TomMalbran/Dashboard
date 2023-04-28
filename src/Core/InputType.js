// Input Types
const CHECKBOX = "checkbox";
const COLOR    = "color";
const FIELDS   = "fields";
const FILE     = "file";
const MEDIA    = "media";
const MULTIPLE = "multiple";
const NUMBER   = "number";
const RADIO    = "radio";
const SELECT   = "select";
const TEXTAREA = "textarea";
const TOGGLE   = "toggle";

const TEXT     = "text";
const EMAIL    = "email";
const TEL      = "tel";
const URL      = "url";
const PASSWORD = "password";
const DATE     = "date";
const TIME     = "time";



/**
 * Returns true if the Input should have a Label
 * @param {String} type
 * @returns {Boolean}
 */
function hasLabel(type) {
    return ![ CHECKBOX, TOGGLE ].includes(type);
}

/**
 * Returns true if the Input should have a Clear
 * @param {String} type
 * @returns {Boolean}
 */
function hasClear(type) {
    return [ FILE, MEDIA ].includes(type);
}

/**
 * Returns true if the Input label can shrink
 * @param {String}  type
 * @param {Boolean} withNone
 * @returns {Boolean}
 */
function canShrink(type, withNone) {
    if (type === SELECT && withNone) {
        return true;
    }
    return ![ MULTIPLE, FILE, MEDIA, CHECKBOX, RADIO, TOGGLE, FIELDS, COLOR, DATE, TIME ].includes(type);
}



// The Public API
export default {
    hasLabel,
    hasClear,
    canShrink,

    CHECKBOX,
    COLOR,
    FIELDS,
    FILE,
    MEDIA,
    MULTIPLE,
    NUMBER,
    RADIO,
    SELECT,
    TEXTAREA,
    TOGGLE,

    TEXT,
    EMAIL,
    TEL,
    URL,
    PASSWORD,
    DATE,
    TIME,
};
