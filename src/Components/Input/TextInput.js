import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import NLS                  from "../../Core/NLS";
import KeyCode              from "../../Utils/KeyCode";



/**
 * The Text Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextInput(props) {
    const {
        className, id, type, name, value, placeholder, isDisabled,
        tabIndex, autoComplete, spellCheck,
        onChange, onFocus, onBlur, onKeyDown, onKeyUp, onSubmit,
        inputRef, suggestRef,
    } = props;

    // Handles the Key Down
    const handleKeyDown = (e) => {
        const hasSuggestion = !!suggestRef.current;
        
        if (e.keyCode === KeyCode.DOM_VK_DOWN && hasSuggestion) {
            suggestRef.current.selectNext();
            e.preventDefault();
        } else if (e.keyCode === KeyCode.DOM_VK_UP && hasSuggestion) {
            suggestRef.current.selectPrev();
            e.preventDefault();
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    // Handles the Key Up
    const handleKeyUp = (e) => {
        const hasSuggestion = !!suggestRef.current;
        
        if (hasSuggestion) {
            suggestRef.current.setValue(e.target.value);
        }
        if (e.keyCode === KeyCode.DOM_VK_RETURN) {
            let handled = false;
            if (hasSuggestion) {
                const suggestVal = suggestRef.current.apply();
                if (suggestVal) {
                    handled = true;
                }
            }
            if (!!onSubmit && !handled) {
                onSubmit();
            }
        }
        if (onKeyUp) {
            onKeyUp(e);
        }
    };


    return <input
        className={`input input-${type} ${className}`}
        id={id}
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        placeholder={NLS.get(placeholder)}
        disabled={isDisabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={tabIndex}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TextInput.propTypes = {
    className    : PropTypes.string,
    id           : PropTypes.string,
    type         : PropTypes.string.isRequired,
    name         : PropTypes.string,
    value        : PropTypes.any,
    placeholder  : PropTypes.string,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    isDisabled   : PropTypes.bool,
    tabIndex     : PropTypes.string,
    onChange     : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
    onSubmit     : PropTypes.func,
    inputRef     : PropTypes.object,
    suggestRef   : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TextInput.defaultProps = {
    className    : "",
    id           : "",
    autoComplete : "off",
    isDisabled   : false,
};

export default TextInput;
