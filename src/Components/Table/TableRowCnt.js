import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const TR = Styled.tr.attrs(({ hasHover, hasIDs, hasChecks, hasActions, isSelected }) => ({ hasHover, hasIDs, hasChecks, hasActions, isSelected }))`
    display: flex;
    height: auto;

    td, th {
        flex: 1 0 0;
        border: none;
    }
    td {
        border-bottom: 1px solid var(--table-color);
    }

    .icon-checkbox {
        color: var(--darkest-gray);
    }

    ${(props) => props.hasHover && `
        &:hover td {
            background-color: var(--table-hover);
        }
    `}
    ${(props) => props.isSelected && `
        & td {
            background-color: var(--table-selected);
        }
    `}
    ${(props) => props.hasIDs && `
        th:first-child, td:first-child {
            flex: 0 1 50px;
            width: 50px;
            font-weight: bold;
        }
    `}
    ${(props) => props.hasChecks && `
        th:first-child, td:first-child {
            flex: 0 1 24px;
            width: 24px;
            padding: 8px 0 0 8px;
        }
    `}
    ${(props) => props.hasActions && `
        th:last-child, td:last-child {
            flex: 0 0 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 8px;
            text-align: right;
            white-space: nowrap;
            position: relative;
            overflow: visible;
        }
    `}

    @media (max-width: 700px) {
        display: grid;
        position: relative;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        border-bottom: var(--table-border) solid var(--table-color);
        min-height: 24px;
        padding: 8px;

        &:last-child {
            border-bottom: none;
        }

        td, th {
            border-bottom: none;
        }
        &:hover td {
            background-color: transparent;
        }
        ${(props) => props.hasActions && `td:last-child {
            position: absolute;
            top: 50%;
            right: 0;
            padding: 0;
            margin-top: -16px;
            background-color: white;
        }`}

        ${(props) => props.isSelected && `
            & td {
                background-color: transparent;
            }
        `}
    }

    @media (max-width: 650px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    @media (max-width: 380px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
`;



/**
 * The Table Row Container Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableRowCnt(props) {
    const {
        className, hasHover, hasIDs, hasChecks, hasActions,
        isSelected, onClick, onContextMenu, children,
    } = props;

    return <TR
        className={className}
        hasHover={hasHover}
        hasIDs={hasIDs}
        hasChecks={hasChecks}
        hasActions={hasActions}
        isSelected={isSelected}
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
    hasChecks     : PropTypes.bool,
    hasActions    : PropTypes.bool,
    isSelected    : PropTypes.bool,
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
    hasChecks  : false,
    hasActions : false,
};

export default TableRowCnt;
