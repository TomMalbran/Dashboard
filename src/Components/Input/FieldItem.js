import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import InputType            from "../../Core/InputType";



/**
 * The Field Item Component
 * @returns {React.ReactElement}
 */
function FieldItem() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
FieldItem.propTypes = {
    type         : PropTypes.string,
    name         : PropTypes.string,
    label        : PropTypes.string,
    placeholder  : PropTypes.string,
    value        : PropTypes.any,
    minValue     : PropTypes.number,
    spellCheck   : PropTypes.string,
    isDisabled   : PropTypes.bool,
    fieldButton  : PropTypes.string,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    fullWidth    : PropTypes.bool,
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    withCustom   : PropTypes.bool,
    customFirst  : PropTypes.bool,
    customText   : PropTypes.string,
    customKey    : PropTypes.string,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
FieldItem.defaultProps = {
    type         : InputType.TEXT,
    placeholder  : "",
    isDisabled   : false,
    options      : [],
    extraOptions : [],
    fullWidth    : false,
    withNone     : false,
    noneText     : "",
    withCustom   : false,
    customFirst  : false,
    customText   : "",
    customKey    : "",
};

export default FieldItem;
