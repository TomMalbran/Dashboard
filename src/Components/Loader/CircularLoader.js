import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Components
import Html                  from "../Common/Html";

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
        color: var(--loader-font-color);
        text-shadow: 0.25em 0 0 transparent, 0.5em 0 0 transparent;
    }
    60% {
        text-shadow: 0.25em 0 0 var(--loader-font-color), 0.5em 0 0 transparent;
    }
    80%, 100% {
        text-shadow: 0.25em 0 0 var(--loader-font-color), 0.5em 0 0 var(--loader-font-color);
    }
`;

// Styles
const Container = Styled.div.attrs(({ variant, isTiny, isSmall, withSpacing, top }) => ({ variant, isTiny, isSmall, withSpacing, top }))`
    --loader-size: ${(props) => props.isTiny ? "18px" : (props.isSmall ? "24px" : "64px")};
    --loader-border-width: ${(props) => props.isTiny ? "2px" : (props.isSmall ? "3px" : "6px")};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    z-index: 200;

    ${(props) => props.variant === Variant.PRIMARY && `
        --loader-border-color: var(--primary-color, black);
        --loader-font-color: var(--font-dark, black);
    `}
    ${(props) => props.variant === Variant.WHITE && `
        --loader-border-color: white;
        --loader-font-color: white;
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
    width: var(--loader-size);
    height: var(--loader-size);

    & > div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: var(--loader-size);
        height: var(--loader-size);
        border: var(--loader-border-width) solid var(--loader-border-color);
        border-radius: 50%;
        animation: ${loader} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: var(--loader-border-color) transparent transparent transparent;
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

const Text = Styled(Html)`
    padding-top: 32px;
    color: var(--loader-font-color);

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
    const {
        isHidden, className, variant, message,
        isTiny, isSmall, withSpacing, top,
    } = props;


    const showMessage = Boolean(!isSmall && !isTiny && message);


    // Do the render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container
        className={className}
        variant={variant}
        isTiny={isTiny}
        isSmall={isSmall}
        withSpacing={withSpacing}
        top={top}
    >
        <Ring>
            <div />
            <div />
            <div />
            <div />
        </Ring>
        {showMessage && <Text>{NLS.get(message)}</Text>}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
CircularLoader.propTypes = {
    isHidden    : PropTypes.bool,
    className   : PropTypes.string,
    variant     : PropTypes.string,
    message     : PropTypes.string,
    isTiny      : PropTypes.bool,
    isSmall     : PropTypes.bool,
    withSpacing : PropTypes.bool,
    top         : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
CircularLoader.defaultProps = {
    isHidden    : false,
    className   : "",
    variant     : Variant.PRIMARY,
    message     : "GENERAL_LOADING",
    isTiny      : false,
    isSmall     : false,
    withSpacing : false,
    top         : 0,
};

export default CircularLoader;
