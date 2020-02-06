import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";



/**
 * The Textarea Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextareaInput(props) {
    const {
        className, id, name, value, placeholder, isDisabled,
        tabIndex, onChange, onFocus, onBlur, inputRef,
    } = props;

    // Handles the Input Change
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    // Handles the Textarea autogrow
    const handleInput = () => {
        const node = inputRef.current;
        if (node && node.offsetHeight < node.scrollHeight + 2) {
            node.style.height = `${node.scrollHeight + 2}px`;
        }
    };

    // Resize the Textarea the first time
    React.useEffect(() => {
        handleInput();
    }, []);


    return <textarea
        className={`input input-textarea ${className}`}
        id={id}
        ref={inputRef}
        name={name}
        value={value}
        placeholder={NLS.get(placeholder)}
        disabled={isDisabled}
        onInput={handleInput}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TextareaInput.propTypes = {
    className   : PropTypes.string,
    id          : PropTypes.string,
    name        : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value       : PropTypes.any,
    isDisabled  : PropTypes.bool,
    tabIndex    : PropTypes.string,
    onChange    : PropTypes.func,
    onFocus     : PropTypes.func,
    onBlur      : PropTypes.func,
    inputRef    : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TextareaInput.defaultProps = {
    className : "",
};

export default TextareaInput;
