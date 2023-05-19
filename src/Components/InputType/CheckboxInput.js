import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Components
import Icon                  from "../Common/Icon";
import Html                  from "../Common/Html";



// Animations
const tick = keyframes`
    from { transform: scale(0); }
    to   { transform: scale(1); }
`;

// Styles
const Label = Styled.label.attrs(({ isDisabled, withBorder }) => ({ isDisabled, withBorder }))`
    position: relative;
    display: flex;
    align-items: center;

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
    width: 0;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    opacity: 0;

    &:focus + span {
        color: var(--border-color);
        outline: none;
    }
    &:checked + span::before {
        animation: ${tick} 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275);
    }
    &:disabled + span {
        color: rgb(175, 175, 175);
    }
`;

const Span = Styled(Icon)`
    position: relative;
    top: 2px;
    margin: -1px 6px 0 0;
    cursor: pointer;
    font-size: 18px;
`;



/**
 * The Checkbox Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function CheckboxInput(props) {
    const {
        className, id, name, value, label, tabIndex,
        isChecked, isDisabled, withBorder, onChange,
    } = props;

    // Handles the Change
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
            id={id}
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            tabIndex={tabIndex}
        />
        <Span icon={isChecked ? "checkedbox" : "checkbox"} />
        {!!label && <Html variant="span">{NLS.get(label)}</Html>}
    </Label>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
CheckboxInput.propTypes = {
    className  : PropTypes.string,
    id         : PropTypes.string,
    name       : PropTypes.string.isRequired,
    value      : PropTypes.any,
    label      : PropTypes.string,
    tabIndex   : PropTypes.string,
    isChecked  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    withBorder : PropTypes.bool,
    onChange   : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
CheckboxInput.defaultProps = {
    className  : "",
    isChecked  : false,
    isDisabled : false,
    withBorder : false,
};

export default CheckboxInput;
