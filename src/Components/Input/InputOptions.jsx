import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Backdrop = Styled.div`
    display: block;
    position: fixed;
    inset: 0;
    z-index: var(--z-menu);
`;

const Container = Styled.ul.attrs(({ top, left, width, minWidth, maxHeight, opacity }) => ({ top, left, width, minWidth, maxHeight, opacity }))`
    box-sizing: border-box;
    display: block;
    position: fixed;
    top: ${(props) => `${props.top + 2}px`};
    left: ${(props) => `${props.left}px`};
    width: ${(props) => `${props.width}px`};
    opacity: ${(props) => props.opacity};
    min-width: 200px;
    margin: 0;
    padding: 8px;
    list-style: none;
    background-color: var(--white-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    z-index: var(--z-input, 3);
    pointer-events: all;
    overflow: auto;

    ${(props) => props.minWidth && `min-width: ${props.minWidth}px`};
    ${(props) => props.maxHeight && `max-height: ${props.maxHeight}px`};
`;



/**
 * The Input Options Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function InputOptions(props) {
    const {
        passedRef, inputRef, top, left, width, minWidth, maxHeight,
        opacity, onClose, children,
    } = props;


    // Handles the Options Close
    const handleClose = (e) => {
        if (!open || Utils.inRef(e.clientX, e.clientY, passedRef)) {
            return;
        }
        if (onClose) {
            onClose();
        } else if (inputRef && inputRef.current) {
            inputRef.current.blur();
        }
        e.stopPropagation();
        e.preventDefault();
    };


    // Do the Render
    return <Backdrop onMouseDown={handleClose}>
        <Container
            ref={passedRef}
            top={top}
            left={left}
            width={width}
            minWidth={minWidth}
            maxHeight={maxHeight}
            opacity={opacity}
            // @ts-ignore
            tabIndex="-1"
        >
            {children}
        </Container>
    </Backdrop>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
InputOptions.propTypes = {
    passedRef : PropTypes.any,
    inputRef  : PropTypes.any,
    top       : PropTypes.number,
    left      : PropTypes.number,
    width     : PropTypes.number,
    minWidth  : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxHeight : PropTypes.number,
    opacity   : PropTypes.number,
    onClose   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
InputOptions.defaultProps = {
    top       : 0,
    left      : 0,
    width     : 0,
    maxHeight : 0,
    opacity   : 1,
};

export default InputOptions;
