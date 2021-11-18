import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";
import IconLink             from "../Link/IconLink";



/**
 * The Table Row Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableRow(props) {
    const { hasIDs, hasActions, elemID, handleRowClick, handleMenuOpen, columns, children } = props;

    // References
    const linkRef = React.useRef();

    // Handles the Row Click
    const handleClick = () => {
        handleRowClick(elemID);
    };

    // Handles the Menu Click
    const handleMenuClick = (e) => {
        const bounds = Utils.getBounds(linkRef);
        handleMenuOpen(elemID, bounds.top, bounds.right, "left", bounds.height);
        e.stopPropagation();
        e.preventDefault();
    };

    // Handles the Context Menu
    const handleContextMenu = (e) => {
        handleMenuOpen(elemID, e.clientY, e.clientX, "right", 0);
        e.preventDefault();
        return false;
    };

    const items = Utils.cloneChildren(children, (child, key) => ({ ...columns[key] }));

    return <TableRowCnt
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        hasIDs={hasIDs}
        hasActions={hasActions}
        hasHover
    >
        {items}
        {hasActions && <td ref={linkRef}>
            <IconLink
                variant="light"
                icon="more"
                onClick={handleMenuClick}
                dontStop
            />
        </td>}
    </TableRowCnt>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableRow.propTypes = {
    hasIDs         : PropTypes.bool,
    hasActions     : PropTypes.bool,
    elemID         : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    handleRowClick : PropTypes.func,
    handleMenuOpen : PropTypes.func,
    columns        : PropTypes.array,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableRow.defaultProps = {
    hasIDs     : false,
    hasActions : false,
};

export default TableRow;
