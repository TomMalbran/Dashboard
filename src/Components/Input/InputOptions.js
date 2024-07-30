import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.ul.attrs(({ top, left, width, maxHeight }) => ({ top, left, width, maxHeight }))`
    box-sizing: border-box;
    display: block;
    position: fixed;
    top: ${(props) => `${props.top + 2}px`};
    left: ${(props) => `${props.left}px`};
    width: ${(props) => `${props.width}px`};
    max-height: ${(props) => `${props.maxHeight}px`};
    overflow: auto;
    min-width: 200px;
    margin: 0;
    padding: 8px;
    list-style: none;
    background-color: white;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    transform: translateY(2px);
    overflow-x: hidden;
    z-index: var(--z-input, 3);
`;



/**
 * The Input Options Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputOptions(props) {
    const { passedRef, top, left, width, maxHeight, children } = props;


    // Do the Render
    return <Container
        ref={passedRef}
        top={top}
        left={left}
        width={width}
        maxHeight={maxHeight}
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
    maxHeight : PropTypes.number,
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
};

export default InputOptions;
