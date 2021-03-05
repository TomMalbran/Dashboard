import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const TBody = Styled.tbody.attrs(({ hasPaging, notFixed }) => ({ hasPaging, notFixed }))`
    box-sizing: border-box;
    width: 100%;
    border-left: 2px solid var(--light-gray);
    border-right: 2px solid var(--light-gray);
    border-bottom: 2px solid var(--light-gray);

    ${(props) => !props.notFixed && `
        overflow-y: scroll;
        overflow-x: auto;
        height: calc(
            var(--table-height)
            - var(--table-topbar-height)
            - var(--header-height)
            - var(--table-header-height)
            - var(--table-paging-height)
            - var(--table-stats-height)
            - var(--table-tabs-height)
            - var(--table-filter-height)
        );
    `}

    ${(props) => !props.hasPaging && `
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    `}

    @media (max-width: 700px) {
        border-top: 2px solid var(--light-gray);
    }
`;



/**
 * The Table Body Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableBody(props) {
    const {
        notFixed, hasIDs, hasActions, hasPaging,
        handleRowClick, handleMenuOpen, columns, children,
    } = props;

    const items = Utils.cloneChildren(children, () => ({
        hasIDs, hasActions, handleRowClick, handleMenuOpen, columns,
    }));

    return <TBody
        className={!notFixed ? "table-scrollbars" : ""}
        notFixed={notFixed}
        hasPaging={hasPaging}
    >
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
    hasActions     : PropTypes.bool,
    hasPaging      : PropTypes.bool,
    handleRowClick : PropTypes.func,
    handleMenuOpen : PropTypes.func,
    columns        : PropTypes.array,
    children       : PropTypes.node,
};

export default TableBody;
