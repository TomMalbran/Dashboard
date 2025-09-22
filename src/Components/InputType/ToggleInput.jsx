import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import InputContent         from "../Input/InputContent";
import Html                 from "../Common/Html";



// Styles
const Label = Styled.label`
    position: relative;
    display: flex;
    align-items: center;

    --toggle-size: 16px;
    --toggle-spacing: 3px;
`;

const Input = Styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;

    &:checked + span {
        background: var(--input-toggle-checked);
    }
    &:checked + span::after {
        transform: translateX(var(--toggle-size));
    }
    &:disabled + span {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Span = Styled.span`
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
    display: block;
    margin-right: 12px;
    background: var(--input-toggle-bg);
    width: calc(var(--toggle-size) * 2 + var(--toggle-spacing) * 2);
    height: calc(var(--toggle-size) + var(--toggle-spacing) * 2);
    border-radius: var(--toggle-size);
    cursor: pointer;

    &::after {
        content: "";
        position: absolute;
        top: var(--toggle-spacing);
        left: var(--toggle-spacing);
        width: var(--toggle-size);
        height: var(--toggle-size);
        border-radius: 50%;
        background: var(--input-toggle-circle);
        transition: all .2s;
    }
`;



/**
 * The Toggle Input Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function ToggleInput(props) {
    const {
        inputRef, className, isFocused, isDisabled, withBorder,
        name, value, label, onChange, onFocus, onBlur,
    } = props;

    // Handles the Checkbox Change
    const handleChange = (e) => {
        onChange(name, e.target.checked ? 1 : 0);
    };

    // Handles the Click
    const handleClick = (e) => {
        if (withBorder) {
            Utils.triggerClick(inputRef);
            e.preventDefault();
            e.stopPropagation();
        }
    };


    // Do the Render
    return <InputContent
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        onClick={handleClick}
        withBorder={withBorder}
        withClick={withBorder}
        withPadding
    >
        <Label>
            <Input
                ref={inputRef}
                type="checkbox"
                name={name}
                value="1"
                checked={value}
                disabled={isDisabled}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <Span />
            {!!label && <Html variant="span">{NLS.get(label)}</Html>}
        </Label>
    </InputContent>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
ToggleInput.propTypes = {
    inputRef   : PropTypes.any,
    className  : PropTypes.string,
    isFocused  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    withBorder : PropTypes.bool,
    name       : PropTypes.string,
    value      : PropTypes.any,
    label      : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    onFocus    : PropTypes.func.isRequired,
    onBlur     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
ToggleInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
    withBorder : false,
};

export default ToggleInput;
