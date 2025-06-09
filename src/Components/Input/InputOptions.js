import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.ul.attrs(({ top, left, width, minWidth, maxHeight, opacity }) => ({ top, left, width, minWidth, maxHeight, opacity }))`
    box-sizing: border-box;
    display: block;
    position: fixed;
    top: ${(props) => `${props.top + 2}px`};
    left: ${(props) => `${props.left}px`};
    width: ${(props) => `${props.width}px`};
    opacity: ${(props) => props.opacity};
    overflow: auto;
    min-width: 200px;
    margin: 0;
    padding: 8px;
    list-style: none;
    background-color: var(--white-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    transform: translateY(2px);
    overflow-x: hidden;
    z-index: var(--z-input, 3);

    ${(props) => props.minWidth && `min-width: ${props.minWidth}px`};
    ${(props) => props.maxHeight && `max-height: ${props.maxHeight}px`};
`;



/**
 * The Input Options Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputOptions(props) {
    const { passedRef, top, left, width, minWidth, maxHeight, opacity, children } = props;


    // Do the Render
    return <Container
        ref={passedRef}
        top={top}
        left={left}
        width={width}
        minWidth={minWidth}
        maxHeight={maxHeight}
        opacity={opacity}
    >
        {children}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputOptions.propTypes = {
    passedRef : PropTypes.any,
    top       : PropTypes.number,
    left      : PropTypes.number,
    width     : PropTypes.number,
    minWidth  : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxHeight : PropTypes.number,
    opacity   : PropTypes.number,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputOptions.defaultProps = {
    top       : 0,
    left      : 0,
    width     : 0,
    maxHeight : 0,
    opacity   : 1,
};

export default InputOptions;
