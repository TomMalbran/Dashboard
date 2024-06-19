import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import InputType            from "../../Core/InputType";

// Components
import InputContent         from "../Input/InputContent";
import CheckboxInput        from "../InputType/CheckboxInput";



// Styles
const Container = Styled.div.attrs(({ columns }) => ({ columns }))`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
    gap: 4px;
    width: 100%;

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
        className, isFocused, isDisabled,
        name, value, columns,
        onChange, onFocus, onBlur,
    } = props;

    // Create the Items
    const items = InputType.useOptions(props);

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


    // Do the Render
    return <InputContent
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        withBorder
        withPadding
        withLabel
    >
        <Container columns={columns}>
            {items.map(({ key, value : val }) => <CheckboxInput
                key={key}
                name={name}
                value={key}
                label={val}
                isChecked={value ? value.indexOf(Number(key)) > -1 : false}
                isDisabled={isDisabled}
                onChange={(name, isChecked) => handleChange(isChecked, Number(key), value)}
                onFocus={onFocus}
                onBlur={onBlur}
            />)}
        </Container>
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MultipleInput.propTypes = {
    className  : PropTypes.string,
    isFocused  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    name       : PropTypes.string.isRequired,
    value      : PropTypes.any,
    options    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noneText   : PropTypes.string,
    columns    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange   : PropTypes.func.isRequired,
    onFocus    : PropTypes.func.isRequired,
    onBlur     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MultipleInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
    noneText   : "",
    columns    : 2,
};

export default MultipleInput;
