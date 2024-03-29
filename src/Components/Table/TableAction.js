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
    isHidden : PropTypes.bool,
    action   : PropTypes.string.isRequired,
    message  : PropTypes.string.isRequired,
    icon     : PropTypes.string,
    navigate : PropTypes.bool,
    hide     : PropTypes.func,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableAction.defaultProps = {
    isHidden : false,
    navigate : false,
};

export default TableAction;
