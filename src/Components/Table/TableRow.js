import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";
import IconLink             from "../Link/IconLink";
import CheckboxInput        from "../Input/CheckboxInput";



/**
 * The Table Row Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableRow(props) {
    const {
        hasIDs, hasChecks, hasActions, elemID, isSelected,
        handleRowClick, handleMenuOpen, columns, checked, setChecked, children,
    } = props;

    // References
    const linkRef = React.useRef();

    // Handles the Row Click
    const handleClick = () => {
        handleRowClick(elemID);
    };

    // Handles the Check
    const handleChange = (name, isChecked) => {
        if (isChecked) {
            setChecked([ ...checked, elemID ]);
        } else {
            setChecked(checked.filter((id) => id !== elemID));
        }
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
        hasChecks={hasChecks}
        hasActions={hasActions}
        isSelected={isSelected}
        hasHover
    >
        {hasChecks && <td>
            <CheckboxInput
                name="checked"
                isChecked={checked.includes(elemID)}
                onChange={handleChange}
            />
        </td>}
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
    hasChecks      : PropTypes.bool,
    hasActions     : PropTypes.bool,
    elemID         : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    isSelected     : PropTypes.bool,
    handleRowClick : PropTypes.func,
    handleMenuOpen : PropTypes.func,
    columns        : PropTypes.array,
    checked        : PropTypes.array,
    setChecked     : PropTypes.func,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableRow.defaultProps = {
    hasIDs     : false,
    hasChecks  : false,
    hasActions : false,
};

export default TableRow;
