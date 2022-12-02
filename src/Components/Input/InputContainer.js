import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.div.attrs(({ fullWidth, smallMargin, noMargin, hasLabel, labelInside, hasError, isFocused }) =>
    ({ fullWidth, smallMargin, noMargin, hasLabel, labelInside, hasError, isFocused }))`
    position: relative;
    display: block;

    ${(props) => props.fullWidth && `
        width: 100%;
    `}

    margin-bottom: ${(props) => props.noMargin ? "0px" : (props.smallMargin ? "10px" : "20px")};
    ${(props) => !props.noMargin && `
        &:last-child {
            margin-bottom: 0;
        }
    `}

    ${(props) => props.hasLabel && !props.labelInside && `
        padding-top: 6px;
        .input {
            padding-top: 8px !important;
        }
        .input-textarea {
            height: var(--input-height);
            padding-top: 10px !important;
            padding-bottom: 8px !important;
        }
    `}
    ${(props) => props.hasLabel && props.labelInside && `
        .input {
            padding-top: 16px !important;
        }
        .input-textarea {
            height: var(--input-height);
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
    const { className, fullWidth, smallMargin, noMargin, hasLabel, labelInside, hasError, isFocused, children } = props;

    return <Container
        className={className}
        fullWidth={fullWidth}
        smallMargin={smallMargin}
        noMargin={noMargin}
        hasLabel={hasLabel}
        labelInside={labelInside}
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
    className   : PropTypes.string,
    fullWidth   : PropTypes.bool,
    smallMargin : PropTypes.bool,
    noMargin    : PropTypes.bool,
    hasLabel    : PropTypes.bool,
    labelInside : PropTypes.bool,
    hasError    : PropTypes.bool,
    isFocused   : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputContainer.defaultProps = {
    className   : "",
    fullWidth   : false,
    smallMargin : false,
    noMargin    : false,
    hasLabel    : false,
    labelInside : false,
    hasError    : false,
    isFocused   : false,
};

export default InputContainer;
