import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";



// Styles
const Input = Styled.input`
    box-sizing: border-box;
    appearance: none;
    font-size: var(--input-font);
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;

    &:focus {
        outline: none;
    }
    &:disabled {
        box-shadow: none;
        color: var(--input-color-disabled);
    }
    &::placeholder {
        color: var(--lighter-color);
    }
    &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
    }
`;



/**
 * The Input Base Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputBase(props) {
    const {
        inputRef, type, className, id, name, value,
        minValue, maxValue, step, placeholder,
        isDisabled, autoComplete, spellCheck,
        onChange, onInput, onFocus, onBlur, onKeyDown, onKeyUp,
    } = props;

    return <Input
        ref={inputRef}
        className={`input input-${type} ${className}`}
        id={id}
        type={type}
        name={name}
        value={value}
        min={minValue}
        max={maxValue}
        step={step}
        placeholder={NLS.get(placeholder)}
        disabled={isDisabled}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        onChange={onChange}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
InputBase.propTypes = {
    inputRef     : PropTypes.object,
    type         : PropTypes.string,
    className    : PropTypes.string,
    id           : PropTypes.string,
    name         : PropTypes.string,
    value        : PropTypes.any,
    minValue     : PropTypes.number,
    maxValue     : PropTypes.number,
    step         : PropTypes.string,
    placeholder  : PropTypes.string,
    isDisabled   : PropTypes.bool,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    onChange     : PropTypes.func,
    onInput      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
InputBase.defaultProps = {
    type        : InputType.TEXT,
    className   : "",
    placeholder : "",
    isDisabled  : false,
};

export default InputBase;
