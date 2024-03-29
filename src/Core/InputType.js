import NLS                  from "../Core/NLS";



// Input Types
const CHECKBOX = "checkbox";
const CHOOSER  = "chooser";
const COLOR    = "color";
const DOUBLE   = "double";
const FIELDS   = "fields";
const FILE     = "file";
const LIST     = "list";
const MEDIA    = "media";
const MULTIPLE = "multiple";
const NUMBER   = "number";
const PASSWORD = "password";
const RADIO    = "radio";
const SELECT   = "select";
const TEXTAREA = "textarea";
const TOGGLE   = "toggle";

const TEXT     = "text";
const EMAIL    = "email";
const TEL      = "tel";
const URL      = "url";
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
    return ![ DOUBLE, MULTIPLE, FILE, MEDIA, CHECKBOX, RADIO, TOGGLE, FIELDS, LIST, COLOR, DATE, TIME ].includes(type);
}

/**
 * Returns true if there is a value
 * @param {*} value
 * @returns {Boolean}
 */
function isValueFilled(value) {
    if (Array.isArray(value)) {
        return Boolean(value.length);
    }
    return Boolean(value);
}

/**
 * Creates Options
 * @param {Object} props
 * @returns {Array}
 */
function createOptions(props) {
    const items      = Array.isArray(props.options)      ? props.options      : NLS.select(props.options);
    const extraItems = Array.isArray(props.extraOptions) ? props.extraOptions : NLS.select(props.extraOptions);
    const result     = [];

    if (props.withNone) {
        result.push({ key : 0, value : NLS.get(props.noneText) });
    }
    for (const item of items) {
        result.push(item);
    }
    for (const extraItem of extraItems) {
        result.push(extraItem);
    }
    return result;
}



// The Public API
export default {
    hasLabel,
    hasClear,
    canShrink,
    isValueFilled,
    createOptions,

    CHECKBOX,
    CHOOSER,
    COLOR,
    DOUBLE,
    FIELDS,
    FILE,
    LIST,
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
