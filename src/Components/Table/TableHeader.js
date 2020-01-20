import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const TH = Styled.th.attrs(({ flexGrow, align, hasSorting, isSmall }) => ({ flexGrow, align, hasSorting, isSmall }))`
    flex: 1 0 0;
    border: none;
    padding: 6px 0 6px 12px;
    color: var(--title-color);
    font-weight: bold;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    flex-grow: ${(props) => props.flexGrow};
    text-align: ${(props) => props.align};

    ${(props) => props.hasSorting && "cursor: pointer;"}
    ${(props) => props.isSmall && `
        flex: 0 1 150px;
        width: 150px;
    `}

    .icon {
        margin-left: 4px;
    }
`;



/**
 * The Table Header Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableHeader(props) {
    const {
        isHidden, className, message,
        hasSorting, sort, field, handleSort,
        colSpan, grow, align, isSmall, children,
    } = props;

    // Handles the Sorting
    const handleClick = () => {
        if (hasSorting) {
            handleSort(field);
        }
    };


    if (isHidden) {
        return <React.Fragment />;
    }
    return <TH
        className={className}
        flexGrow={grow}
        align={align}
        hasSorting={hasSorting}
        isSmall={isSmall}
        colSpan={colSpan}
        onClick={handleClick}
    >
        {message ? NLS.get(message) : children}
        {hasSorting && sort.orderBy === field ? <Icon
            icon={sort.orderAsc ? "up" : "down"}
        /> : null}
    </TH>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableHeader.propTypes = {
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    handleSort : PropTypes.func,
    hasSorting : PropTypes.bool,
    sort       : PropTypes.object,
    field      : PropTypes.string,
    className  : PropTypes.string,
    colSpan    : PropTypes.string,
    grow       : PropTypes.string,
    align      : PropTypes.string,
    isSmall    : PropTypes.bool,
    isFull     : PropTypes.bool,
    isHidden   : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableHeader.defaultProps = {
    className : "",
    colSpan   : "1",
    grow      : "0",
    align     : "left",
    isFull    : false,
    isHidden  : false,
};

export default TableHeader;
