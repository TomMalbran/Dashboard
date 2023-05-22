import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.div.attrs(({
    width, fullWidth, hasError,
}) => ({
    width, fullWidth, hasError,
}))`
    --input-border: var(--input-border-color);
    position: relative;
    display: block;

    ${(props) => props.fullWidth && `
        width: 100%;
    `}
    ${(props) => props.width && `
        width: ${props.width}px;
    `}

    ${(props) => props.hasError && `
        --input-border: var(--error-color);
        --input-color-label: var(--error-color);
    `}
`;



/**
 * The Input Container Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputContainer(props) {
    const { className, width, fullWidth, hasError, children } = props;

    return <Container
        className={className}
        width={width}
        fullWidth={fullWidth}
        hasError={hasError}
    >
        {children}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputContainer.propTypes = {
    className : PropTypes.string,
    width     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    fullWidth : PropTypes.bool,
    hasError  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputContainer.defaultProps = {
    className : "",
    fullWidth : false,
    hasError  : false,
};

export default InputContainer;
