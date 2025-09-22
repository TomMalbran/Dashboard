import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Store                from "../../Core/Store";



// Styles
const Span = Styled.span.attrs(({ size, color, cursor }) => ({ size, color, cursor }))`
    ${(props) => props.size && `
        display: inline-block;
        height: ${props.size}px;
        font-size: ${props.size}px;
    `}
    ${(props) => props.cursor && `cursor: ${props.cursor};`}
    ${(props) => props.color && `color: ${props.color};`}

    &::before {
        display: inline-block;
        padding: 0;
        font-family: var(--icon-font, "icomoon");
        font-weight: 400;
        text-align: center;
    }
`;



/**
 * The Icon Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Icon(props) {
    const {
        isHidden, className, style, icon, size, color, cursor,
        tooltip, tooltipVariant, tooltipWidth, tooltipDelay,
        onClick, onMouseDown,
    } = props;

    const elementRef = React.useRef();

    const { showTooltip, hideTooltip } = Store.useAction("core");


    // Handles the Tooltip
    const handleTooltip = () => {
        if (tooltip) {
            showTooltip(elementRef, tooltipVariant, tooltip, tooltipWidth, tooltipDelay);
        }
    };


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Span
        ref={elementRef}
        className={`icon icon-${icon} ${className}`}
        style={style}
        size={size}
        color={color}
        cursor={cursor}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Icon.propTypes = {
    isHidden       : PropTypes.bool,
    className      : PropTypes.string,
    style          : PropTypes.object,
    icon           : PropTypes.string.isRequired,
    size           : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    color          : PropTypes.string,
    cursor         : PropTypes.string,
    tooltip        : PropTypes.string,
    tooltipVariant : PropTypes.string,
    tooltipWidth   : PropTypes.number,
    tooltipDelay   : PropTypes.number,
    onClick        : PropTypes.func,
    onMouseDown    : PropTypes.func,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Icon.defaultProps = {
    isHidden       : false,
    className      : "",
    size           : "",
    cursor         : "",
    tooltip        : "",
    tooltipVariant : "bottom",
    tooltipWidth   : 0,
    tooltipDelay   : 1,
};

export default Icon;
