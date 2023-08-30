import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
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
            "input remove"
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

const Remove = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: remove;
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
        name, value, addButton, onChange,
        title, columns, errors, maxAmount, children,
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

    // Calculate the Items Array
    let parts = [{}];
    if (value) {
        try {
            parts = Array.isArray(value) ? value : JSON.parse(String(value));
            if (!Array.isArray(parts)) {
                parts = [ parts ];
            }
        } catch(e) {
            parts = [{}];
        }
    }


    // Handles a Field Change
    const handleChange = (newValue, index, name = "") => {
        if (name) {
            const value = parts[index] ? { ...parts[index] } : {};
            value[name] = newValue;
            parts.splice(index, 1, value);
        }
        fieldChanged(parts);
    };

    // Adds a Field to the value
    const addField = () => {
        if (name) {
            parts.push({ ...baseElem });
        }
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
    const withTitle = Boolean(title);
    const canAdd    = Boolean(!isDisabled && (maxAmount === 0 || parts.length < maxAmount));
    const canRemove = Boolean(!isDisabled && parts.length > 1);

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
            <Items className="inputfield-items" columns={columns}>
                {items.map((item) => <InputField
                    {...item}
                    key={`${item.subKey || item.name}-${index}`}
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
            </Items>

            {canRemove && <Remove>
                <IconLink
                    variant="light"
                    icon="close"
                    onClick={() => removeField(index)}
                    isSmall
                />
            </Remove>}

            <Error error={getError(index)} />
        </Content>)}

        <Button
            isHidden={!canAdd}
            variant="outlined"
            message={addButton}
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
    value      : PropTypes.any,
    columns    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    hasLabel   : PropTypes.bool,
    isSmall    : PropTypes.bool,
    title      : PropTypes.string,
    addButton  : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    maxAmount  : PropTypes.number,
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
    addButton  : "GENERAL_ADD_FIELD",
    maxAmount  : 0,
};

export default FieldInput;
