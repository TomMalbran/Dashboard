import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const TR = Styled.tr.attrs(({ hasHover, hasIDs, hasActions }) => ({ hasHover, hasIDs, hasActions }))`
    display: flex;
    height: auto;
    
    ${(props) => props.hasHover && `
        &:hover td {
            background-color: var(--lighter-gray);
        }
    `}
    ${(props) => props.hasIDs && `
        th:first-child, td:first-child {
            flex: 0 1 50px;
            width: 50px;
            font-weight: bold;
        }
    `}
    ${(props) => props.hasActions && `
        th:last-child, td:last-child {
            flex: 0 0 32px;
            padding: 4px 8px;
            text-align: right;
            white-space: nowrap;
            position: relative;
            overflow: visible;
        }
    `}

`;



/**
 * The Table Row Container Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableRowCnt(props) {
    const { className, hasHover, hasIDs, hasActions, onClick, onContextMenu, children } = props;
    
    return <TR
        className={className}
        hasHover={hasHover}
        hasIDs={hasIDs}
        hasActions={hasActions}
        onClick={onClick}
        onContextMenu={onContextMenu}
    >
        {children}
    </TR>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TableRowCnt.propTypes = {
    className     : PropTypes.string,
    hasHover      : PropTypes.bool,
    hasIDs        : PropTypes.bool,
    hasActions    : PropTypes.bool,
    onClick       : PropTypes.func,
    onContextMenu : PropTypes.func,
    children      : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TableRowCnt.defaultProps = {
    className  : "",
    hasHover   : false,
    hasIDs     : false,
    hasActions : false,
};

export default TableRowCnt;
