// Input Types
const CHECKBOX = "checkbox";
const RADIO    = "radio";
const TOGGLE   = "toggle";
const MULTIPLE = "multiple";
const FILE     = "file";
const MEDIA    = "media";
const FIELDS   = "fields";
const NUMBER   = "number";
const SELECT   = "select";
const TEXTAREA = "textarea";

const PASSWORD = "password";
const DATE     = "date";
const TIME     = "time";
const TEXT     = "text";



function withLabel(type) {
    return ![ CHECKBOX, RADIO, TOGGLE ].includes(type);
}

function canShrink(type) {
    return [ MULTIPLE, FILE, MEDIA, CHECKBOX, RADIO, TOGGLE, FIELDS, DATE, TIME, PASSWORD ].includes(type);
}



// The Public API
export default {
    withLabel,
    canShrink,

    CHECKBOX,
    RADIO,
    TOGGLE,
    MULTIPLE,
    FILE,
    MEDIA,
    FIELDS,
    NUMBER,
    SELECT,
    TEXTAREA,

    PASSWORD,
    DATE,
    TIME,
    TEXT,
};
