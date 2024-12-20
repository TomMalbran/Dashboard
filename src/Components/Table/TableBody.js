import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const TBody = Styled.tbody.attrs(({ hasFooter, notFixed }) => ({ hasFooter, notFixed }))`
    box-sizing: border-box;
    width: 100%;
    border-left: var(--table-border-outer);
    border-right: var(--table-border-outer);

    ${(props) => props.notFixed ? `
        tr:last-child td {
            border-bottom: none;
        }
    ` : `
        overflow: auto;
        height: calc(
            var(--table-height)
            - var(--table-header-height)
            - var(--table-paging-height)
            - var(--table-stats-height)
            - var(--table-tabs-height)
            - var(--table-alert-height)
            - var(--table-filter-height)
        );

        &&::-webkit-scrollbar {
            width: 14px;
            height: 14px;
            border-left: var(--table-border-outer);
        }
        &&::-webkit-scrollbar-thumb {
            border-radius: 999px;
            border: 2px solid transparent;
            border-left-width: 4px;
            box-shadow: inset 0 0 0 8px var(--border-color-light);
            transition: all 0.2s;
        }
        &&::-webkit-scrollbar-thumb:hover {
            box-shadow: inset 0 0 0 8px var(--dark-gray);
        }
    `}

    ${(props) => !props.hasFooter && `
        border-bottom: var(--table-border-outer);
        border-bottom-left-radius: var(--table-radius-last);
        border-bottom-right-radius: var(--table-radius-last);

        tr:last-child td:first-child {
            border-bottom-left-radius: var(--table-radius-last);
        }
        tr:last-child td:last-child {
            border-bottom-right-radius: var(--table-radius-last);
        }
    `}

    @media (max-width: 700px) {
        border-top: var(--table-border-outer);
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }
`;



/**
 * The Table Body Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableBody(props) {
    const {
        notFixed, hasIDs, hasChecks, hasActions, hasPaging, hasFooter,
        handleRowClick, handleMenuOpen, columns, checked, setChecked, children,
    } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        hasIDs, hasChecks, hasActions,
        handleRowClick, handleMenuOpen,
        columns, checked, setChecked,
    }));


    // Do the Render
    return <TBody notFixed={notFixed} hasFooter={hasPaging || hasFooter}>
        {items}
    </TBody>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableBody.propTypes = {
    notFixed       : PropTypes.bool,
    hasIDs         : PropTypes.bool,
    hasChecks      : PropTypes.bool,
    hasActions     : PropTypes.bool,
    hasPaging      : PropTypes.bool,
    hasFooter      : PropTypes.bool,
    handleRowClick : PropTypes.func,
    handleMenuOpen : PropTypes.func,
    columns        : PropTypes.array,
    checked        : PropTypes.array,
    setChecked     : PropTypes.func,
    children       : PropTypes.node,
};

export default TableBody;
