import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.div`
    margin-top: 8px;
`;

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
        border-color: var(--border-color);
        outline: none;
    }
    &:checked + span {
        border-color: var(--border-color);
        background-color: #52cf71;
    }
    &:disabled + span {
        background-color: rgb(245, 245, 245);
        color: rgb(175, 175, 175);
    }
`;

const Label = Styled.label`
    display: block;
    margin-top: 4px;
`;

const Span = Styled.span`
    position: relative;
    display: inline-block;
    margin: 1px 5px -2px -12px;
    height: 11px;
    width: 11px;
    border: 1px solid var(--lighter-color);
    border-radius: 100%;
    font-size: 1px;
    vertical-align: baseline;
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
