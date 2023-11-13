import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import KeyCode              from "../../Utils/KeyCode";

// Components
import InputContent         from "../Input/InputContent";
import InputBase            from "../Input/InputBase";



/**
 * The Number Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NumberInput(props) {
    const {
        inputRef, className, icon, isFocused, isDisabled, isSmall,
        withBorder, withLabel,
        id, name, value, step, minValue, maxValue, placeholder,
        onChange, onClear, onFocus, onBlur, onKeyDown, onKeyUp, onSubmit,
    } = props;

    // Variables
    const minNumber = minValue === undefined || minValue === null ? Number.MIN_SAFE_INTEGER : Number(minValue);
    const maxNumber = maxValue === undefined || maxValue === null ? Number.MAX_SAFE_INTEGER : Number(maxValue);


    // Handles a Number
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        let val = value;
        if (e.keyCode === KeyCode.DOM_VK_UP || e.keyCode === KeyCode.DOM_VK_DOWN) {
            const mult   = e.metaKey ? 100 : (e.shiftKey ? 10 : 1);
            const amount = e.keyCode === KeyCode.DOM_VK_UP ? 1 : -1;
            val          = Number(val) + amount * mult * Number(step);

            if (isNaN(value) || val < minNumber) {
                val = minNumber;
            } else if (val > maxNumber) {
                val = maxNumber;
            }
            onChange(name, val);
            e.preventDefault();
            e.stopPropagation();
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    // Handles the Key Up
    const handleKeyUp = (e) => {
        if (e.keyCode === KeyCode.DOM_VK_RETURN && onSubmit) {
            onSubmit();
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
            type="number"
            id={id}
            name={name}
            value={value}
            step={step}
            minValue={minValue}
            maxValue={maxValue}
            placeholder={placeholder}
            isDisabled={isDisabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NumberInput.propTypes = {
    inputRef    : PropTypes.any,
    className   : PropTypes.string,
    icon        : PropTypes.string,
    isFocused   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    isSmall     : PropTypes.bool,
    withBorder  : PropTypes.bool,
    withLabel   : PropTypes.bool,
    id          : PropTypes.string,
    name        : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value       : PropTypes.any,
    step        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    minValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange    : PropTypes.func.isRequired,
    onClear     : PropTypes.func,
    onFocus     : PropTypes.func,
    onBlur      : PropTypes.func,
    onKeyDown   : PropTypes.func,
    onKeyUp     : PropTypes.func,
    onSubmit    : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NumberInput.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    isSmall     : false,
    withBorder  : true,
    withLabel   : true,
    placeholder : "",
    step        : "1",
};

export default NumberInput;
