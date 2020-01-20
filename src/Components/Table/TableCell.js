import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Circle               from "../Common/Circle";



// Styles
const TD = Styled.td.attrs(({ flexGrow, align, isTitle, isSmall }) => ({ flexGrow, align, isTitle, isSmall }))`
    padding: 12px 0 12px 12px;
    border: none;
    font-size: 13px;
    flex-grow: ${(props) => props.flexGrow};
    text-align: ${(props) => props.align};
    border-bottom: 2px solid var(--light-gray);

    ${(props) => props.isTitle && `
        color: var(--title-color);
        font-weight: bold;
    `}
    ${(props) => props.isSmall && `
        flex: 0 1 150px;
        width: 150px;
    `}
`;



/**
 * The Table Cell Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableCell(props) {
    const {
        isHidden, className, message, circle,
        colSpan, grow, align, isSmall, isTitle, children,
    } = props;


    if (isHidden) {
        return <React.Fragment />;
    }
    return <TD
        className={className}
        flexGrow={grow}
        align={align}
        isTitle={isTitle}
        isSmall={isSmall}
        colSpan={colSpan}
    >
        {!!circle && <Circle variant={circle} />}
        {message !== undefined ? NLS.get(message) : children}
    </TD>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableCell.propTypes = {
    className : PropTypes.string,
    message   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    colSpan   : PropTypes.string,
    grow      : PropTypes.string,
    align     : PropTypes.string,
    isTitle   : PropTypes.bool,
    isSmall   : PropTypes.bool,
    isFull    : PropTypes.bool,
    circle    : PropTypes.string,
    isHidden  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TableCell.defaultProps = {
    className : "",
    colSpan   : "1",
    grow      : "1",
    align     : "left",
    isFull    : false,
    isHidden  : false,
};

export default TableCell;
