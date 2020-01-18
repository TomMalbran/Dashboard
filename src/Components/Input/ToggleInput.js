import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Label = Styled.label`
    position: relative;
    display: flex;
    align-items: center;

    --toggle-size: 14px;
    --toggle-spacing: 4px;
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
`;

const Span = Styled.span`
    position: relative;
    box-sizing: border-box;
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
    const { className, name, value, label, tabIndex, onChange } = props;
    
    // Handles the Checkbox Change
    const handleChange = (e) => {
        onChange(name, e.target.checked ? 1 : 0);
    };


    return <Label className={className}>
        <Input
            type="checkbox"
            name={name}
            value="1"
            checked={value}
            onChange={handleChange}
            tabIndex={tabIndex}
        />
        <Span />
        {NLS.get(label)}
    </Label>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ToggleInput.propTypes = {
    className : PropTypes.string,
    name      : PropTypes.string,
    value     : PropTypes.any,
    label     : PropTypes.string,
    tabIndex  : PropTypes.string,
    onChange  : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ToggleInput.defaultProps = {
    className : "",
};

export default ToggleInput;
