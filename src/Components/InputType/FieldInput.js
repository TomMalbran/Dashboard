import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";
import Utils                from "../../Utils/Utils";

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

const Content = Styled.div.attrs(({ withClose, withTitle, withError, withBorder }) => ({ withClose, withTitle, withError, withBorder }))`
    width: 100%;
    display: grid;
    gap: 4px;

    ${(props) => props.withClose ? `
        grid-template-areas:
            ${props.withTitle ? '"title title"' : ""}
            "input close"
            ${props.withError ? '"error error"' : ""}
        ;
        grid-template-columns: 1fr 24px;
    ` : `
        grid-template-areas:
            ${props.withTitle ? '"title"' : ""}
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

const Title = Styled.h4`
    margin: 0 8px;
    grid-area: title;
    font-size: var(--input-font);
    color: var(--title-color);
`;

const Items = Styled.div.attrs(({ columns }) => ({ columns }))`
    width: 100%;
    gap: 6px;
    grid-area: input;

    ${(props) => Number(props.columns) > 1 ? `
        display: grid;
        grid-template-columns: repeat(${props.columns}, 1fr);
    ` : `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
 * The Field Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FieldInput(props) {
    const {
        className, isDisabled, withBorder,
        inputType, name, value, button, onChange,
        options, withNone, noneText,
        title,  columns, errors, children,
    } = props;

    // Parse the Items
    const items    = [];
    const baseElem = {};
    if (children) {
        for (const [ , child ] of Utils.getVisibleChildren(children)) {
            items.push(child.props);
            baseElem[child.props.name] = "";
        }
    }
    const hasItems = items.length > 0;

    // Calculate the Items Array
    let objectArray = [{}];
    let stringArray = [ "" ];
    if (value) {
        let valueArray;
        try {
            valueArray = Array.isArray(value) ? value : JSON.parse(String(value));
            if (!Array.isArray(valueArray)) {
                valueArray = [ valueArray ];
            }
        } catch(e) {
            valueArray = hasItems ? [{}] : [ "" ];
        }
        if (hasItems) {
            objectArray = valueArray;
        } else {
            stringArray = valueArray;
        }
    }

    // Handles a Field Change
    const handleChange = (newValue, index, name = "") => {
        if (hasItems && name) {
            const value = objectArray[index] ? { ...objectArray[index] } : {};
            value[name] = newValue;
            objectArray.splice(index, 1, value);
        } else {
            stringArray.splice(index, 1, newValue);
        }
        fieldChanged(objectArray, stringArray);
    };

    // Adds a Field to the value
    const addField = () => {
        if (hasItems && name) {
            objectArray.push({ ...baseElem });
        } else {
            stringArray.push("");
        }
        fieldChanged(objectArray, stringArray);
    };

    // Removes a Field from the value at the given index
    const removeField = (index) => {
        if (hasItems) {
            objectArray.splice(index, 1);
        } else {
            stringArray.splice(index, 1);
        }
        fieldChanged(objectArray, stringArray);
    };

    // Sends a Field Change Event
    const fieldChanged = (objectArray, stringArray) => {
        if (hasItems) {
            onChange(name, JSON.stringify(objectArray));
        } else {
            onChange(name, JSON.stringify(stringArray));
        }
    };

    // Returns the part error
    const getError = (index) => {
        if (errors) {
            return errors[`${name}-${index}`] || "";
        }
        return "";
    };



    // Do the Render
    const parts     = hasItems ? objectArray : stringArray;
    const withTitle = Boolean(title);

    return <Container
        className={className}
        withBorder={withBorder}
    >
        {parts.map((elem, index) => <Content
            key={index}
            className="inputfield-container"
            withClose={parts.length > 1}
            withError={!!getError(index)}
            withTitle={withTitle}
            withBorder={withBorder}
        >
            {withTitle && <Title>{NLS.format(title, String(index + 1))}</Title>}
            {hasItems && <Items className="inputfield-items" columns={columns}>
                {items.map((item) => <InputField
                    {...item}
                    key={`${item.subkey || item.name}-${index}`}
                    isHidden={item.hide ? item.hide(elem || {}) : false}
                    type={item.type}
                    name={`${item.name}-${index}`}
                    value={elem[item.name] || ""}
                    onChange={(name, value) => handleChange(value, index, item.name)}
                    isDisabled={isDisabled}
                    withLabel={!!item.label || index === 0}
                    isSmall={!item.label && index > 0}
                    fullWidth
                />)}
            </Items>}

            {!hasItems && <InputField
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
            />}

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
FieldInput.propTypes = {
    className  : PropTypes.string,
    isDisabled : PropTypes.bool,
    withBorder : PropTypes.bool,
    name       : PropTypes.string.isRequired,
    inputType  : PropTypes.string,
    value      : PropTypes.any,
    options    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    columns    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    withNone   : PropTypes.bool,
    noneText   : PropTypes.string,
    hasLabel   : PropTypes.bool,
    isSmall    : PropTypes.bool,
    title      : PropTypes.string,
    button     : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    errors     : PropTypes.object,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
FieldInput.defaultProps = {
    className  : "",
    isDisabled : false,
    withBorder : false,
    inputType  : InputType.TEXT,
    withNone   : false,
    noneText   : "",
    button     : "GENERAL_ADD_FIELD",
};

export default FieldInput;
