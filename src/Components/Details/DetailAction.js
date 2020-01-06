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
    action   : PropTypes.object.isRequired,
    message  : PropTypes.string.isRequired,
    isHidden : PropTypes.func,
};

export default DetailAction;
