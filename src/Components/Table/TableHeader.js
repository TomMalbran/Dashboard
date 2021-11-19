import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const TH = Styled.th.attrs((
    { flexGrow, minWidth, maxWidth, align, isSmall, hasSorting, rightSpace }
) => (
    { flexGrow, minWidth, maxWidth, align, isSmall, hasSorting, rightSpace }
))`
    && {
        box-sizing: border-box;
        border: none;
        padding: 6px 0 6px 12px;
        color: var(--title-color);
        font-weight: bold;
        font-size: 12px;
        flex-grow: ${(props) => props.flexGrow};
        min-width: ${(props) => props.minWidth ? `${props.minWidth}px` : "0"};
        max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : "none"};
        text-align: ${(props) => props.align};
        padding-right: ${(props) => props.rightSpace ? "12px" : "0"};

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
        colSpan, grow, minWidth, maxWidth, align, isSmall, rightSpace, children,
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
        minWidth={minWidth}
        maxWidth={maxWidth}
        align={align}
        isSmall={isSmall}
        hasSorting={withSorting}
        rightSpace={rightSpace}
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
    isHidden   : PropTypes.bool,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    fetch      : PropTypes.func,
    hasSorting : PropTypes.bool,
    noSorting  : PropTypes.bool,
    sort       : PropTypes.object,
    field      : PropTypes.string,
    className  : PropTypes.string,
    colSpan    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    grow       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    minWidth   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxWidth   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    align      : PropTypes.string,
    isTitle    : PropTypes.bool,
    isSmall    : PropTypes.bool,
    bigMobile  : PropTypes.bool,
    hideMobile : PropTypes.bool,
    hideCircle : PropTypes.bool,
    rightSpace : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableHeader.defaultProps = {
    isHidden   : false,
    className  : "",
    colSpan    : "1",
    grow       : "1",
    align      : "left",
    noSorting  : false,
    isTitle    : false,
    isSmall    : false,
    bigMobile  : false,
    hideMobile : false,
    hideCircle : false,
    rightSpace : false,
};

export default TableHeader;
