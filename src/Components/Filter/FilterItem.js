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
    icon          : PropTypes.string,
    step          : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    minValue      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxValue      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    spellCheck    : PropTypes.string,
    isDisabled    : PropTypes.bool,
    options       : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions  : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noneText      : PropTypes.string,
    noneValue     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    fullWidth     : PropTypes.bool,
    withCustom    : PropTypes.bool,
    customFirst   : PropTypes.bool,
    customText    : PropTypes.string,
    customKey     : PropTypes.string,
    suggestID     : PropTypes.string,
    suggestFetch  : PropTypes.func,
    suggestParams : PropTypes.object,
    suggestWidth  : PropTypes.number,
    hasClear      : PropTypes.bool,
    hideClear     : PropTypes.bool,
    shrinkLabel   : PropTypes.bool,
    onChange      : PropTypes.func,
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
    noneText     : "",
    withCustom   : false,
    customFirst  : false,
    customText   : "",
    customKey    : "",
    hasClear     : false,
    hideClear    : false,
    shrinkLabel  : false,
};

export default FilterItem;
