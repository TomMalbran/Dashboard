import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";
import CheckboxInput        from "../InputType/CheckboxInput";



// Styles
const THead = Styled.thead`
    border: var(--table-border-outer);
    background: var(--table-background);
    border-top-right-radius: var(--table-radius-outer);
    border-top-left-radius: var(--table-radius-outer);
    border-bottom-right-radius: var(--table-radius-inner);
    border-bottom-left-radius: var(--table-radius-inner);
    padding-right: var(--table-header-right);

    @media (max-width: 700px) {
        display: none;
    }
`;

const CheckHead = Styled.th`
    padding-top: 3px !important;
`;



/**
 * The Table Head Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableHead(props) {
    const {
        hasIDs, hasChecks, hasActions, hasSorting,
        hasCheckAll, isCheckedAll, setCheckedAll,
        sort, fetch, columns, children,
    } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index, realIndex) => ({
        hasSorting, sort, fetch, ...columns[realIndex],
    }));


    // Do the Render
    return <THead>
        <TableRowCnt
            hasIDs={hasIDs}
            hasChecks={hasChecks}
            hasActions={hasActions}
        >
            {hasChecks && hasCheckAll && <CheckHead>
                <CheckboxInput
                    name="checked"
                    isChecked={isCheckedAll}
                    onChange={() => setCheckedAll()}
                />
            </CheckHead>}
            {hasChecks && !hasCheckAll && <th />}

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
    hasIDs        : PropTypes.bool,
    hasChecks     : PropTypes.bool,
    hasActions    : PropTypes.bool,
    hasSorting    : PropTypes.bool,
    hasCheckAll   : PropTypes.bool,
    setCheckedAll : PropTypes.func,
    isCheckedAll  : PropTypes.bool,
    fetch         : PropTypes.func,
    sort          : PropTypes.object,
    columns       : PropTypes.array,
    children      : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableHead.defaultProps = {
    hasIDs       : false,
    hasChecks    : false,
    hasActions   : false,
    hasSorting   : false,
    isCheckedAll : false,
};

export default TableHead;
