import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";

// Core & Utils
import Action               from "../../Core/Action";
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
    const {
        history, elemID, menuID, route, onClick, onAction, cantClick,
        hasIDs, hasActions, handleMenuOpen, children,
    } = props;

    // References
    const linkRef = React.useRef();

    // Handles the Row Click
    const handleRowClick = (e) => {
        if (menuID !== null || Utils.hasSelection() || (cantClick && cantClick(elemID))) {
            return;
        }
        if (onClick) {
            onClick(elemID);
            e.preventDefault();
        } else if (onAction) {
            onClick(Action.get("VIEW"), elemID);
            e.preventDefault();
        } else if (route) {
            history.push(`${route}/${elemID}`);
            e.preventDefault();
        }
    };

    // Handles the Action Click
    const handleActionClick = (e) => {
        const bounds = Utils.getBounds(linkRef);
        handleMenuOpen(elemID, bounds.top, bounds.right, "left");
        e.stopPropagation();
        e.preventDefault();
    };

    // Handles the Context Menu
    const handleContextMenu = (e) => {
        handleMenuOpen(elemID, e.clientY, e.clientX, "right");
        e.preventDefault();
        return false;
    };


    return <TableRowCnt
        onClick={handleRowClick}
        onContextMenu={handleContextMenu}
        hasIDs={hasIDs}
        hasActions={hasActions}
        hasHover
    >
        {children}
        {hasActions && <td ref={linkRef}>
            <IconLink
                variant="light"
                icon="more"
                onClick={handleActionClick}
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
    history        : PropTypes.object.isRequired,
    hasIDs         : PropTypes.bool,
    hasActions     : PropTypes.bool,
    elemID         : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    menuID         : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    route          : PropTypes.string,
    onClick        : PropTypes.func,
    onAction       : PropTypes.func,
    cantClick      : PropTypes.func,
    handleMenuOpen : PropTypes.func,
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

export default withRouter(TableRow);
