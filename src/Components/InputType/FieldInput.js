import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core, Utils & Hooks
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";
import useDrag              from "../../Hooks/Drag";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";
import InputError           from "../Input/InputError";
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.div.attrs(({ withBorder }) => ({ withBorder }))`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;

    ${(props) => props.withBorder && `
        padding: 12px;
        border: 1px solid var(--input-border);
        border-radius: var(--border-radius);

        &:hover {
            --input-border: var(--input-border-hover);
        }
    `}
`;

const Content = Styled.div.attrs(({ withLine }) => ({ withLine }))`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.withLine ? "12px" : "8px"};
`;

const Item = Styled.div.attrs(({ withSort, withRemove, withTitle, withError, withLine }) => ({ withSort, withRemove, withTitle, withError, withLine }))`
    width: 100%;
    display: grid;
    gap: 4px;

    ${(props) => props.withSort ? `
        grid-template-areas:
            ${props.withTitle ? '"title title title"' : ""}
            "sort input remove"
            ${props.withError ? '"error error error"' : ""}
        ;
        grid-template-columns: 24px 1fr 24px;
    ` : (props.withRemove ? `
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
    `)}

    ${(props) => props.withError && `
        .inputfield {
            --input-border: var(--error-color);
        }
    `}
    ${(props) => props.withLine && `
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

const Inside = Styled.div.attrs(({ columns }) => ({ columns }))`
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

const Input = Styled.div.attrs(({ columns }) => ({ columns }))`
    position: relative;
    ${(props) => props.columns && `grid-column-end: span ${props.columns};`}
    width: 100%;

    :empty {
        display: none;
    }
`;

const Sort = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: sort;
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
        className, isDisabled, withBorder, withLine,
        name, value, indexes, addButton, onChange,
        title, columns, errors, maxAmount,
        isSortable, onSort, children,
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
    let ids   = [ 0 ];
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
    const handleChange = (index, name, newValue) => {
        const value = parts[index] ? { ...parts[index] } : {};
        value[name] = newValue;
        parts.splice(index, 1, value);
        fieldChanged(parts);
    };

    // Handles a Suggest Change
    const handleSuggest = (item, index, idName, idValue, newValue, data) => {
        const value      = parts[index] ? { ...parts[index] } : {};
        value[idName]    = idValue;
        value[item.name] = newValue;
        parts.splice(index, 1, value);
        fieldChanged(parts);

        if (item.onSuggest) {
            item.onSuggest(index, idName, idValue, item.name, newValue, data);
        }
    };

    // Handles a Clear Change
    const handleClear = (item, index, idName) => {
        const value      = parts[index] ? { ...parts[index] } : {};
        value[idName]    = 0;
        value[item.name] = "";
        parts.splice(index, 1, value);
        fieldChanged(parts);

        if (item.onClear) {
            item.onClear(index);
        }
    };

    // Adds a Field to the value
    const handleAdd = () => {
        if (name) {
            parts.push({ ...baseElem });
            ids.push(ids.length);
        }
        fieldChanged(parts, ids);
    };

    // Removes a Field from the value at the given index
    const handleRemove = (index) => {
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


    // Returns the Type of the item
    const getType = (item, elem) => {
        if (item.getType) {
            return item.getType(elem || {});
        }
        return item.type;
    };

    // Returns the Value of the item
    const getValue = (item, elem, index) => {
        if (item.getValue) {
            return item.getValue(index, elem);
        }
        return elem[item.name] || "";
    };

    // Returns the Options of the item
    const getOptions = (item, elem) => {
        if (item.getOptions) {
            return item.getOptions(elem || {});
        }
        return item.options;
    };

    // Returns true if is Disabled
    const getDisabled = (item, elem) => {
        if (isDisabled) {
            return true;
        }
        if (item.getDisabled) {
            return item.getDisabled(elem || {});
        }
        return item.isDisabled;
    };

    // Returns the part error
    const getError = (index, item) => {
        if (!errors) {
            return "";
        }
        if (item) {
            return errors[`${name}-${index}-${item}`] || "";
        }
        return errors[`${name}-${index}`] || "";
    };


    // Handles the Item Grab
    const handleGrab = (e, itemID, index) => {
        const node = e.target.parentElement.parentElement;
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
    };

    // The Drag
    const { pick, orderChanged, swap } = useDrag(handleDrop);

    // Create the References
    const inputRefs = React.useMemo(() => {
        return Array.from({ length : parts.length * items.length }).map(() => React.createRef());
    }, [ parts.length ]);



    // Do the Render
    const withTitle = Boolean(title);
    const canAdd    = Boolean(!isDisabled && (maxAmount === 0 || parts.length < maxAmount));
    const canSort   = Boolean(!isDisabled && isSortable && parts.length > 1);
    const canRemove = Boolean(!isDisabled && parts.length > 1);

    return <Container className={className} withBorder={withBorder}>
        <Content withLine={withLine}>
            {parts.map((elem, index) => <Item
                key={index}
                className="inputfield-container"
                withSort={canSort}
                withRemove={canRemove}
                withError={!!getError(index)}
                withTitle={withTitle}
                withLine={withLine}
            >
                {canSort && <Sort>
                    <Icon
                        variant="light"
                        icon="drag"
                        cursor="grab"
                        onMouseDown={(e) => handleGrab(e, elem, index)}
                    />
                </Sort>}

                {withTitle && <Title>{NLS.format(title, String(index + 1))}</Title>}
                <Inside className="inputfield-items" columns={columns}>
                    {items.map((item, idx) => {
                        const inputRef = inputRefs[index * items.length + idx];
                        const value    = getValue(item, elem, index);

                        return <Input
                            key={`${item.subKey || item.name}-${index}`}
                            columns={item.columns}
                        >
                            <InputField
                                {...item}
                                passedRef={inputRef}
                                isHidden={item.hide ? item.hide(elem || {}) : false}
                                name={`${item.name}-${index}`}
                                type={getType(item, elem)}
                                value={value}
                                options={getOptions(item, elem)}
                                onChange={(name, value) => handleChange(index, item.name, value)}
                                onSuggest={(idName, idValue, name, value, data) => handleSuggest(item, index, idName, idValue, value, data)}
                                onClear={(idName) => handleClear(item, index, idName)}
                                onMedia={() => item.onMedia?.(index, item.name)}
                                withLabel={!!item.label || (!withTitle && index === 0)}
                                isSmall={!item.label && (withTitle || index > 0)}
                                isDisabled={getDisabled(item, elem)}
                                error={getError(index, item.name)}
                                fullWidth
                            >
                                {Utils.cloneChildren(item.children, () => ({
                                    inputRef, value,
                                    onChange : (value) => handleChange(index, item.name, value),
                                }))}
                            </InputField>
                            {item.component}
                        </Input>;
                    })}
                </Inside>

                {canRemove && <Remove>
                    <IconLink
                        variant="light"
                        icon="close"
                        onClick={() => handleRemove(index)}
                        isSmall
                    />
                </Remove>}

                <Error error={getError(index)} />
            </Item>)}
        </Content>

        <Button
            isHidden={!canAdd}
            variant="outlined"
            message={addButton}
            onClick={handleAdd}
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
    withLine   : PropTypes.bool,
    name       : PropTypes.string.isRequired,
    value      : PropTypes.any,
    indexes    : PropTypes.any,
    columns    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    hasLabel   : PropTypes.bool,
    isSmall    : PropTypes.bool,
    title      : PropTypes.string,
    addButton  : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    isSortable : PropTypes.bool,
    onSort     : PropTypes.func,
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
    withLine   : false,
    addButton  : "GENERAL_ADD_FIELD",
    isSortable : false,
    maxAmount  : 0,
};

export default FieldInput;
