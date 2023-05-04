import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.div.attrs(({
    fullWidth, hasLabel, hasError, isFocused,
}) => ({
    fullWidth, hasLabel, hasError, isFocused,
}))`
    position: relative;
    display: block;

    ${(props) => props.fullWidth && `
        width: 100%;
    `}

    ${(props) => props.hasLabel && `
        .input {
            padding-top: 16px !important;
        }
        .input-textarea {
            padding-top: 18px !important;
            padding-bottom: 8px !important;
        }
    `}

    ${(props) => props.hasError && `
        .inputfield-input.inputfield-input,
        .inputfield-cnt > .icon {
            border-color: var(--error-color);
        }
        .inputfield-label.inputfield-label {
            color: var(--error-color);
        }
    `}
    ${(props) => props.isFocused && `
        .inputfield-input {
            border-color: var(--border-color) !important;
        }
        .inputfield-icon {
            border-color: var(--border-color) !important;
        }
        .inputfield-cnt {
            box-shadow: 0 0 0 1px var(--border-color);
        }
        .icon {
            box-shadow: 0 0 0 1px var(--border-color);
        }
    `}
`;



/**
 * The Input Container Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputContainer(props) {
    const { className, fullWidth, hasLabel, hasError, isFocused, children } = props;

    return <Container
        className={className}
        fullWidth={fullWidth}
        hasLabel={hasLabel}
        hasError={hasError}
        isFocused={isFocused}
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
    fullWidth : PropTypes.bool,
    hasLabel  : PropTypes.bool,
    hasError  : PropTypes.bool,
    isFocused : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputContainer.defaultProps = {
    className : "",
    fullWidth : false,
    hasLabel  : false,
    hasError  : false,
    isFocused : false,
};

export default InputContainer;
