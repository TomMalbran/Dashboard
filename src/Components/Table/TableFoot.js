import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";



// Styles
const TFoot = Styled.tfoot.attrs(({ isEditable }) => ({ isEditable }))`
    border: var(--table-border-outer);
    background: var(--table-background);
    border-top-right-radius: var(--table-radius-inner);
    border-top-left-radius: var(--table-radius-inner);
    border-bottom-right-radius: var(--table-radius-outer);
    border-bottom-left-radius: var(--table-radius-outer);
    padding-right: var(--table-header-right);

    ${(props) => props.isEditable && `
        position: sticky;
        bottom: 0;
        z-index: 2;
    `}
`;



/**
 * The Table Foot
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableFoot(props) {
    const { hasIDs, hasActions, isEditable, columns, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index) => ({
        ...columns[index],
    }));


    // Do the Render
    return <TFoot isEditable={isEditable}>
        <TableRowCnt hasIDs={hasIDs} hasActions={hasActions}>
            {items}
            {hasActions && <th />}
        </TableRowCnt>
    </TFoot>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableFoot.propTypes = {
    hasIDs     : PropTypes.bool,
    hasActions : PropTypes.bool,
    isEditable : PropTypes.bool,
    columns    : PropTypes.array,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableFoot.defaultProps = {
    hasIDs     : false,
    hasActions : false,
    isEditable : false,
};

export default TableFoot;
