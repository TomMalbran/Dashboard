import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import InputType            from "../../Core/InputType";
import Utils                from "../../Utils/Utils";

// Components
import Button               from "../Form/Button";
import IconLink             from "../Link/IconLink";
import Input                from "../Input/Input";



// Styles
const Container = Styled.div.attrs(({ hasLabel, labelInside }) => ({ hasLabel, labelInside }))`
    width: 100%;

    ${(props) => props.hasLabel && props.labelInside && `
        & > div:nth-child(n+2) .input {
            padding-top: 8px !important;
        }
    `}
`;

const Div = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 4px;
`;

const Link = Styled(IconLink)`
    flex-shrink: 0;
    font-size: 18px;
`;



/**
 * The Field Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FieldInput(props) {
    const {
        className, inputType, name, value, button, onChange,
        options, withNone, noneText, hasLabel, labelInside, children,
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
        fieldChanged(stringArray, objectArray);
    };

    // Adds a Field to the value
    const addField = () => {
        if (hasItems && name) {
            objectArray.push({ ...baseElem });
        } else {
            stringArray.push("");
        }
        fieldChanged(stringArray, objectArray);
    };

    // Removes a Field from the value at the given index
    const removeField = (index) => {
        if (hasItems) {
            objectArray.splice(index, 1);
        } else {
            stringArray.splice(index, 1);
        }
        fieldChanged(stringArray, objectArray);
    };

    // Sends a Field Change Event
    const fieldChanged = (stringArray, objectArray) => {
        if (hasItems) {
            onChange(name, JSON.stringify(stringArray));
        } else {
            onChange(name, JSON.stringify(objectArray));
        }
    };


    const parts = hasItems ? objectArray : stringArray;
    return <Container className={className} hasLabel={hasLabel} labelInside={labelInside}>
        {parts.map((elem, index) => <Div key={index}>
            {hasItems ? items.map((item) => <Input
                key={`${item.name}-${index}`}
                className="input"
                type={item.type}
                name={`${item.name}-${index}`}
                placeholder={item.placeholder}
                value={elem[item.name] || ""}
                options={item.options}
                withNone={item.withNone}
                noneText={item.noneText}
                onChange={(name, value) => handleChange(value, index, item.name)}
            />) : <Input
                className="input"
                type={inputType}
                name={`${name}-${index}`}
                value={elem}
                options={options}
                withNone={withNone}
                noneText={noneText}
                onChange={(name, value) => handleChange(value, index)}
            />}
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
