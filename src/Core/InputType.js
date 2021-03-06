// Input Types
const CHECKBOX = "checkbox";
const RADIO    = "radio";
const TOGGLE   = "toggle";
const MULTIPLE = "multiple";
const FILE     = "file";
const MEDIA    = "media";
const FIELDS   = "fields";
const NUMBER   = "number";
const COLOR    = "color";
const SELECT   = "select";
const TEXTAREA = "textarea";

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
    canShrink,

    CHECKBOX,
    RADIO,
    TOGGLE,
    MULTIPLE,
    FILE,
    MEDIA,
    FIELDS,
    NUMBER,
    COLOR,
    SELECT,
    TEXTAREA,

    TEXT,
    EMAIL,
    TEL,
    URL,
    PASSWORD,
    DATE,
    TIME,
};
