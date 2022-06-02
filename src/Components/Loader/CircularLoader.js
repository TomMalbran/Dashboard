import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Variants
const Variant = {
    PRIMARY : "primary",
    WHITE   : "white",
};



// Animations
const loader = keyframes`
    0%   { transform: rotate(0deg);   }
    100% { transform: rotate(360deg); }
`;

const loaderDots = keyframes`
    0%, 20% {
        color: transparent;
        text-shadow: 0.25em 0 0 transparent, 0.5em 0 0 transparent;
    }
    40% {
        color: var(--loader-font);
        text-shadow: 0.25em 0 0 transparent, 0.5em 0 0 transparent;
    }
    60% {
        text-shadow: 0.25em 0 0 var(--loader-font), 0.5em 0 0 transparent;
    }
    80%, 100% {
        text-shadow: 0.25em 0 0 var(--loader-font), 0.5em 0 0 var(--loader-font);
    }
`;

// Styles
const Div = Styled.div.attrs(({ variant, withSpacing, top }) => ({ variant, withSpacing, top }))`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    z-index: 200;

    ${(props) => props.variant === Variant.PRIMARY && `
        --loader-border: var(--primary-color, black);
        --loader-font: var(--font-dark, black);
    `}
    ${(props) => props.variant === Variant.WHITE && `
        --loader-border: white;
        --loader-font: white;
    `}

    ${(props) => props.withSpacing ? `
        padding: 32px;
    ` : `
        padding-top: ${props.top}px;
    `}
`;

const Ring = Styled.div`
    flex-grow: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 64px;
    height: 64px;

    & > div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid var(--loader-border);
        border-radius: 50%;
        animation: ${loader} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: var(--loader-border) transparent transparent transparent;
    }
    & > div:nth-child(1) {
        animation-delay: -0.45s;
    }
    & > div:nth-child(2) {
        animation-delay: -0.3s;
    }
    & > div:nth-child(3) {
        animation-delay: -0.15s;
    }
`;

const Text = Styled.div`
    padding-top: 32px;
    color: var(--loader-font);

    &::after {
        content: " .";
        font-size: 1.5em;
        animation: ${loaderDots} 1s steps(5, end) infinite;
    }
`;



/**
 * The Circular Loader Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function CircularLoader(props) {
    const { className, variant, withSpacing, top } = props;

    return <Div
        className={className}
        variant={variant}
        withSpacing={withSpacing}
        top={top}
    >
        <Ring>
            <div />
            <div />
            <div />
            <div />
        </Ring>
        <Text>{NLS.get("GENERAL_LOADING")}</Text>
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
CircularLoader.propTypes = {
    variant     : PropTypes.string,
    className   : PropTypes.string,
    withSpacing : PropTypes.bool,
    top         : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
CircularLoader.defaultProps = {
    variant     : Variant.PRIMARY,
    className   : "",
    withSpacing : false,
    top         : 0,
};

export default CircularLoader;
