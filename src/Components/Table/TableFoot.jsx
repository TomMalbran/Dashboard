import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";



// Styles
const TFoot = Styled.tfoot`
    position: sticky;
    bottom: 0;
    z-index: 2;

    background: var(--table-background);
    border-radius: var(--table-border-radius);
`;



/**
 * The Table Foot
 * @param {object} props
 * @returns {React.ReactElement}
 */
function TableFoot(props) {
    const { hasActions, columns, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index) => ({
        ...columns[index],
    }));


    // Do the Render
    return <TFoot>
        <TableRowCnt hasActions={hasActions}>
            {items}
            {hasActions && <th />}
        </TableRowCnt>
    </TFoot>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
TableFoot.propTypes = {
    hasActions : PropTypes.bool,
    columns    : PropTypes.array,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
TableFoot.defaultProps = {
    hasActions : false,
};

export default TableFoot;
