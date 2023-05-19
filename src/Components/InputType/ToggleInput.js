import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Html                  from "../Common/Html";



// Styles
const Label = Styled.label.attrs(({ isDisabled, withBorder }) => ({ isDisabled, withBorder }))`
    position: relative;
    display: flex;
    align-items: center;

    --toggle-size: 14px;
    --toggle-spacing: 4px;

    ${(props) => props.withBorder && `
        box-sizing: border-box;
        width: 100%;
        height: var(--input-height);
        padding: var(--input-padding);
        border: var(--input-border);
        border-radius: var(--border-radius);
    `}

    ${(props) => props.isDisabled && `
        color: rgb(120, 120, 120);
    `}
    ${(props) => props.withBorder && props.isDisabled && `
        border-color: rgb(205, 205, 205);
    `}
    ${(props) => props.withBorder && !props.isDisabled && `
        &:hover {
            border-color: var(--border-color);
        }
    `}
`;

const Input = Styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;

    &:checked + span::after {
        transform: translateX(var(--toggle-size));
        background-color: #52cf71;
    }
    &:disabled + span {
        background-color: rgb(225, 225, 225);
    }
`;

const Span = Styled.span`
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
    display: block;
    margin-right: 12px;
    background: var(--primary-color);
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
        background: #ccc;
        transition: all .2s;
    }
`;



/**
 * The Toggle Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ToggleInput(props) {
    const {
        className, name, value, label, tabIndex,
        isDisabled, withBorder, onChange,
    } = props;

    // Handles the Checkbox Change
    const handleChange = (e) => {
        onChange(name, e.target.checked ? 1 : 0);
    };


    return <Label
        className={className}
        isDisabled={isDisabled}
        withBorder={withBorder}
    >
        <Input
            type="checkbox"
            name={name}
            value="1"
            checked={value}
            onChange={handleChange}
            tabIndex={tabIndex}
            disabled={isDisabled}
        />
        <Span />
        {!!label && <Html variant="span">{NLS.get(label)}</Html>}
    </Label>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ToggleInput.propTypes = {
    className  : PropTypes.string,
    name       : PropTypes.string,
    value      : PropTypes.any,
    label      : PropTypes.string,
    tabIndex   : PropTypes.string,
    isDisabled : PropTypes.bool,
    withBorder : PropTypes.bool,
    onChange   : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ToggleInput.defaultProps = {
    className  : "",
    isDisabled : false,
    withBorder : false,
};

export default ToggleInput;
