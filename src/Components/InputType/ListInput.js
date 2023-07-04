import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import InputType            from "../../Core/InputType";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";
import InputError           from "../Input/InputError";
import IconLink             from "../Link/IconLink";



// Styles
const Container = Styled.div.attrs(({ withBorder }) => ({ withBorder }))`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.withBorder ? "12px" : "8px"};
    width: 100%;
`;

const Content = Styled.div.attrs(({ withClose, withError, withBorder }) => ({ withClose, withError, withBorder }))`
    width: 100%;
    display: grid;
    gap: 4px;

    ${(props) => props.withClose ? `
        grid-template-areas:
            "input close"
            ${props.withError ? '"error error"' : ""}
        ;
        grid-template-columns: 1fr 24px;
    ` : `
        grid-template-areas:
            "input"
            ${props.withError ? '"error"' : ""}
        ;
    `}

    ${(props) => props.withError && `
        .inputfield {
            --input-border: var(--error-color);
        }
    `}
    ${(props) => props.withBorder && `
        padding-bottom: 12px;
        border-bottom: 2px solid var(--dark-gray);
    `}
`;

const Close = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: close;
`;

const Error = Styled(InputError)`
    grid-area: error;
    margin-top: 0;
`;



/**
 * The List Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ListInput(props) {
    const {
        className, isDisabled, withBorder,
        inputType, name, value, button, onChange,
        options, withNone, noneText,
        errors,
    } = props;


    // Calculate the Items Array
    let parts = [ "" ];
    if (value) {
        try {
            parts = Array.isArray(value) ? value : JSON.parse(String(value));
            if (!Array.isArray(parts)) {
                parts = [ parts ];
            }
        } catch(e) {
            parts = [ "" ];
        }
    }


    // Handles a Field Change
    const handleChange = (newValue, index, name = "") => {
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

    // Returns the part error
    const getError = (index) => {
        if (errors) {
            return errors[`${name}-${index}`] || "";
        }
        return "";
    };



    // Do the Render
    return <Container
        className={className}
        withBorder={withBorder}
    >
        {parts.map((elem, index) => <Content
            key={index}
            className="inputfield-container"
            withClose={parts.length > 1}
            withError={!!getError(index)}
            withBorder={withBorder}
        >
            <InputField
                type={inputType}
                name={`${name}-${index}`}
                value={elem}
                options={options}
                withNone={withNone}
                noneText={noneText}
                onChange={(name, value) => handleChange(value, index)}
                isDisabled={isDisabled}
                withLabel={index === 0}
                isSmall={index > 0}
            />

            {parts.length > 1 && <Close>
                <IconLink
                    variant="light"
                    icon="close"
                    onClick={() => removeField(index)}
                    isSmall
                />
            </Close>}

            <Error error={getError(index)} />
        </Content>)}
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
ListInput.propTypes = {
    className  : PropTypes.string,
    isDisabled : PropTypes.bool,
    withBorder : PropTypes.bool,
    name       : PropTypes.string.isRequired,
    inputType  : PropTypes.string,
    value      : PropTypes.any,
    options    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone   : PropTypes.bool,
    noneText   : PropTypes.string,
    hasLabel   : PropTypes.bool,
    isSmall    : PropTypes.bool,
    button     : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    errors     : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ListInput.defaultProps = {
    className  : "",
    isDisabled : false,
    withBorder : false,
    inputType  : InputType.TEXT,
    withNone   : false,
    noneText   : "",
    button     : "GENERAL_ADD_FIELD",
};

export default ListInput;
