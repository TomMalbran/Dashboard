import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Hooks
import InputType            from "../../Core/InputType";
import useDrag              from "../../Hooks/Drag";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";
import InputError           from "../Input/InputError";
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.div`;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
`;

const Content = Styled.div.attrs(({ isSortable }) => ({ isSortable }))`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    ${(props) => props.isSortable && "margin-top: 20px;"}
`;

const Item = Styled.div.attrs(({ withError }) => ({ withError }))`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;

    ${(props) => props.withError && `
        .inputfield {
            --input-border: var(--error-color);
        }
    `}
`;

const Inside = Styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Close = Styled(IconLink)`
    --link-size: 20px;
    --link-font: 14px;
    border-radius: var(--border-radius-small);
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
        className, isDisabled,
        inputType, name, value, indexes, button, onChange,
        options, withNone, noneText,
        isSortable, onSort, errors,
    } = props;


    // Calculate the Items Array
    let parts = [ "" ];
    let ids   = [ 0 ];
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
    if (indexes) {
        try {
            ids = Array.isArray(indexes) ? indexes : JSON.parse(String(indexes));
            if (!Array.isArray(ids)) {
                ids = [ ids ];
            }
        } catch(e) {
            ids = [ 0 ];
        }
    } else if (parts) {
        ids = [ ...parts.keys() ];
    }


    // Handles a Field Change
    const handleChange = (newValue, index, name = "") => {
        parts.splice(index, 1, newValue);
        fieldChanged(parts);
    };

    // Adds a Field to the value
    const addField = () => {
        parts.push("");
        ids.push(ids.length);
        fieldChanged(parts, ids);
    };

    // Removes a Field from the value at the given index
    const removeField = (index) => {
        parts.splice(index, 1);
        ids.splice(index, 1);
        fieldChanged(parts, ids);
    };

    // Sends a Field Change Event
    const fieldChanged = (parts, ids) => {
        if (onSort) {
            onSort(name, JSON.stringify(parts), JSON.stringify(ids));
        } else {
            onChange(name, JSON.stringify(parts));
        }
    };

    // Returns the part error
    const getError = (index) => {
        if (errors) {
            return errors[`${name}-${index}`] || "";
        }
        return "";
    };


    // Handles the Item Grab
    const handleGrab = (e, itemID, index) => {
        const node = e.target.parentElement;
        pick(e, node, node.parentElement, itemID, index);
    };

    // Handles the Drop
    const handleDrop = () => {
        const partsList = [ ...parts ];
        const idsList   = [ ...ids ];
        swap(partsList);
        swap(idsList);
        fieldChanged(partsList, idsList);
    };

    // The Drag
    const { pick, swap } = useDrag(handleDrop);



    // Do the Render
    return <Container className={className}>
        <Content isSortable={isSortable}>
            {parts.map((elem, index) => <Item
                key={index}
                className="inputfield-container"
                withError={!!getError(index)}
            >
                {isSortable && <Icon
                    icon="drag"
                    cursor="grab"
                    onMouseDown={(e) => handleGrab(e, elem, index)}
                />}

                <Inside>
                    <InputField
                        type={inputType}
                        name={`${name}-${index}`}
                        value={elem}
                        options={options}
                        withNone={withNone}
                        noneText={noneText}
                        onChange={(name, value) => handleChange(value, index)}
                        isDisabled={isDisabled}
                        withLabel={!isSortable && index === 0}
                        isSmall={isSortable || index > 0}
                    />
                    <Error error={getError(index)} />
                </Inside>

                {parts.length > 1 && <Close
                    variant="light"
                    icon="close"
                    onClick={() => removeField(index)}
                    isSmall
                />}
            </Item>)}
        </Content>

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
    name       : PropTypes.string.isRequired,
    inputType  : PropTypes.string,
    value      : PropTypes.any,
    indexes    : PropTypes.any,
    options    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone   : PropTypes.bool,
    noneText   : PropTypes.string,
    hasLabel   : PropTypes.bool,
    isSmall    : PropTypes.bool,
    button     : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    isSortable : PropTypes.bool,
    onSort     : PropTypes.func,
    errors     : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ListInput.defaultProps = {
    className  : "",
    isDisabled : false,
    inputType  : InputType.TEXT,
    withNone   : false,
    noneText   : "",
    isSortable : false,
    button     : "GENERAL_ADD_FIELD",
};

export default ListInput;