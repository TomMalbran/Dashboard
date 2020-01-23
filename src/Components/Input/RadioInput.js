import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core
import NLS                   from "../../Core/NLS";



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
    }
`;

const Label = Styled.label`
    display: flex;
    align-items: center;
    margin-top: 6px;
`;

const Span = Styled.span`
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



/**
 * The Radio Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function RadioInput(props) {
    const { className, name, value, tabIndex, options, onChange } = props;

    // Handles the Change
    const handleChange = (e, newValue) => {
        onChange(name, e.target.checked ? newValue : 0);
    };


    return <Container className={className}>
        {options.map(({ key, value : val }) => <Label key={key}>
            <Input
                type="radio"
                name={val}
                value={key}
                checked={String(value) === String(key)}
                onChange={(e) => handleChange(e, key)}
                tabIndex={tabIndex}
            />
            <Span />
            {NLS.get(val)}
        </Label>)}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
RadioInput.propTypes = {
    className : PropTypes.string,
    name      : PropTypes.string.isRequired,
    value     : PropTypes.any,
    options   : PropTypes.array,
    tabIndex  : PropTypes.string,
    onChange  : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
RadioInput.defaultProps = {
    className : "",
};

export default RadioInput;
