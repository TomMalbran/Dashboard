import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";
import NLS                   from "Core/NLS";



// Keyframes
const loading = keyframes`
    0%   { width:   0%; }
    25%  { width:  22%; }
    50%  { width:  55%; }
    75%  { width:  83%; }
    100% { width: 100%; }
`;

// Styles
const LoaderContent = Styled.div`
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

    &:after {
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
}`;



/**
 * The Loader Component
 * @param {Object} props
 * @returns {Object}
 */
function Loader(props) {
    const { open } = props;
    
    return <LoaderContent open={open}>
        {NLS.get("GENERAL_LOADING")}
    </LoaderContent>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Loader.propTypes = {
    open : PropTypes.bool.isRequired,
};

export default Loader;
