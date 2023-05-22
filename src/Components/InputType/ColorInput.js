import React                from "react";
import PropTypes            from "prop-types";

// Components
import InputContent         from "../Input/InputContent";
import InputBase            from "../Input/InputBase";



/**
 * The Color Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ColorInput(props) {
    const {
        inputRef, className, icon, isFocused, isDisabled, isSmall,
        withBorder, withLabel,
        id, name, value,
        onChange, onClear, onFocus, onBlur,
    } = props;

    // Handles the Input Change
    const handleChange = (e) => {
        onChange(name, e.target.value);
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
            type="color"
            id={id}
            name={name}
            value={value || "#FFFFFF"}
            isDisabled={isDisabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ColorInput.propTypes = {
    inputRef   : PropTypes.any,
    className  : PropTypes.string,
    icon       : PropTypes.string,
    isFocused  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    isSmall    : PropTypes.bool,
    withBorder : PropTypes.bool,
    withLabel  : PropTypes.bool,
    id         : PropTypes.string,
    name       : PropTypes.string,
    value      : PropTypes.any,
    onChange   : PropTypes.func.isRequired,
    onClear    : PropTypes.func,
    onFocus    : PropTypes.func.isRequired,
    onBlur     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ColorInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
    isSmall    : false,
    withBorder : true,
    withLabel  : true,
};

export default ColorInput;
