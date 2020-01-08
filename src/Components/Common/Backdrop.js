import React                from "react";
import PropTypes            from "prop-types";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";



// Animations
const open = keyframes`
    from { opacity: 0; }
    50%  { opacity: 1; }
`;
const close = keyframes`
    50%  { opacity: 1; }
    to   { opacity: 0; }
`;

// Styles
const Div = Styled.div.attrs(({ isOpen, isClosing }) => ({ isOpen, isClosing }))`
    display: ${(props) => props.isOpen ? "flex" : "none"};
    animation: ${(props) => props.isClosing ? css`${close} 0.3s ease-out both` : css`${open} 0.3s ease-in both`};
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    background-color: var(--drop-color);
    z-index: var(--z-drawer);
`;



/**
 * The Drawer Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Backdrop(props) {
    const { open, closing, contentRef, onClose, children } = props;

    const handleClick = (e) => {
        if (contentRef.current) {
            const bounds = contentRef.current.getBoundingClientRect();
            if (e.clientX > 0 && e.clientY > 0 && (
                e.clientX < bounds.left || e.clientX > bounds.right ||
                e.clientY < bounds.top  || e.clientY > bounds.bottom
            )) {
                onClose();
            }
        }
    };

    return <Div
        isOpen={open}
        isClosing={closing}
        onMouseDown={handleClick}
    >
        {children}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Backdrop.propTypes = {
    contentRef : PropTypes.object.isRequired,
    open       : PropTypes.bool.isRequired,
    closing    : PropTypes.bool.isRequired,
    onClose    : PropTypes.func.isRequired,
    children   : PropTypes.any,
};

export default Backdrop;
