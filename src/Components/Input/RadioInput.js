import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Components
import InputInput            from "../Input/InputInput";



// Animations
const tick = keyframes`
    from { transform: scale(0); }
    to   { transform: scale(1); }
`;

// Styles
const Container = Styled.div`
    --radio-outer: 20px;
    --radio-inner: 12px;
    margin-top: 2px;
    margin-left: 8px;
`;

const Input = Styled.input`
    flex-shrink: 0;
    width: var(--radio-outer);
    height: var(--radio-outer);
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    opacity: 0;

    &:focus + span {
        border-color: var(--border-color);
        outline: none;
    }
    &:checked + span {
        border-color: var(--primary-color);
    }
    &:checked + span::before {
        content: "";
        display: block;
        position: absolute;
        top: calc(50% - var(--radio-inner) / 2);
        left: calc(50% - var(--radio-inner) / 2);
        width: var(--radio-inner);
        height: var(--radio-inner);
        border-radius: 50%;
        border-color: var(--border-color);
        background-color: var(--primary-color);
        animation: ${tick} 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275);
    }
    &:disabled + span {
        background-color: rgb(245, 245, 245);
        color: rgb(175, 175, 175);
        cursor: not-allowed;
    }
`;

const Label = Styled.label.attrs(({ isCustom }) => ({ isCustom }))`
    display: flex;
    align-items: center;
    margin-top: ${(props) => props.isCustom ? "2px" : "6px"};
`;

const Span = Styled.span`
    flex-shrink: 0;
    position: relative;
    box-sizing: border-box;
    display: block;
    height: var(--radio-outer);
    width: var(--radio-outer);
    margin: 0 8px 0 calc(0px - var(--radio-outer));
    border: 2px solid var(--lighter-color);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
`;
const Text = Styled.span`
    flex-shrink: 0;
    margin-right: 16px;
`;



/**
 * The Radio Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function RadioInput(props) {
    const { className, name, value, tabIndex, options, withCustom, customText, isDisabled, onChange } = props;

    const inputRef  = React.useRef();
    const valString = String(value);
    const isSelect  = !Array.isArray(options);
    const items     = isSelect ? NLS.select(options) : options;
    const valParts  = valString.split("|");
    const radioVal  = valParts.length > 1 ? valParts[0] : valString;
    const customVal = valParts.length > 1 ? valParts[1] : "";
    const customKey = props.customKey || "custom";

    // Handles the Radio Change
    const handleCheck = (e, newValue) => {
        if (withCustom) {
            if (e.target.checked) {
                onChange(name, `${newValue}|${customVal}`);
            } else {
                onChange(name, `|${customVal}`);
            }
        } else {
            onChange(name, e.target.checked ? newValue : "");
        }
    };

    // Handles the Custom Radio Change
    const handleCustom = (e) => {
        handleCheck(e, customKey);
        const node = inputRef.current;
        if (e.target.checked && node) {
            node.focus();
        }
    };

    // Handles the Custom Input Change
    const handleChange = (e) => {
        onChange(name, `${customKey}|${e.target.value}`);
    };


    return <Container className={className}>
        {items.map(({ key, value }) => <Label key={key}>
            <Input
                type="radio"
                name={`${name}-${key}`}
                value={isSelect ? key : value}
                checked={radioVal === String(key)}
                onChange={(e) => handleCheck(e, key)}
                disabled={isDisabled}
                tabIndex={tabIndex}
            />
            <Span />
            {NLS.get(value)}
        </Label>)}
        {withCustom && <Label isCustom>
            <Input
                type="radio"
                name={`${name}-${customKey}`}
                value={customKey}
                checked={radioVal === customKey}
                onChange={handleCustom}
                disabled={isDisabled}
                tabIndex={tabIndex}
            />
            <Span />
            <Text>{NLS.get(customText || "GENERAL_OTHER")}</Text>
            <InputInput
                inputRef={inputRef}
                className="input"
                type="text"
                name={`${name}-${customKey}-value`}
                value={customVal}
                onChange={handleChange}
                isDisabled={isDisabled}
                isSmall
            />
        </Label>}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
RadioInput.propTypes = {
    className  : PropTypes.string,
    name       : PropTypes.string.isRequired,
    value      : PropTypes.any,
    options    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    tabIndex   : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    withCustom : PropTypes.bool,
    customText : PropTypes.string,
    customKey  : PropTypes.string,
    isDisabled : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
RadioInput.defaultProps = {
    className  : "",
    withCustom : false,
    customText : "",
    customKey  : "",
};

export default RadioInput;
