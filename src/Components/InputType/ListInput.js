import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core, Utils & Hooks
import InputType            from "../../Core/InputType";
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";
import useDrag              from "../../Hooks/Drag";

// Components
import InputContent         from "../Input/InputContent";
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
    margin-top: 16px;
    margin-bottom: 6px;
`;

const Content = Styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Item = Styled.div.attrs(({ withError }) => ({ withError }))`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    min-height: 32px;
    padding: 6px 6px 6px 12px;
    background-color: var(--lightest-gray);
    border-radius: var(--border-radius);

    .inputfield-children {
        margin-bottom: 0;
    }

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

const Remove = Styled(IconLink)`
    --link-size: 20px;
    --link-font: 14px;
    margin-left: 4px;
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
        className, isFocused, isDisabled,
        inputType, name, value, indexes, addButton,
        onFocus, onBlur, onChange,
        options, noneText, noneValue,
        isSortable, onSort, errors, maxAmount, maxLength,
        children,
    } = props;


    // Calculate the Items Array
    let parts = [ "" ];
    let ids   = [ 0 ];

    if (value) {
        try {
            parts = Array.isArray(value) ? value : JSON.parse(String(value));
            if (!Array.isArray(parts)) {
                parts = [ parts ];
            } else if (!parts.length) {
                parts = [ "" ];
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
    const handleChange = (newValue, index) => {
        parts.splice(index, 1, newValue);
        fieldChanged(parts);
    };

    // Handles a Paste
    const handlePaste = (e, index) => {
        e.stopPropagation();
        e.preventDefault();

        // Get pasted data via clipboard API and split it by lines
        const pastedData = e.clipboardData.getData("Text");
        const lines      = pastedData.split(/\r?\n|\r/g);

        // Filter out empty lines and parse the values
        const values = [];
        for (const line of lines) {
            if (!line) {
                continue;
            }
            if (inputType === InputType.NUMBER) {
                const number = Number(line.replace(/[^0-9]/g, ""));
                if (!isNaN(number)) {
                    values.push(number);
                }
            } else {
                values.push(line);
            }
        }

        parts.splice(index, 1, ...values);
        fieldChanged(parts);
    };

    // Handles the Key Down
    const handleKeyDown = (e, value, index) => {
        if (value && e.keyCode === KeyCode.DOM_VK_RETURN) {
            parts.splice(index + 1, 0, "");
            ids.splice(index + 1, ids.length);
            fieldChanged(parts, ids);
            focusItem(index + 1);
            onFocus();
        } else if (!value && parts.length && e.keyCode === KeyCode.DOM_VK_BACK_SPACE) {
            handleRemove(index);
        } else if (index > 0 && e.keyCode === KeyCode.DOM_VK_UP) {
            if (isSortable && (e.ctrlKey || e.metaKey)) {
                swapItems(index, -1);
            }
            focusItem(index - 1);
            e.preventDefault();
        } else if (index < parts.length - 1 && e.keyCode === KeyCode.DOM_VK_DOWN) {
            if (isSortable && (e.ctrlKey || e.metaKey)) {
                swapItems(index, 1);
            }
            focusItem(index + 1);
            e.preventDefault();
        }
    };

    // Adds a Field to the value
    const handleAdd = () => {
        parts.push("");
        ids.push(ids.length);
        fieldChanged(parts, ids);
        focusItem(parts.length - 1);
        onFocus();
    };

    // Removes a Field from the value at the given index
    const handleRemove = (index) => {
        parts.splice(index, 1);
        ids.splice(index, 1);
        fieldChanged(parts, ids);
        focusItem(index - 1);
        onFocus();
    };


    // Sends a Field Change Event
    const fieldChanged = (parts, ids) => {
        if (onSort) {
            onSort(name, JSON.stringify(parts), JSON.stringify(ids));
        } else {
            onChange(name, JSON.stringify(parts));
        }
    };

    // Swaps 2 items
    const swapItems = (index, direction) => {
        const part = parts[index];
        const id   = ids[index];
        parts.splice(index, 1);
        parts.splice(index + direction, 0, part);
        ids.splice(index, 1);
        ids.splice(index + direction, 0, id);
        fieldChanged(parts, ids);
    };

    // Focuses an Item
    const focusItem = (index) => {
        window.setTimeout(() => {
            /** @type {HTMLInputElement} */
            const elem = document.querySelector(`.inputfield-item-${name}-${index} input`);
            if (elem) {
                elem.focus();
            }
        }, 10);
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
        if (!orderChanged()) {
            return;
        }
        const partsList = [ ...parts ];
        const idsList   = [ ...ids ];
        swap(partsList);
        swap(idsList);
        fieldChanged(partsList, idsList);
        onFocus();
    };

    // The Drag
    const { pick, orderChanged, swap } = useDrag(handleDrop);

    // Create the References
    const inputRefs = React.useMemo(() => {
        return Array.from({ length : parts.length }).map(() => React.createRef());
    }, [ parts.length ]);


    // Variables
    const canAdd    = Boolean(!isDisabled && (maxAmount === 0 || parts.length < maxAmount));
    const canSort   = Boolean(!isDisabled && isSortable && parts.length > 1);
    const canRemove = Boolean(!isDisabled && (parts.length > 1 || String(parts[0]).length));


    // Do the Render
    return <InputContent
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        withBorder
        withPadding
    >
        <Container>
            <Content>
                {parts.map((elem, index) => <Item
                    key={index}
                    className="inputfield-container"
                    withError={!!getError(index)}
                >
                    <Icon
                        isHidden={!canSort}
                        icon="drag"
                        cursor="grab"
                        onMouseDown={(e) => handleGrab(e, elem, index)}
                    />

                    <Inside>
                        <InputField
                            passedRef={inputRefs[index]}
                            className={`inputfield-item-${name}-${index}`}
                            type={inputType}
                            name={`${name}-${index}`}
                            value={elem}
                            options={options}
                            noneText={noneText}
                            noneValue={noneValue}
                            onChange={(name, value) => handleChange(value, index)}
                            onKeyDown={(e) => handleKeyDown(e, elem, index)}
                            onPaste={(e) => handlePaste(e, index)}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            isDisabled={isDisabled}
                            maxLength={maxLength}
                            withLabel={false}
                            withBorder={false}
                            isSmall
                        >
                            {Utils.cloneChildren(children, () => ({
                                inputRef : inputRefs[index],
                                value    : elem,
                                onChange : (value) => handleChange(value, index),
                            }))}
                        </InputField>
                        <Error error={getError(index)} />
                    </Inside>

                    <Remove
                        isHidden={!canRemove}
                        variant="light"
                        icon="close"
                        onClick={() => handleRemove(index)}
                        isSmall
                    />
                </Item>)}
            </Content>

            <Button
                isHidden={!canAdd}
                variant="outlined"
                message={addButton}
                onClick={handleAdd}
                isSmall
            />
        </Container>
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ListInput.propTypes = {
    className  : PropTypes.string,
    isFocused  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    name       : PropTypes.string.isRequired,
    inputType  : PropTypes.string,
    value      : PropTypes.any,
    indexes    : PropTypes.any,
    options    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noneText   : PropTypes.string,
    noneValue  : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    hasLabel   : PropTypes.bool,
    isSmall    : PropTypes.bool,
    addButton  : PropTypes.string,
    onFocus    : PropTypes.func,
    onBlur     : PropTypes.func,
    onChange   : PropTypes.func.isRequired,
    isSortable : PropTypes.bool,
    onSort     : PropTypes.func,
    maxAmount  : PropTypes.number,
    maxLength  : PropTypes.number,
    errors     : PropTypes.object,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ListInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
    inputType  : InputType.TEXT,
    noneText   : "",
    isSortable : false,
    addButton  : "GENERAL_ADD_FIELD",
    maxAmount  : 0,
    maxLength  : 0,
};

export default ListInput;
