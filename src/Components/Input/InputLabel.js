import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Label = Styled.p.attrs(
    ({ isRequired, withTransform, withValue, isFocused }) =>
        ({ isRequired, withTransform, withValue, isFocused })
)`
    position: absolute;
    top: 0px;
    left: 8px;
    margin: 0;
    padding: 0 4px;
    font-size: 13px;
    line-height: 1;
    background-color: white;
    color: var(--lighter-color);
    transition: all 0.2s;
    pointer-events: none;
    z-index: 1;

    ${(props) => props.isRequired && `
        &::after {
            content: "*";
            margin-left: 4px;
        }
    `}
    ${(props) => props.withTransform && `
        transform-origin: top left;
        transform: translateY(18px) scale(1.1);
    `}
    ${(props) => props.withValue && `
        transform: translateY(0) scale(1);
    `}
    ${(props) => props.isFocused && `
        color: var(--primary-color);
    `}
`;



/**
 * The Input Label Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputLabel(props) {
    const { className, isRequired, withTransform, withValue, isFocused, message } = props;

    return <Label
        className={className}
        isRequired={isRequired}
        withTransform={withTransform}
        withValue={withValue}
        isFocused={isFocused}
    >
        {NLS.get(message)}
    </Label>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputLabel.propTypes = {
    className     : PropTypes.string,
    isRequired    : PropTypes.bool,
    withTransform : PropTypes.bool,
    withValue     : PropTypes.bool,
    isFocused     : PropTypes.bool,
    message       : PropTypes.string.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputLabel.defaultProps = {
    className     : "",
    isRequired    : false,
    withTransform : false,
    withValue     : false,
    isFocused     : false,
};

export default InputLabel;