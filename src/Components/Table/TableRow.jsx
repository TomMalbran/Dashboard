import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";
import IconLink             from "../Link/IconLink";
import CheckboxInput        from "../InputType/CheckboxInput";



/**
 * The Table Row Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableRow(props) {
    const {
        hasChecks, hasActions, isEditable, isSelected, elemID,
        handleRowClick, handleMenuOpen, columns, checked, setChecked, children,
    } = props;

    // The References
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

    // Handles the Checkbox Click
    const handleCheckboxClick = (e) => {
        e.stopPropagation();
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


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index) => ({
        ...columns[index], isEditable,
    }));
    if (isEditable) {
        items.sort((a, b) => a.props.position - b.props.position);
    }


    // Do the Render
    return <TableRowCnt
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        hasChecks={hasChecks}
        hasActions={hasActions}
        isEditable={isEditable}
        isSelected={isSelected}
        hasHover
    >
        {hasChecks && <td>
            <CheckboxInput
                name="checked"
                isChecked={checked.includes(elemID)}
                onChange={handleChange}
                onClick={handleCheckboxClick}
            />
        </td>}

        {items}

        {hasActions && <td ref={linkRef}>
            <IconLink
                variant="light"
                icon="more"
                onClick={handleMenuClick}
                isSmall
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
    hasChecks      : PropTypes.bool,
    hasActions     : PropTypes.bool,
    isEditable     : PropTypes.bool,
    isSelected     : PropTypes.bool,
    elemID         : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
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
    hasChecks  : false,
    hasActions : false,
    isEditable : false,
    isSelected : false,
};

export default TableRow;
