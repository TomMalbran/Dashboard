import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Circle               from "../Common/Circle";



// Styles
const TD = Styled.td.attrs(({ flexGrow, maxWidth, align, isSmall, isTitle, bigMobile, hideMobile }) => ({ flexGrow, maxWidth, align, isSmall, isTitle, bigMobile, hideMobile }))`
    && {
        box-sizing: border-box;
        padding: 12px 0 12px 12px;
        font-size: 13px;
        flex-grow: ${(props) => props.flexGrow};
        max-width: ${(props) => props.maxWidth ? `${props.maxWidth}px` : "none"};
        text-align: ${(props) => props.align};
    
        ${(props) => props.isSmall && `
            flex: 0 1 150px;
            width: 150px;
        `}
        ${(props) => props.isTitle && `
            color: var(--title-color);
            font-weight: bold;
        `}
        
        @media (max-width: 700px) {
            && {
                text-align: left;
                padding: 4px;
                border: none;
                ${(props) => props.bigMobile  && "grid-column: 1/-1;"}
                ${(props) => props.hideMobile && "display: none;"}
            }
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
        colSpan, grow, maxWidth, align, isSmall, isTitle,
        bigMobile, hideMobile, children,
    } = props;


    if (isHidden) {
        return <React.Fragment />;
    }
    return <TD
        className={className}
        flexGrow={grow}
        maxWidth={maxWidth}
        align={align}
        isSmall={isSmall}
        isTitle={isTitle}
        bigMobile={bigMobile}
        hideMobile={hideMobile}
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
    className  : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    colSpan    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    grow       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxWidth   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    align      : PropTypes.string,
    isTitle    : PropTypes.bool,
    isSmall    : PropTypes.bool,
    bigMobile  : PropTypes.bool,
    hideMobile : PropTypes.bool,
    circle     : PropTypes.string,
    hideCircle : PropTypes.bool,
    isHidden   : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableCell.defaultProps = {
    className  : "",
    colSpan    : "1",
    grow       : "1",
    align      : "left",
    isTitle    : false,
    isSmall    : false,
    bigMobile  : false,
    hideMobile : false,
    hideCircle : false,
    isHidden   : false,
};

export default TableCell;
