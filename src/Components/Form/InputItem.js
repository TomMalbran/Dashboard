import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import InputType            from "../../Core/InputType";



/**
 * The Input Item Component
 * @returns {React.ReactElement}
 */
function InputItem() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
InputItem.propTypes = {
    passedRef       : PropTypes.any,
    isHidden        : PropTypes.bool,
    subKey          : PropTypes.string,
    className       : PropTypes.string,
    type            : PropTypes.string,
    name            : PropTypes.string,
    label           : PropTypes.string,
    placeholder     : PropTypes.string,
    icon            : PropTypes.string,
    postIcon        : PropTypes.string,
    value           : PropTypes.any,
    step            : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    minValue        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxValue        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxLength       : PropTypes.number,
    spellCheck      : PropTypes.string,
    isRequired      : PropTypes.bool,
    isDisabled      : PropTypes.bool,
    options         : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    width           : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    withBorder      : PropTypes.bool,
    fullWidth       : PropTypes.bool,
    noneText        : PropTypes.string,
    shrinkLabel     : PropTypes.bool,
    withCustom      : PropTypes.bool,
    customFirst     : PropTypes.bool,
    customText      : PropTypes.string,
    customKey       : PropTypes.string,
    hasClear        : PropTypes.bool,
    onClear         : PropTypes.func,
    onChange        : PropTypes.func,
    onMedia         : PropTypes.func,
    onInput         : PropTypes.func,
    onKeyUp         : PropTypes.func,
    onKeyDown       : PropTypes.func,
    onSuggest       : PropTypes.func,
    onSearch        : PropTypes.func,
    suggestID       : PropTypes.string,
    suggestFetch    : PropTypes.func,
    suggestParams   : PropTypes.object,
    suggestNone     : PropTypes.string,
    suggestWidth    : PropTypes.number,
    keepSuggestions : PropTypes.bool,
    columns         : PropTypes.string,
    hide            : PropTypes.func,
    getType         : PropTypes.func,
    getOptions      : PropTypes.func,
    getValue        : PropTypes.func,
    getDisabled     : PropTypes.func,
    component       : PropTypes.any,
    children        : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
InputItem.defaultProps = {
    isHidden     : false,
    type         : InputType.TEXT,
    placeholder  : "",
    isRequired   : false,
    isDisabled   : false,
    options      : [],
    extraOptions : [],
    fullWidth    : false,
    noneText     : "",
    shrinkLabel  : false,
    withCustom   : false,
    customFirst  : false,
    customText   : "",
    customKey    : "",
};

export default InputItem;
