import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Components
import Icon                  from "../Common/Icon";



// Animations
const tick = keyframes`
    from { transform: scale(0); }
    to   { transform: scale(1); }
`;

// Styles
const Input = Styled.input`
    width: 12px;
    height: 12px;
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
    margin: 1px 6px 0 -12px;
    cursor: pointer;
    font-size: 18px;
`;



/**
 * The Checkbox Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function CheckboxInput(props) {
    const { className, id, name, value, label, tabIndex, isChecked, onChange } = props;

    // Handles the Change
    const handleChange = (e) => {
        onChange(name, e.target.checked ? 1 : 0);
    };


    return <label className={className}>
        <Input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            tabIndex={tabIndex}
        />
        <Span icon={isChecked ? "checkedbox" : "checkbox"} />
        {NLS.get(label)}
    </label>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
CheckboxInput.propTypes = {
    className : PropTypes.string,
    id        : PropTypes.string,
    name      : PropTypes.string.isRequired,
    value     : PropTypes.any,
    label     : PropTypes.string.isRequired,
    tabIndex  : PropTypes.string,
    isChecked : PropTypes.bool,
    onChange  : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
CheckboxInput.defaultProps = {
    className : "",
    isChecked : false,
};

export default CheckboxInput;
