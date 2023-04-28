import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import InputType            from "../../Core/InputType";
import Utils                from "../../Utils/Utils";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";
import IconLink             from "../Link/IconLink";
import Input                from "../Input/Input";
import InputError           from "../Input/InputError";



// Styles
const Container = Styled.div.attrs(({ hasLabel, labelInside }) => ({ hasLabel, labelInside }))`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;

    ${(props) => props.hasLabel && props.labelInside && `
        & > div:nth-child(n+2) .input {
            padding-top: 8px !important;
        }
    `}
`;

const Content = Styled.div.attrs(({ withClose, withError, withBorder }) => ({ withClose, withError, withBorder }))`
    width: 100%;
    display: grid;
    grid-template-areas: "input";
    gap: 4px;

    ${(props) => (props.withClose && props.withError) && `
        grid-template-areas:
            "input close"
            "error error";
        grid-template-columns: 1fr 24px;
    `}

    ${(props) => (props.withClose && !props.withError) && `
        grid-template-areas:
            "input close";
        grid-template-columns: 1fr 24px;
    `}

${(props) => (!props.withClose && props.withError) && `
        grid-template-areas:
            "input"
            "error";
    `}

    ${(props) => props.withBorder && `
        padding-bottom: 8px;
        border-bottom: 2px solid var(--dark-gray);
    `}
`;

const Items = Styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    grid-area: input;
`;

const Close = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: close;
`;

const Link = Styled(IconLink)`
    --link-size: 24px;
    font-size: 18px;
`;

const Error = Styled(InputError)`
    grid-area: error;
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
        withBorder, errors, children,
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
    const parts = hasItems ? objectArray : stringArray;
    return <Container
        className={className}
        hasLabel={hasLabel}
        labelInside={labelInside}
    >
        {parts.map((elem, index) => <Content
            key={index}
            className="inputfield-container"
            withClose={parts.length > 1}
            withError={!!getError(index)}
            withBorder={withBorder}
        >
            {hasItems && <Items className="inputfield-items">
                {items.map((item) => <InputField
                    {...item}
                    key={`${item.subkey || item.name}-${index}`}
                    isHidden={item.hide ? item.hide(elem || {}) : false}
                    type={item.type}
                    name={`${item.name}-${index}`}
                    value={elem[item.name] || ""}
                    labelInside={labelInside}
                    fullWidth
                    onChange={(name, value) => handleChange(value, index, item.name)}
                />)}
            </Items>}

            {!hasItems && <Input
                className="input"
                type={inputType}
                name={`${name}-${index}`}
                value={elem}
                options={options}
                withNone={withNone}
                noneText={noneText}
                onChange={(name, value) => handleChange(value, index)}
            />}

            {parts.length > 1 && <Close>
                <Link
                    variant="light"
                    icon="close"
                    onClick={() => removeField(index)}
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
    className   : PropTypes.string,
    name        : PropTypes.string.isRequired,
    inputType   : PropTypes.string,
    value       : PropTypes.any,
    options     : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone    : PropTypes.bool,
    noneText    : PropTypes.string,
    hasLabel    : PropTypes.bool,
    labelInside : PropTypes.bool,
    isSmall     : PropTypes.bool,
    withBorder  : PropTypes.bool,
    button      : PropTypes.string,
    onChange    : PropTypes.func.isRequired,
    errors      : PropTypes.object,
    children    : PropTypes.any,
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
