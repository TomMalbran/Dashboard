import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Table Action Component
 * @returns {React.ReactElement}
 */
function TableAction() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableAction.propTypes = {
    action   : PropTypes.object.isRequired,
    message  : PropTypes.string.isRequired,
    route    : PropTypes.string,
    isHidden : PropTypes.func,
};

export default TableAction;
