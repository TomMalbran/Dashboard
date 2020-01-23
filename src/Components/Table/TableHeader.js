import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const TH = Styled.th.attrs(({ flexGrow, align, isSmall, hasSorting }) => ({ flexGrow, align, isSmall, hasSorting }))`
    & + & {
        border: none;
        padding: 6px 0 6px 12px;
        color: var(--title-color);
        font-weight: bold;
        font-size: 12px;
        flex-grow: ${(props) => props.flexGrow};
        text-align: ${(props) => props.align};

        ${(props) => props.isSmall && `
            flex: 0 1 150px;
            width: 150px;
        `}
        ${(props) => props.hasSorting && `
            cursor: pointer;
        `}
    }
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
        fetch, hasSorting, sort, field, noSorting,
        colSpan, grow, align, isSmall, children,
    } = props;

    const withSorting = hasSorting && !noSorting;

    // Handles the Sorting
    const handleClick = () => {
        if (withSorting) {
            let params = sort;
            if (sort.orderBy === field) {
                params = { ...sort, orderAsc : sort.orderAsc ? 0 : 1 };
            } else {
                params = { ...sort, orderBy : field, orderAsc : 1 };
            }
            fetch(params);
        }
    };


    if (isHidden) {
        return <React.Fragment />;
    }
    return <TH
        className={className}
        flexGrow={grow}
        align={align}
        isSmall={isSmall}
        hasSorting={withSorting}
        colSpan={colSpan}
        onClick={handleClick}
    >
        {message ? NLS.get(message) : children}
        {withSorting && sort.orderBy === field ? <Icon
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
    fetch      : PropTypes.func,
    hasSorting : PropTypes.bool,
    noSorting  : PropTypes.bool,
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
    noSorting : false,
    isSmall   : false,
    isFull    : false,
    isHidden  : false,
};

export default TableHeader;
