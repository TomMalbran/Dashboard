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
const Children = Styled.div`
    display: flex;
    align-items: center;
    margin-top: -4px;
    margin-right: -6px;
`;

const Text = Styled.p.attrs(({ atMaxLength, hasButtons }) => ({ atMaxLength, hasButtons }))`
    margin: 0;
    margin-right: ${(props) => props.hasButtons ? "8px" : "0"};
    font-size: 12px;
    color: ${(props) => props.atMaxLength ? "var(--error-color)" : "var(--lighter-color)"};
`;



/**
 * The Text Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextInput(props) {
    const {
        inputRef, className, icon, postIcon, isFocused, isDisabled,
        isSmall, withBorder, withLabel,
        id, type, name, value, minValue, maxValue,
        placeholder, autoComplete, spellCheck,
        generateCode, codeLength, codeSets,
        onChange, onInput, onPaste, onClear,
        onFocus, onBlur, onKeyDown, onKeyUp, onSubmit,
        maxLength, children,
    } = props;


    // Returns the Value
    const getValue = (e) => {
        const text = String(e.target.value);
        if (maxLength && text.length > maxLength) {
            return text.substring(0, maxLength);
        }
        return e.target.value;
    };

    // Handles the Change
    const handleChange = (e) => {
        onChange(name, getValue(e));
    };

    // Handles the Input
    const handleInput = (e) => {
        if (onInput) {
            onInput(name, getValue(e));
        }
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
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

    // Handles the Generate Code
    const handleGenerateCode = (e) => {
        onChange(name, Utils.generatePassword(codeLength, codeSets));
        e.preventDefault();
    };


    // Do the Render
    const characters  = String(value || "").length;
    const atMaxLength = characters > maxLength;
    const hasButtons  = Boolean((children && children.length) || generateCode);

    return <InputContent
        inputRef={inputRef}
        className={className}
        icon={icon}
        postIcon={postIcon}
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
            minValue={minValue}
            maxValue={maxValue}
            placeholder={placeholder}
            isDisabled={isDisabled}
            autoComplete={autoComplete}
            spellCheck={spellCheck}
            onChange={handleChange}
            onInput={handleInput}
            onPaste={onPaste}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
        <Children className="inputfield-children">
            {!!maxLength && <Text
                atMaxLength={atMaxLength}
                hasButtons={hasButtons}
            >
                {`${characters}/${maxLength}`}
            </Text>}
            {children}
            {generateCode && <IconLink
                variant="black"
                icon="add"
                onClick={handleGenerateCode}
                isSmall
            />}
        </Children>
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
    postIcon     : PropTypes.string,
    isFocused    : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    isSmall      : PropTypes.bool,
    withBorder   : PropTypes.bool,
    withLabel    : PropTypes.bool,
    id           : PropTypes.string,
    type         : PropTypes.string.isRequired,
    name         : PropTypes.string,
    value        : PropTypes.any,
    minValue     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxValue     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    placeholder  : PropTypes.string,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    generateCode : PropTypes.bool,
    codeSets     : PropTypes.string,
    codeLength   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxLength    : PropTypes.number,
    onChange     : PropTypes.func,
    onInput      : PropTypes.func,
    onPaste      : PropTypes.func,
    onClear      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
    onSubmit     : PropTypes.func,
    children     : PropTypes.any,
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
    maxLength    : 0,
};

export default TextInput;
