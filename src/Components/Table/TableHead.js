import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";
import CheckboxInput        from "../InputType/CheckboxInput";
import IconLink             from "../Link/IconLink";



// Styles
const THead = Styled.thead.attrs(({ isEditable }) => ({ isEditable }))`
    border: var(--table-border-outer);
    background: var(--table-background);
    border-top-right-radius: var(--table-radius-outer);
    border-top-left-radius: var(--table-radius-outer);
    border-bottom-right-radius: var(--table-radius-inner);
    border-bottom-left-radius: var(--table-radius-inner);
    padding-right: var(--table-header-right);

    ${(props) => props.isEditable && `
        position: sticky;
        top: 0;
        z-index: 2;
    `}

    @media (max-width: 700px) {
        display: none;
    }
`;

const CheckCell = Styled.th`
    padding-top: 0 !important;
    background: var(--table-background);
    border-top-left-radius: var(--table-radius-outer);
    border-bottom-left-radius: var(--table-radius-inner);

    span {
        margin-top: -2px;
    }
`;

const EditCell = Styled.th`
    background: var(--table-background);
    border-top-right-radius: var(--table-radius-outer);
    border-bottom-right-radius: var(--table-radius-inner);
`;



/**
 * The Table Head Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableHead(props) {
    const {
        hasActions, hasSorting, isEditable,
        hasChecks, hasCheckAll, isCheckedAll, setCheckedAll,
        sort, fetch, columns, children,
    } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index, realIndex) => ({
        hasSorting, sort, fetch, ...columns[realIndex],
    }));


    // Do the Render
    return <THead isEditable={isEditable}>
        <TableRowCnt
            hasChecks={hasChecks}
            hasActions={hasActions}
            isEditable={isEditable}
        >
            {hasChecks && hasCheckAll && <CheckCell>
                <CheckboxInput
                    name="checked"
                    isChecked={isCheckedAll}
                    onChange={() => setCheckedAll()}
                />
            </CheckCell>}
            {hasChecks && !hasCheckAll && <th />}

            {items}

            {isEditable && <EditCell>
                <IconLink
                    variant="light"
                    icon="edit"
                    // onClick={handleMenuClick}
                    dontStop
                    isTiny
                />
            </EditCell>}
            {hasActions && !isEditable && <th />}
        </TableRowCnt>
    </THead>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableHead.propTypes = {
    hasActions    : PropTypes.bool,
    hasSorting    : PropTypes.bool,
    hasChecks     : PropTypes.bool,
    hasCheckAll   : PropTypes.bool,
    setCheckedAll : PropTypes.func,
    isCheckedAll  : PropTypes.bool,
    isEditable    : PropTypes.bool,
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
    hasActions   : false,
    hasSorting   : false,
    hasChecks    : false,
    hasCheckAll  : false,
    isCheckedAll : false,
    isEditable   : false,
};

export default TableHead;
