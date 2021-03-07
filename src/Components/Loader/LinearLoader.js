import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core
import NLS                   from "../../Core/NLS";



// Animations
const loading = keyframes`
    0%   { width:   0%; }
    25%  { width:  22%; }
    50%  { width:  55%; }
    75%  { width:  83%; }
    100% { width: 100%; }
`;

// Styles
const Div = Styled.div.attrs(({ open }) => ({ open }))`
    display: ${(props) => props.open ? "block" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    text-indent: 200%;
    white-space: nowrap;
    overflow: hidden;

    &::after {
        content: "";
        animation-name: ${loading};
        animation-duration: ${(props) => props.open ? "5s" : "0s"};
        animation-fill-mode: both;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        background: black;
        height: 5px;
        left: 0;
        position: fixed;
        top: 0;
        width: 0%;
        z-index: 9999;
        user-select: none;
    }

    @media (max-width: 1000px) {
        &::after {
            background: white;
        }
    }
`;



/**
 * The Linear Loader Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function LinearLoader(props) {
    const { open } = props;

    return <Div open={open}>
        {NLS.get("GENERAL_LOADING")}
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
LinearLoader.propTypes = {
    open : PropTypes.bool.isRequired,
};

export default LinearLoader;
