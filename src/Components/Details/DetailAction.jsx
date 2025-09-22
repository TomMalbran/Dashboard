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
 * @type {object} propTypes
 */
DetailAction.propTypes = {
    isHidden : PropTypes.bool,
    action   : PropTypes.string.isRequired,
    icon     : PropTypes.string,
    message  : PropTypes.string,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
DetailAction.defaultProps = {
    isHidden : false,
};

export default DetailAction;
