import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import InputType            from "../../Core/InputType";



/**
 * The Filter Item Component
 * @returns {React.ReactElement}
 */
function FilterItem() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
FilterItem.propTypes = {
    isHidden      : PropTypes.bool,
    type          : PropTypes.string,
    name          : PropTypes.string,
    label         : PropTypes.string,
    placeholder   : PropTypes.string,
    minValue      : PropTypes.number,
    spellCheck    : PropTypes.string,
    isDisabled    : PropTypes.bool,
    options       : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions  : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    fullWidth     : PropTypes.bool,
    withNone      : PropTypes.bool,
    noneText      : PropTypes.string,
    withCustom    : PropTypes.bool,
    customFirst   : PropTypes.bool,
    customText    : PropTypes.string,
    customKey     : PropTypes.string,
    suggestID     : PropTypes.string,
    suggestFetch  : PropTypes.func,
    suggestParams : PropTypes.object,
    suggestNone   : PropTypes.string,
    hasClear      : PropTypes.bool,
    shrinkLabel   : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
FilterItem.defaultProps = {
    isHidden     : false,
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
    hasClear     : false,
    shrinkLabel  : false,
};

export default FilterItem;
