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
 * @typedef {Object} propTypes
 */
ActionOption.propTypes = {
    isHidden : PropTypes.bool,
    action   : PropTypes.string.isRequired,
    message  : PropTypes.string,
    icon     : PropTypes.string,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
ActionOption.defaultProps = {
    isHidden : false,
};

export default ActionOption;
