import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Circle               from "../Common/Circle";



// Styles
const TD = Styled.td.attrs(({
    flexGrow, minWidth, maxWidth, align, isSmall, isBold, isTitle, isFlex,
    bigMobile, hideMobile, smallSpace, rightSpace, indent,
}) => ({
    flexGrow, minWidth, maxWidth, align, isSmall, isBold, isTitle, isFlex,
    bigMobile, hideMobile, smallSpace, rightSpace, indent,
}))`
    && {
        box-sizing: border-box;
        font-size: 13px;
        flex-grow: ${(props) => props.flexGrow};
        min-width: ${(props) => props.minWidth ? `${props.minWidth}px` : "0"};
        max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : "none"};
        text-align: ${(props) => props.align};
        padding-top: ${(props) => props.smallSpace ? "6px" : "12px"};
        padding-right: ${(props) => props.rightSpace ? "12px" : "0"};
        padding-bottom: ${(props) => props.smallSpace ? "6px" : "12px"};
        padding-left: ${(props) => props.indent ? "24px" : "12px"};

        ${(props) => props.isSmall && `
            flex: 0 1 150px;
            width: 150px;
        `}
        ${(props) => props.isBold && `
            font-weight: bold;
        `}
        ${(props) => props.isTitle && `
            color: var(--title-color);
            font-weight: bold;
        `}
        ${(props) => props.isFlex && `
            display: flex;
            align-items: center;
            gap: 8px;
        `}
    }

    @media (max-width: 700px) {
        && {
            text-align: left;
            padding: 4px;
            border: none;
            ${(props) => props.bigMobile  && "grid-column: 1/-1;"}
            ${(props) => props.hideMobile && "display: none;"}
        }
    }
`;



/**
 * The Table Cell Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableCell(props) {
    const {
        isHidden, className, message, circle, hideCircle,
        colSpan, grow, minWidth, maxWidth, align,
        isSmall, isBold, isTitle, isFlex,
        bigMobile, hideMobile, smallSpace, rightSpace, indent, children,
    } = props;


    if (isHidden) {
        return <React.Fragment />;
    }
    return <TD
        className={className}
        flexGrow={grow}
        minWidth={minWidth}
        maxWidth={maxWidth}
        align={align}
        isSmall={isSmall}
        isBold={isBold}
        isTitle={isTitle}
        isFlex={isFlex}
        bigMobile={bigMobile}
        hideMobile={hideMobile}
        smallSpace={smallSpace}
        rightSpace={rightSpace}
        indent={indent}
        colSpan={colSpan}
    >
        {!!circle && !hideCircle && <Circle variant={circle} />}
        {message !== undefined ? NLS.get(message) : children}
    </TD>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableCell.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    colSpan    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    grow       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    minWidth   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxWidth   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    align      : PropTypes.string,
    isBold     : PropTypes.bool,
    isSmall    : PropTypes.bool,
    isTitle    : PropTypes.bool,
    isFlex     : PropTypes.bool,
    bigMobile  : PropTypes.bool,
    hideMobile : PropTypes.bool,
    circle     : PropTypes.string,
    hideCircle : PropTypes.bool,
    smallSpace : PropTypes.bool,
    rightSpace : PropTypes.bool,
    indent     : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableCell.defaultProps = {
    isHidden   : false,
    className  : "",
    colSpan    : "1",
    grow       : "1",
    align      : "left",
    isBold     : false,
    isSmall    : false,
    isTitle    : false,
    isFlex     : false,
    bigMobile  : false,
    hideMobile : false,
    hideCircle : false,
    smallSpace : false,
    rightSpace : false,
    indent     : false,
};

export default TableCell;
