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
        className, id, name, value, minValue, placeholder, isDisabled, tabIndex,
        onChange, onFocus, onBlur,
    } = props;

    // Handles a Number
    const handleChange = (e) => {
        onChange(name, Number(e.target.value));
    };

    // Handles the KeyInput
    const handleKey = (e) => {
        let val = value;
        if (e.keyCode === KeyCode.DOM_VK_UP || e.keyCode === KeyCode.DOM_VK_DOWN) {
            const mult   = e.metaKey ? 100 : (e.shiftKey ? 10 : 1);
            const amount = e.keyCode === KeyCode.DOM_VK_UP ? 1 : -1;
            val          = Number(val) + amount * mult;
            
            if (isNaN(value) || (minValue !== undefined && val < minValue)) {
                val = minValue;
            }
            onChange(name, val);
            e.preventDefault();
            e.stopPropagation();
        }
    };


    return <input
        type="number"
        className={className}
        id={id}
        name={name}
        value={value}
        min={minValue}
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
    value       : PropTypes.any,
    minValue    : PropTypes.number,
    placeholder : PropTypes.string,
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
    className : "",
    id        : "",
};

export default NumberInput;
