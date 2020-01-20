import React                from "react";
import PropTypes            from "prop-types";

// Components
import TableRowCnt          from "../Table/TableRowCnt";



/**
 * The Table Foot
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableFoot(props) {
    const { hasIDs, hasActions, children } = props;
    
    return <tfoot>
        <TableRowCnt hasIDs={hasIDs} hasActions={hasActions}>
            {children}
            {hasActions && <th />}
        </TableRowCnt>
    </tfoot>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableFoot.propTypes = {
    hasIDs     : PropTypes.bool,
    hasActions : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableFoot.defaultProps = {
    hasIDs     : false,
    hasActions : false,
};

export default TableFoot;
