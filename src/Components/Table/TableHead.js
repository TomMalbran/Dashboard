import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";



// Styles
const THead = Styled.thead.attrs(({ notFixed }) => ({ notFixed }))`
    background: var(--light-gray);
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);

    ${(props) => !props.notFixed && "padding-right: 16px;"}

    @media (max-width: 700px) {
        display: none;
    }
`;



/**
 * The Table Head Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableHead(props) {
    const { notFixed, hasIDs, hasActions, hasSorting, sort, fetch, columns, children } = props;

    const items = Utils.cloneChildren(children, (child) => ({
        hasSorting, sort, fetch, ...columns[child.props.realKey],
    }));

    return <THead notFixed={notFixed}>
        <TableRowCnt hasIDs={hasIDs} hasActions={hasActions}>
            {items}
            {hasActions && <th />}
        </TableRowCnt>
    </THead>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableHead.propTypes = {
    notFixed   : PropTypes.bool,
    hasIDs     : PropTypes.bool,
    hasActions : PropTypes.bool,
    hasSorting : PropTypes.bool,
    fetch      : PropTypes.func,
    sort       : PropTypes.object,
    columns    : PropTypes.array,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableHead.defaultProps = {
    hasIDs     : false,
    hasActions : false,
    hasSorting : false,
};

export default TableHead;
