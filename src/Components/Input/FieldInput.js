import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import InputType            from "../../Core/InputType";

// Components
import Button               from "../Form/Button";
import IconLink             from "../Link/IconLink";
import Input                from "../Input/Input";



// Styles
const Container = Styled.div.attrs(({ hasLabel, labelInside }) => ({ hasLabel, labelInside }))`
    width: 100%;

    ${(props) => props.hasLabel && props.labelInside && `
        & > div:nth-child(n+2) > .input {
            padding-top: 8px !important;
        }
    `}
`;

const Div = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
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
    const {
        className, inputType, name, value, button, onChange,
        options, withNone, noneText, hasLabel, labelInside,
    } = props;

    // Calculate the Parts Array
    let parts = [ "" ];
    if (value) {
        try {
            parts = JSON.parse(String(value));
            if (!Array.isArray(parts)) {
                parts = [ parts ];
            }
        } catch(e) {
            parts = [ "" ];
        }
    }

    // Handles a Field Change
    const handleChange = (newValue, index) => {
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


    return <Container className={className} hasLabel={hasLabel} labelInside={labelInside}>
        {parts.map((elem, index) => <Div key={index}>
            <Input
                className="input"
                type={inputType}
                name={`${name}-${index}`}
                value={elem}
                options={options}
                withNone={withNone}
                noneText={noneText}
                onChange={(name, value) => handleChange(value, index)}
            />
            {parts.length > 1 && <Link
                variant="light"
                icon="close"
                onClick={() => removeField(index)}
            />}
        </Div>)}
        <Button
            variant="outlined"
            message={button}
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
    className   : PropTypes.string,
    name        : PropTypes.string.isRequired,
    inputType   : PropTypes.string,
    value       : PropTypes.any,
    options     : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone    : PropTypes.bool,
    noneText    : PropTypes.string,
    hasLabel    : PropTypes.bool,
    labelInside : PropTypes.bool,
    button      : PropTypes.string,
    onChange    : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
FieldInput.defaultProps = {
    className : "",
    inputType : InputType.TEXT,
    withNone  : false,
    noneText  : "",
    button    : "GENERAL_ADD_FIELD",
};

export default FieldInput;
