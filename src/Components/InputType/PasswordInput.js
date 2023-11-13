import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";

// Components
import InputContent         from "../Input/InputContent";
import InputBase            from "../Input/InputBase";
import IconLink             from "../Link/IconLink";



// Styles
const InputIcon = Styled(IconLink)`
    margin-top: -4px;
    margin-right: -6px;
`;



/**
 * The Password Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PasswordInput(props) {
    const {
        inputRef, icon, className, isFocused, isDisabled, isSmall,
        withBorder, withLabel,
        id, type, name, value, placeholder,
        autoComplete, spellCheck, suggestPassword,
        onChange, onClear, onInput, onFocus, onBlur,
        onKeyDown, onKeyUp, onSubmit, children,
    } = props;

    // The Current State
    const [ showPassword, setPassword ] = React.useState(false);

    const inputType = showPassword ? "text" : type;


    // Handles the Change
    const handleChange = (e) => {
        onChange(name, e.target.value);
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
            id={id}
            type={inputType}
            name={name}
            value={value}
            placeholder={placeholder}
            isDisabled={isDisabled}
            autoComplete={autoComplete}
            spellCheck={spellCheck}
            onChange={handleChange}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={handleKeyUp}
        />

        {children}
        {suggestPassword && <InputIcon
            variant="black"
            icon="add"
            onClick={() => onChange(name, Utils.generatePassword())}
            isSmall
        />}
        <InputIcon
            variant="black"
            icon={showPassword ? "hide" : "view"}
            onClick={() => setPassword(!showPassword)}
            isSmall
        />
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
PasswordInput.propTypes = {
    inputRef        : PropTypes.object,
    className       : PropTypes.string,
    icon            : PropTypes.string,
    isFocused       : PropTypes.bool,
    isDisabled      : PropTypes.bool,
    isSmall         : PropTypes.bool,
    withBorder      : PropTypes.bool,
    withLabel       : PropTypes.bool,
    suggestRef      : PropTypes.object,
    autoSuggest     : PropTypes.bool,
    id              : PropTypes.string,
    type            : PropTypes.string.isRequired,
    name            : PropTypes.string,
    value           : PropTypes.any,
    placeholder     : PropTypes.string,
    autoComplete    : PropTypes.string,
    spellCheck      : PropTypes.string,
    suggestPassword : PropTypes.bool,
    onChange        : PropTypes.func,
    onClear         : PropTypes.func,
    onInput         : PropTypes.func,
    onFocus         : PropTypes.func,
    onBlur          : PropTypes.func,
    onKeyDown       : PropTypes.func,
    onKeyUp         : PropTypes.func,
    onSubmit        : PropTypes.func,
    children        : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
PasswordInput.defaultProps = {
    className    : "",
    isFocused    : false,
    isDisabled   : false,
    isSmall      : false,
    withBorder   : true,
    withLabel    : true,
    placeholder  : "",
    autoComplete : "off",
};

export default PasswordInput;
