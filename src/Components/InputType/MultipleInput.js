import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import InputType            from "../../Core/InputType";

// Components
import CheckboxInput        from "../InputType/CheckboxInput";



// Styles
const Container = Styled.div.attrs(({ columns }) => ({ columns }))`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: 4px;
    width: 100%;
    padding: 16px 8px 8px 8px;
    border: var(--input-border);
    border-radius: var(--border-radius);

    @media (max-width: 500px) {
        display: block;
        & > label {
            display: block;
        }
    }
`;



/**
 * The Multiple Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MultipleInput(props) {
    const {
        className, name, value,
        tabIndex, columns, onChange,
    } = props;


    // Create the Items
    const items = InputType.createOptions(props);

    // Handles the Change
    const handleChange = (isChecked, key, value = []) => {
        const values = !Array.isArray(value) ? [] : value;
        if (isChecked) {
            values.push(key);
        } else {
            const pos = values.indexOf(key);
            if (pos > -1) {
                values.splice(pos, 1);
            }
        }
        onChange(name, values);
    };


    return <Container
        className={className}
        columns={columns}
    >
        {items.map(({ key, value : val }) => <CheckboxInput
            key={key}
            name={name}
            value={key}
            label={val}
            isChecked={value ? value.indexOf(key) > -1 : false}
            onChange={(name, isChecked) => handleChange(isChecked, key, value)}
            tabIndex={tabIndex}
        />)}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MultipleInput.propTypes = {
    className : PropTypes.string,
    name      : PropTypes.string.isRequired,
    value     : PropTypes.any,
    options   : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone  : PropTypes.bool,
    noneText  : PropTypes.string,
    tabIndex  : PropTypes.string,
    columns   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange  : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MultipleInput.defaultProps = {
    className : "",
    withNone  : false,
    noneText  : "",
    columns   : 2,
};

export default MultipleInput;
