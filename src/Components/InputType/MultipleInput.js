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
    gap: 8px;
    margin-top: 8px;
    margin-bottom: 4px;
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
        name, value, columns, getDisabled,
        onChange, onFocus, onBlur,
    } = props;


    // Create the Items
    const items = InputType.useOptions(props);

    // Generate the parts
    const parts = React.useMemo(() => {
        let result = [];
        try {
            result = Array.isArray(value) ? value : JSON.parse(String(value));
        } catch(e) {
            result = [];
        }
        for (const [ index, item ] of result.entries()) {
            result[index] = String(item);
        }
        return result;
    }, [ value ]);


    // Handles the Change
    const handleChange = (isChecked, key) => {
        if (isChecked) {
            parts.push(key);
        } else {
            const pos = parts.indexOf(key);
            if (pos > -1) {
                parts.splice(pos, 1);
            }
        }
        onChange(name, JSON.stringify(parts));
    };

    // Returns true if is Disabled
    const getItemDisabled = (key) => {
        if (isDisabled) {
            return true;
        }
        if (getDisabled) {
            return getDisabled(key);
        }
        return false;
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
            {items.map(({ key, value }) => <CheckboxInput
                key={key}
                name={name}
                value={key}
                label={value}
                isChecked={parts.includes(String(key))}
                isDisabled={getItemDisabled(key)}
                onChange={(name, isChecked) => handleChange(isChecked, String(key))}
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
    className   : PropTypes.string,
    isFocused   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    name        : PropTypes.string.isRequired,
    value       : PropTypes.any,
    options     : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noneText    : PropTypes.string,
    noneValue   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    columns     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    getDisabled : PropTypes.func,
    onChange    : PropTypes.func.isRequired,
    onFocus     : PropTypes.func.isRequired,
    onBlur      : PropTypes.func.isRequired,
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
