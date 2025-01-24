import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const props = ({
    flexGrow, flexShrink, width, minWidth, maxWidth,
    align, isSmall, hasSorting, rightSpace,
}) => ({
    flexGrow, flexShrink, width, minWidth, maxWidth,
    align, isSmall, hasSorting, rightSpace,
});

const TH = Styled.th.attrs(props)`
    && {
        box-sizing: border-box;
        display: flex;
        border: none;
        padding: 6px 0 6px 12px;
        color: var(--title-color);
        font-weight: bold;
        font-size: 12px;
        flex-grow: ${(props) => props.flexGrow};
        flex-shrink: ${(props) => props.flexShrink};
        min-width: ${(props) => props.minWidth ? `${props.minWidth}px` : "0"};
        max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : "none"};
        padding-right: ${(props) => props.rightSpace ? "12px" : "0"};
        text-align: ${(props) => props.align};
        justify-content: ${(props) => props.align};

        ${(props) => props.isSmall && `
            flex: 0 1 150px;
            width: 150px;
        `}
        ${(props) => props.width && `
            flex: 0 1 ${props.width}px;
            width: ${props.width}px;
            min-width: 0;
            max-width: none;
        `};
        ${(props) => props.hasSorting && `
            cursor: pointer;
        `}
    }

    .icon {
        margin-left: 4px;
    }
`;

const Inner = Styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
        colSpan, grow, shrink, width, minWidth, maxWidth,
        align, isSmall, rightSpace, children,
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


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <TH
        className={className}
        flexGrow={grow}
        flexShrink={shrink}
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        align={align}
        isSmall={isSmall}
        hasSorting={withSorting}
        rightSpace={rightSpace}
        colSpan={colSpan}
        onClick={handleClick}
    >
        <Inner>{message ? NLS.get(message) : children}</Inner>
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
    isHidden    : PropTypes.bool,
    message     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    fetch       : PropTypes.func,
    hasSorting  : PropTypes.bool,
    noSorting   : PropTypes.bool,
    sort        : PropTypes.object,
    field       : PropTypes.string,
    className   : PropTypes.string,
    colSpan     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    grow        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    shrink      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    width       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    minWidth    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxWidth    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    align       : PropTypes.string,
    isSmall     : PropTypes.bool,
    isTitle     : PropTypes.bool,
    isFlex      : PropTypes.bool,
    isMultiline : PropTypes.bool,
    bigMobile   : PropTypes.bool,
    hideMobile  : PropTypes.bool,
    hideCircle  : PropTypes.bool,
    noSpace     : PropTypes.bool,
    smallSpace  : PropTypes.bool,
    rightSpace  : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableHeader.defaultProps = {
    isHidden    : false,
    className   : "",
    colSpan     : "1",
    grow        : "1",
    shrink      : "1",
    align       : "left",
    noSorting   : false,
    isSmall     : false,
    isTitle     : false,
    isFlex      : false,
    isMultiline : false,
    bigMobile   : false,
    hideMobile  : false,
    hideCircle  : false,
    noSpace     : false,
    smallSpace  : false,
    rightSpace  : false,
};

export default TableHeader;
