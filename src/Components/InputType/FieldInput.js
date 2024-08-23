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
    box-sizing: border-box;
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
            ${props.withTitle ? '"title title extra"' : ""}
            ${props.withError ? '"error error extra"' : ""}
            "sort input remove"
        ;
        grid-template-columns: 24px 1fr 24px;
    ` : (props.withRemove ? `
        grid-template-areas:
            ${props.withTitle ? '"title extra"' : ""}
            ${props.withError ? '"error extra"' : ""}
            "input remove"
        ;
        grid-template-columns: 1fr 24px;
    ` : `
        grid-template-areas:
            ${props.withTitle ? '"title"' : ""}
            ${props.withError ? '"error"' : ""}
            "input"
        ;
    `)}

    ${(props) => props.withLine && `
        padding-bottom: 12px;
        border-bottom: 2px solid var(--dark-gray);
    `}
`;

const Title = Styled.h4`
    grid-area: title;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 8px;
    font-size: calc(var(--input-font) * 1.1);
    color: var(--title-color);
`;

const Inside = Styled.div.attrs(({ columns }) => ({ columns }))`
    grid-area: input;
    width: 100%;
    gap: 6px;

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
    flex-direction: column;
    grid-area: remove;
    gap: 8px;
`;

const Error = Styled(InputError)`
    grid-area: error;
    margin-bottom: 4px;
    text-align: left;
    border-radius: var(--border-radius);
    padding: 6px 12px;
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
        title, getAfterTitle, columns,
        errors, maxAmount, allowEmpty, noneText,
        isSortable, onSort, extraIcon, onExtraIcon, children,
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
    const handleChange = (item, index, name, newValue, secName, secValue, data) => {
        const value      = parts[index] ? { ...parts[index] } : {};
        value[item.name] = newValue;
        if (secName) {
            value[secName] = secValue;
        }
        parts.splice(index, 1, value);
        fieldChanged(parts);

        if (item.onChange) {
            item.onChange(index, item.name, newValue, secName, secValue, data);
        }
    };

    // Handles a Clear Change
    const handleClear = (item, index, idName) => {
        const value      = parts[index] ? { ...parts[index] } : {};
        value[item.name] = "";
        if (idName) {
            value[idName] = 0;
        }
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


    // Returns the Value of the item
    const getValue = (item, elem, index) => {
        if (item.getValue) {
            return item.getValue(index, elem);
        }
        return elem[item.name] || "";
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


    // Variables
    const withTitle    = Boolean(title);
    const canAdd       = Boolean(!isDisabled && (maxAmount === 0 || parts.length < maxAmount));
    const canSort      = Boolean(!isDisabled && isSortable && parts.length > 1);
    const canRemove    = Boolean(!isDisabled && (allowEmpty || parts.length > 1));
    const hasExtraIcon = Boolean(extraIcon && onExtraIcon);
    const hasPostIcons = Boolean(canRemove || hasExtraIcon);
    const isEmpty      = Boolean(allowEmpty && noneText && !parts.length);


    // Do the Render
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

                {withTitle && <Title>
                    <span>{NLS.format(title, String(index + 1))}</span>
                    {getAfterTitle?.(elem, index)}
                </Title>}

                <Error
                    error={getError(index)}
                    useBackground
                />

                <Inside className="inputfield-items" columns={columns}>
                    {items.map((item, idx) => {
                        const data     = elem || {};
                        const key      = `${item.subKey || item.name}-${index}`;
                        const inputRef = inputRefs[index * items.length + idx];
                        const value    = getValue(item, elem, index);
                        const columns  = item.getColumns?.(data) || item.columns || 1;
                        const isHidden = item.hide?.(data) ?? false;

                        if (isHidden) {
                            return <React.Fragment key={key} />;
                        }
                        return <Input key={key} columns={columns}>
                            <InputField
                                {...item}
                                passedRef={inputRef}
                                name={`${item.name}-${index}`}
                                type={item.getType?.(data) || item.type}
                                value={value}
                                options={item.getOptions?.(data) || item.options}
                                icon={item.getIcon?.(data) || item.icon}
                                postIcon={item.getPostIcon?.(data) || item.postIcon}
                                isDisabled={getDisabled(item, data)}
                                error={getError(index, item.name)}
                                onChange={(name, value, secName, secValue, newData) => {
                                    handleChange(item, index, name, value, secName, secValue, newData);
                                }}
                                onClear={(name, value, secName, secValue) => {
                                    handleClear(item, index, secName);
                                }}
                                onMedia={() => item.onMedia?.(index, item.name)}
                                withLabel={!!item.label || (!withTitle && index === 0)}
                                isSmall={!item.label && (withTitle || index > 0)}
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

                {hasPostIcons && <Remove>
                    <IconLink
                        isHidden={!hasExtraIcon}
                        variant="light"
                        icon={extraIcon}
                        onClick={() => onExtraIcon(index)}
                        isSmall
                    />
                    <IconLink
                        variant="error"
                        icon="delete"
                        onClick={() => handleRemove(index)}
                        isSmall
                    />
                </Remove>}
            </Item>)}
        </Content>

        {isEmpty && <Container withBorder={!withBorder}>
            <b>{NLS.get(noneText)}</b>
        </Container>}

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
    className     : PropTypes.string,
    isDisabled    : PropTypes.bool,
    withBorder    : PropTypes.bool,
    withLine      : PropTypes.bool,
    name          : PropTypes.string.isRequired,
    value         : PropTypes.any,
    indexes       : PropTypes.any,
    columns       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    hasLabel      : PropTypes.bool,
    isSmall       : PropTypes.bool,
    title         : PropTypes.string,
    getAfterTitle : PropTypes.func,
    addButton     : PropTypes.string,
    onChange      : PropTypes.func.isRequired,
    allowEmpty    : PropTypes.bool,
    noneText      : PropTypes.string,
    isSortable    : PropTypes.bool,
    onSort        : PropTypes.func,
    extraIcon     : PropTypes.string,
    onExtraIcon   : PropTypes.func,
    maxAmount     : PropTypes.number,
    errors        : PropTypes.object,
    children      : PropTypes.any,
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
    allowEmpty : false,
    isSortable : false,
    maxAmount  : 0,
    noneText   : "",
    extraIcon  : "",
};

export default FieldInput;
