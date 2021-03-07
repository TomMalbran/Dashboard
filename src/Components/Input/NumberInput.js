import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import NLS                  from "../../Core/NLS";
import KeyCode              from "../../Utils/KeyCode";



/**
 * The Number Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NumberInput(props) {
    const {
        className, id, name, value, minValue, step, placeholder, isDisabled, tabIndex,
        onChange, onFocus, onBlur,
    } = props;

    // Handles a Number
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    // Handles the KeyInput
    const handleKey = (e) => {
        let val = value;
        if (e.keyCode === KeyCode.DOM_VK_UP || e.keyCode === KeyCode.DOM_VK_DOWN) {
            const mult   = e.metaKey ? 100 : (e.shiftKey ? 10 : 1);
            const amount = e.keyCode === KeyCode.DOM_VK_UP ? 1 : -1;
            val          = Number(val) + amount * mult;

            if (isNaN(value) || (minValue !== undefined && minValue !== null && val < minValue)) {
                val = minValue;
            }
            onChange(name, val);
            e.preventDefault();
            e.stopPropagation();
        }
    };


    return <input
        className={`input input-number ${className}`}
        type="number"
        id={id}
        name={name}
        value={value}
        min={minValue}
        step={step}
        placeholder={NLS.get(placeholder)}
        disabled={isDisabled}
        onChange={handleChange}
        onKeyDown={handleKey}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NumberInput.propTypes = {
    className   : PropTypes.string,
    id          : PropTypes.string,
    name        : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value       : PropTypes.any,
    minValue    : PropTypes.number,
    step        : PropTypes.string,
    isDisabled  : PropTypes.bool,
    tabIndex    : PropTypes.string,
    onChange    : PropTypes.func.isRequired,
    onFocus     : PropTypes.func,
    onBlur      : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NumberInput.defaultProps = {
    className   : "",
    placeholder : "",
    step        : "1",
};

export default NumberInput;
