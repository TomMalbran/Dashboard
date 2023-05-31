import React                from "react";

// Core & Utils
import Store                from "../../Core/Store";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";



// Animations
const open = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

// Styles
const Container = Styled.div.attrs(({ top, left, width, variant, isOpen }) => ({ top, left, width, variant, isOpen }))`
    box-sizing: border-box;
    position: fixed;
    top: ${(props) => `${props.top}px`};
    left: ${(props) => `${props.left}px`};
    min-width: ${(props) => `${props.width}px`};
    opacity: 0;
    padding: 5px 8px;
    font-size: 13px;
    font-weight: 200;
    line-height: 1.5em;
    color: #fff;
    white-space: normal;
    word-wrap: break-word;
    text-align: center;
    border-radius: var(--border-radius);
    background-color: var(--tooltip-color);
    pointer-events: none;
    z-index: var(--z-tooltip);

    ${(props) => props.isOpen && css`animation: ${open} 0.3s 1s ease-out forwards;`}

    ${(props) => (props.variant === "top" || props.variant === "bottom") && `
        transform: translateX(-50%);
    `}
    ${(props) => (props.variant === "left" || props.variant === "right") && `
        transform: translateY(-50%);
    `}

    &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: var(--z-tooltip);

        ${(props) => props.variant === "top" && `
            bottom: -18px;
            left: calc(50% - 6px);
            border-color: var(--tooltip-color) transparent transparent transparent;
        `}

        ${(props) => props.variant === "bottom" && `
            top: -6px;
            left: calc(50% - 6px);
            border-color: transparent transparent var(--tooltip-color) transparent;
        `}

        ${(props) => props.variant === "left" && `
            top: 50%;
            right: -12px;
            border-color: transparent transparent transparent var(--tooltip-color);
        `}

        ${(props) => props.variant === "right" && `
            top: 50%;
            left: -12px;
            border-color: transparent var(--tooltip-color) transparent transparent;
        `}
    }
`;



/**
 * The Tooltip Component
 * @returns {React.ReactElement}
 */
function Tooltip() {
    const { tooltip } = Store.useState("core");
    const { open, targetRef, variant, message } = tooltip;

    const content    = NLS.get(message);
    const hasTooltip = open && !!content;

    if (!hasTooltip) {
        return <React.Fragment />;
    }

    const bounds = Utils.getBounds(targetRef);
    let   top    = bounds.top;
    let   left   = bounds.left;
    let   width  = 0;

    switch (variant) {
    case "top":
        top  -= bounds.height + 8;
        left += bounds.width / 2;
        width = bounds.width;
        break;
    case "bottom":
        top  += bounds.height + 8;
        left += bounds.width / 2;
        width = bounds.width;
        break;
    case "right":
        top  += bounds.height / 2;
        left += bounds.width + 8;
        break;
    default:
    }


    // Do the Render
    return <Container
        className="tooltip"
        top={top}
        left={left}
        width={width}
        variant={variant}
        isOpen
    >
        {content}
    </Container>;
}

export default Tooltip;
