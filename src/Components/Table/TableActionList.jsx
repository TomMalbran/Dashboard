import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Table Action List Component
 * @returns {React.ReactElement}
 */
function TableActionList() {
    return <React.Fragment />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
TableActionList.propTypes = {
    onClick  : PropTypes.func,
    onAction : PropTypes.func,
    canEdit  : PropTypes.bool,
    children : PropTypes.any,
};

export default TableActionList;
