import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";



// Styles
const TFoot = Styled.tfoot.attrs(({ notFixed }) => ({ notFixed }))`
    border: 1px solid var(--table-color);
    background: var(--table-background, var(--table-color));
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);

    ${(props) => !props.notFixed && "padding-right: 16px;"}
`;



/**
 * The Table Foot
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableFoot(props) {
    const { notFixed, hasIDs, hasActions, columns, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index) => ({
        ...columns[index],
    }));


    // Do the Render
    return <TFoot notFixed={notFixed}>
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
    notFixed   : PropTypes.bool,
    hasIDs     : PropTypes.bool,
    hasActions : PropTypes.bool,
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
};

export default TableFoot;
