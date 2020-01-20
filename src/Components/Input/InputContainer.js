import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.div.attrs(
    ({ fullWidth, noMargin, hasLabel, hasError, isFocused }) =>
        ({ fullWidth, noMargin, hasLabel, hasError, isFocused })
)`
    position: relative;
    display: block;

    ${(props) => props.fullWidth && "width: 100%;"}
    ${(props) => !props.noMargin && `
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    `}
    
    ${(props) => props.hasLabel && `
        padding-top: 6px;
        .textfield-input.textfield-input {
            padding-top: 8px;
            min-height: var(--input-height);
            width: 100%;
        }
        textarea {
            min-height: var(--input-height);
            padding-top: 10px;
            padding-bottom: 8px;
        }
    `}
    ${(props) => props.hasError && `
        .textfield-input, textarea,
        .textfield-cnt > .icon {
            border-color: var(--error-color);
        }
    `}
    ${(props) => props.isFocused && `
        .textfield-input {
            border-color: var(--border-color);
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
    const { className, fullWidth, noMargin, hasLabel, hasError, isFocused, children } = props;

    return <Container
        className={className}
        fullWidth={fullWidth}
        noMargin={noMargin}
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
    noMargin  : PropTypes.bool,
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
    noMargin  : false,
    hasLabel  : false,
    hasError  : false,
    isFocused : false,
};

export default InputContainer;
