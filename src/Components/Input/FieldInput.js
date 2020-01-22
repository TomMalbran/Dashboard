import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Button               from "../Form/Button";
import IconLink             from "../Link/IconLink";



// Styles
const Container = Styled.div`
    width: 100%;
`;

const Div = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
`;

const Input = Styled.input`
    box-sizing: border-box;
    appearance: none;
    font-size: 13px;
    width: 100%;
    margin: 0;
    padding: 4px 8px;
    min-height: calc(var(--input-height) - 8px);
    color: var(--black-color);
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
    background-color: white;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: var(--border-color);
        color: var(--secondary-color);
    }
    &:disabled {
        color: rgb(175, 175, 175);
        border-color: rgb(205, 205, 205);
        box-shadow: none;
    }
`;

const Link = Styled(IconLink)`
    font-size: 18px;
    margin-left: 4px;
`;



/**
 * The Field Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FieldInput(props) {
    const { className, name, value, button, onChange } = props;
    const parts = value ? JSON.parse(String(value)) : [ "" ];

    // Handles a Field Change
    const handleChange = (e, index) => {
        const newValue = e.target.value;
        parts.splice(index, 1, newValue);
        fieldChanged(parts);
    };

    // Adds a Field to the value
    const addField = () => {
        parts.push("");
        fieldChanged(parts);
    };

    // Removes a Field from the value at the given index
    const removeField = (index) => {
        parts.splice(index, 1);
        fieldChanged(parts);
    };

    // Sends a Field Change Event
    const fieldChanged = (parts) => {
        onChange(name, JSON.stringify(parts));
    };


    return <Container className={className}>
        {parts.map((elem, index) => <Div key={index}>
            <Input
                className="input"
                type="text"
                name={`${name}-${index}`}
                value={elem}
                onChange={(e) => handleChange(e, index)}
            />
            {parts.length > 1 && <Link
                variant="light"
                icon="close"
                onClick={() => removeField(index)}
            />}
        </Div>)}
        <Button
            variant="outlined"
            message={button || "GENERAL_ADD_FIELD"}
            onClick={addField}
            isSmall
        />
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
FieldInput.propTypes = {
    className : PropTypes.string,
    name      : PropTypes.string.isRequired,
    value     : PropTypes.any,
    button    : PropTypes.string,
    onChange  : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
FieldInput.defaultProps = {
    className : "",
};

export default FieldInput;
