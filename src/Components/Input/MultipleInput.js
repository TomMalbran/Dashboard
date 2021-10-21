import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Core
import CheckboxInput        from "../Input/CheckboxInput";



// Styles
const Container = Styled.div.attrs(({ labelInside }) => ({ labelInside }))`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4px;
    width: 100%;
    padding: 12px 8px 8px 8px;
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
    ${(props) => props.labelInside ? "padding-top: 16px" : ""};
`;



/**
 * The Multiple Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MultipleInput(props) {
    const { className, name, value, options, tabIndex, labelInside, onChange } = props;

    const isSelect = !Array.isArray(options);
    const items    = isSelect ? NLS.select(options) : options;

    // Handles the Change
    const handleChange = (isChecked, key, value = []) => {
        if (isChecked) {
            value.push(key);
        } else {
            const pos = value.indexOf(key);
            if (pos > -1) {
                value.splice(pos, 1);
            }
        }
        onChange(name, value);
    };


    return <Container className={className} labelInside={labelInside}>
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
    className   : PropTypes.string,
    name        : PropTypes.string.isRequired,
    value       : PropTypes.any,
    options     : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    tabIndex    : PropTypes.string,
    labelInside : PropTypes.bool,
    onChange    : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MultipleInput.defaultProps = {
    className : "",
};

export default MultipleInput;
