import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Semaphore }        from "../../Core/Variants";
import Store                from "../../Core/Store";



// Styles
const Span = Styled.span.attrs(({ variant }) => ({ variant }))`
    flex-shrink: 0;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-top: -3px;
    margin-right: 8px;
    border: 1px solid var(--border-color-dark);
    border-radius: 50%;
    vertical-align: middle;

    ${(props) => {
        switch (props.variant) {
        case Semaphore.GREEN:
            return "background-color: green;";
        case Semaphore.YELLOW:
            return "background-color: yellow;";
        case Semaphore.RED:
            return "background-color: red;";
        case Semaphore.GRAY:
            return "background-color: gray;";
        case Semaphore.BLUE:
            return "background-color: #0747a6;";
        default:
            return "";
        }
    }}
`;



/**
 * The Circle Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Circle(props) {
    const {
        className, variant,
        tooltip, tooltipVariant, tooltipWidth, tooltipDelay,
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
    return <Span
        ref={elementRef}
        className={`circle ${className}`}
        variant={variant}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Circle.propTypes = {
    className      : PropTypes.string,
    variant        : PropTypes.string.isRequired,
    tooltip        : PropTypes.string,
    tooltipVariant : PropTypes.string,
    tooltipWidth   : PropTypes.number,
    tooltipDelay   : PropTypes.number,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Circle.defaultProps = {
    className : "",
};

export default Circle;
