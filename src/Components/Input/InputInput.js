import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import InputType            from "../../Core/InputType";



// Styles
const Input = Styled.input.attrs(({ isSmall }) => ({ isSmall }))`
    box-sizing: border-box;
    appearance: none;
    font-size: 13px;
    width: 100%;
    margin: 0;
    padding: 4px 8px;
    min-height: ${(props) => props.isSmall ? "calc(var(--input-height) - 8px)" : "var(--input-height)"};
    color: var(--black-color);
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
    background-color: white;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: var(--border-color);
        color: var(--secondary-color);
    }
    &:disabled {
        border-color: rgb(205, 205, 205);
        box-shadow: none;
    }
`;



/**
 * The Input Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputInput(props) {
    const { inputRef, className, type, name, value, onChange, isDisabled, isSmall } = props;

    return <Input
        {...props}
        ref={inputRef}
        className={className}
        type={type}
        name={name}
        value={value}
        disabled={isDisabled}
        onChange={onChange}
        isSmall={isSmall}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputInput.propTypes = {
    inputRef   : PropTypes.object,
    className  : PropTypes.string,
    type       : PropTypes.string,
    name       : PropTypes.string.isRequired,
    value      : PropTypes.any,
    onChange   : PropTypes.func.isRequired,
    isDisabled : PropTypes.bool,
    isSmall    : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputInput.defaultProps = {
    className  : "",
    type       : InputType.TEXT,
    isDisabled : false,
    isSmall    : false,
};

export default InputInput;
