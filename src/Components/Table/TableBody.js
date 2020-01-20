import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const TBody = Styled.tbody`
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: auto;
    width: 100%;
    height: calc(
        100vh - 24px
        - var(--header-height)
        - var(--table-header-height)
        - var(--table-paging-height)
        - var(--table-stats-height)
        - var(--table-tabs-height)
        - var(--table-filter-height)
    );
    border-left: 2px solid var(--light-gray);
    border-right: 2px solid var(--light-gray);
    border-bottom: 2px solid var(--light-gray);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
`;



/**
 * The Table Body Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableBody(props) {
    const { onClick, route, menuID, cantClick, hasIDs, hasActions, handleMenuOpen, children } = props;

    const items = Utils.cloneChildren(children, (child) => ({
        menuID, onClick, route, cantClick,
        hasIDs, hasActions, handleMenuOpen,
    }));

    return <TBody>
        {items}
    </TBody>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableBody.propTypes = {
    onClick        : PropTypes.func,
    cantClick      : PropTypes.func,
    route          : PropTypes.string,
    hasIDs         : PropTypes.bool,
    hasActions     : PropTypes.bool,
    menuID         : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    handleMenuOpen : PropTypes.func,
    children       : PropTypes.node,
};

export default TableBody;
