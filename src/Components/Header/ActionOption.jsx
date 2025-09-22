import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Action Option Component
 * @returns {React.ReactElement}
 */
function ActionOption() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
ActionOption.propTypes = {
    isHidden  : PropTypes.bool,
    action    : PropTypes.string,
    value     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    message   : PropTypes.string,
    icon      : PropTypes.string,
    direction : PropTypes.string,
    onAction  : PropTypes.func,
    onClick   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
ActionOption.defaultProps = {
    isHidden : false,
};

export default ActionOption;
