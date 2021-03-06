import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Detail Action Component
 * @returns {React.ReactElement}
 */
function DetailAction() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DetailAction.propTypes = {
    isHidden : PropTypes.bool,
    action   : PropTypes.string.isRequired,
    icon     : PropTypes.string,
    message  : PropTypes.string,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
DetailAction.defaultProps = {
    isHidden : false,
};

export default DetailAction;
