import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.div.attrs(({ toRight, fullWidth }) => ({ toRight, fullWidth }))`
    --my-tooltip-color: var(--tooltip-color, var(--primary-color));

    position: absolute;
    top: 50%;
    visibility: hidden;
    box-sizing: border-box;
    padding: 5px 8px;
    font-size: 13px;
    font-weight: 200;
    line-height: 1.5em;
    color: #fff;
    white-space: normal;
    word-wrap: break-word;
    border-radius: var(--border-radius);
    background-color: var(--my-tooltip-color);
    transform: translateY(-50%) scale(.8);
    transition: transform .2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    pointer-events: none;
    z-index: var(--z-tooltip);

    ${(props) => props.fullWidth && "min-width: 100%;"}
    ${(props) => props.toRight ? `
        right: calc(100% + 8px);
    ` : `
        left: calc(100% + 8px);
    `}

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        opacity: 0;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: var(--z-tooltip);

        ${(props) => props.toRight ? `
            right: -12px;
            border-color: transparent transparent transparent var(--my-tooltip-color);
        ` : `
            left: -12px;
            border-color: transparent var(--my-tooltip-color) transparent transparent;
        `}
    }
`;



/**
 * The Tooltip Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Tooltip(props) {
    const { isHidden, message, toRight, fullWidth } = props;

    const content    = NLS.get(message);
    const hasTooltip = !isHidden && !!content;

    if (!hasTooltip) {
        return <React.Fragment />;
    }
    return <Container
        className="tooltip"
        toRight={toRight}
        fullWidth={fullWidth}
    >
        {content}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Tooltip.propTypes = {
    isHidden  : PropTypes.bool,
    message   : PropTypes.string,
    toRight   : PropTypes.bool,
    fullWidth : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Tooltip.defaultProps = {
    isHidden  : false,
    toRight   : false,
    fullWidth : false,
};

export default Tooltip;
