import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Responsive           from "../../Core/Responsive";
import Utils                from "../../Utils/Utils";

// Components
import TableRowCnt          from "../Table/TableRowCnt";
import CheckboxInput        from "../InputType/CheckboxInput";
import IconLink             from "../Link/IconLink";



// Styles
const THead = Styled.thead.attrs(({ isEditable }) => ({ isEditable }))`
    box-sizing: border-box;
    height: var(--table-header-height);
    border: var(--table-border-outer);
    background: var(--table-background);
    border-top-right-radius: var(--table-radius-outer);
    border-top-left-radius: var(--table-radius-outer);
    border-bottom-right-radius: var(--table-radius-inner);
    border-bottom-left-radius: var(--table-radius-inner);
    padding-right: var(--table-header-right);

    ${(props) => props.isEditable ? `
        position: sticky;
        top: 0;
        z-index: 2;
    ` : `
        @media (max-width: ${Responsive.WIDTH_FOR_MOBILE}px) {
            display: none;
        }
    `}
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
        hasChecks, hasCheckAll, isCheckedAll, handleCheckAll,
        hasActions, isEditable, setShowEdit, handleColWidth,
        hasSorting, sort, fetch, columns, children,
    } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index, realIndex) => ({
        hasSorting, sort, fetch, isEditable, handleColWidth, ...columns[realIndex],
    }));
    if (isEditable) {
        items.sort((a, b) => a.props.position - b.props.position);
    }


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
                    onChange={() => handleCheckAll()}
                />
            </CheckCell>}
            {hasChecks && !hasCheckAll && <th />}

            {items}

            {isEditable && <EditCell>
                <IconLink
                    variant="light"
                    icon="column"
                    onClick={() => setShowEdit(true)}
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
    hasChecks      : PropTypes.bool,
    hasCheckAll    : PropTypes.bool,
    isCheckedAll   : PropTypes.bool,
    handleCheckAll : PropTypes.func,
    hasActions     : PropTypes.bool,
    isEditable     : PropTypes.bool,
    setShowEdit    : PropTypes.func,
    handleColWidth : PropTypes.func,
    hasSorting     : PropTypes.bool,
    sort           : PropTypes.object,
    fetch          : PropTypes.func,
    columns        : PropTypes.array,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableHead.defaultProps = {
    hasChecks    : false,
    hasCheckAll  : false,
    isCheckedAll : false,
    hasActions   : false,
    isEditable   : false,
    hasSorting   : false,
};

export default TableHead;
