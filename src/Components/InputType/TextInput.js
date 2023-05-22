import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import KeyCode              from "../../Utils/KeyCode";

// Components
import InputContent         from "../Input/InputContent";
import InputBase            from "../Input/InputBase";



/**
 * The Text Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextInput(props) {
    const {
        inputRef, className, icon, isFocused, isDisabled, isSmall,
        withBorder, withLabel, suggestRef, autoSuggest,
        id, type, name, value, placeholder, autoComplete, spellCheck,
        onChange, onClear, onInput, onFocus, onBlur, onKeyDown, onKeyUp, onSubmit,
    } = props;

    // Handles the Change
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    // Handles the Input
    const handleInput = (e) => {
        if (onInput) {
            onInput(name, e.target.value);
        }
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        if (e.keyCode === KeyCode.DOM_VK_DOWN && autoSuggest) {
            suggestRef.current.selectNext();
            e.preventDefault();
        } else if (e.keyCode === KeyCode.DOM_VK_UP && autoSuggest) {
            suggestRef.current.selectPrev();
            e.preventDefault();
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    // Handles the Key Up
    const handleKeyUp = (e) => {
        if (autoSuggest) {
            suggestRef.current.setValue(e.target.value);
        }
        if (e.keyCode === KeyCode.DOM_VK_RETURN) {
            let handled = false;
            if (autoSuggest) {
                const suggestVal = suggestRef.current.apply();
                if (suggestVal) {
                    handled = true;
                }
            }
            if (onSubmit && !handled) {
                onSubmit();
            }
        }
        if (onKeyUp) {
            onKeyUp(e);
        }
    };


    // Do the Render
    return <InputContent
        inputRef={inputRef}
        className={className}
        icon={icon}
        isFocused={isFocused}
        isDisabled={isDisabled}
        isSmall={isSmall}
        onClear={onClear}
        withBorder={withBorder}
        withLabel={withLabel}
        withPadding
    >
        <InputBase
            inputRef={inputRef}
            id={id}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            isDisabled={isDisabled}
            autoComplete={autoComplete}
            spellCheck={spellCheck}
            onChange={handleChange}
            onInput={handleInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TextInput.propTypes = {
    inputRef     : PropTypes.any,
    className    : PropTypes.string,
    icon         : PropTypes.string,
    isFocused    : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    isSmall      : PropTypes.bool,
    withBorder   : PropTypes.bool,
    withLabel    : PropTypes.bool,
    suggestRef   : PropTypes.object,
    autoSuggest  : PropTypes.bool,
    id           : PropTypes.string,
    type         : PropTypes.string.isRequired,
    name         : PropTypes.string,
    value        : PropTypes.any,
    placeholder  : PropTypes.string,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    onChange     : PropTypes.func,
    onClear      : PropTypes.func,
    onInput      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
    onSubmit     : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TextInput.defaultProps = {
    className    : "",
    isFocused    : false,
    isDisabled   : false,
    isSmall      : false,
    withBorder   : true,
    withLabel    : true,
    placeholder  : "",
    autoComplete : "off",
};

export default TextInput;
