import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Core
import CheckboxInput        from "../Input/CheckboxInput";



// Styles
const Container = Styled.div.attrs(({ labelInside, columns }) => ({ labelInside, columns }))`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: 4px;
    width: 100%;
    padding: 12px 8px 8px 8px;
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
    ${(props) => props.labelInside ? "padding-top: 16px" : ""};

    @media (max-width: 500px) {
        display: block;
    }
`;



/**
 * The Multiple Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MultipleInput(props) {
    const {
        className, name, value, options, withNone, noneText,
        tabIndex, labelInside, columns, onChange,
    } = props;

    const isSelect = !Array.isArray(options);
    const items    = isSelect ? NLS.select(options) : options;

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
        labelInside={labelInside}
        columns={columns}
    >
        {withNone && <CheckboxInput
            key={0}
            name={name}
            value={0}
            label={NLS.get(noneText)}
            isChecked={value ? value.indexOf(0) > -1 : false}
            onChange={(name, isChecked) => handleChange(isChecked, 0, value)}
            tabIndex={tabIndex}
        />}
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
    withNone    : PropTypes.bool,
    noneText    : PropTypes.string,
    tabIndex    : PropTypes.string,
    labelInside : PropTypes.bool,
    columns     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange    : PropTypes.func.isRequired,
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
