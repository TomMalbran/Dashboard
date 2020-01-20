import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Table Actions Component
 * @returns {React.ReactElement}
 */
function TableActions() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableActions.propTypes = {
    onClick : PropTypes.func,
    canEdit : PropTypes.bool,
};

export default TableActions;
