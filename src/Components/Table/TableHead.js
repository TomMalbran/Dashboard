import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";



// Styles
const THead = Styled.thead.attrs(({ hasTabs }) => ({ hasTabs }))`
    padding-right: 16px;
    background: var(--light-gray);
    border-top-right-radius: var(--border-radius);
    ${(props) => !props.hasTabs && "border-top-left-radius: var(--border-radius);"}
`;



/**
 * The Table Head Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableHead(props) {
    const { hasIDs, hasActions, hasSorting, hasTabs, sort, fetch, children } = props;

    const items = Utils.cloneChildren(children, () => ({
        hasSorting, sort, fetch,
    }));

    return <THead hasTabs={hasTabs}>
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
    hasIDs     : PropTypes.bool,
    hasActions : PropTypes.bool,
    hasSorting : PropTypes.bool,
    hasTabs    : PropTypes.bool,
    fetch      : PropTypes.func,
    sort       : PropTypes.object,
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
