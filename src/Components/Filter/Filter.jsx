import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Ajax                 from "../../Core/Ajax";
import InputType            from "../../Core/InputType";
import NLS                  from "../../Core/NLS";
import DateTime             from "../../Utils/DateTime";
import KeyCode              from "../../Utils/KeyCode";
import Period               from "../../Utils/Period";
import Utils                from "../../Utils/Utils";

// Components
import FilterField          from "./FilterField";
import FilterDate           from "./FilterDate";
import ChipList             from "../Chip/ChipList";
import ChipItem             from "../Chip/ChipItem";
import InputOptions         from "../Input/InputOptions";
import InputOption          from "../Input/InputOption";
import MenuItem             from "../Menu/MenuItem";
import IconLink             from "../Link/IconLink";



// Styles
const Container = Styled.div`
    display: flex;
    gap: calc(var(--main-gap) / 2);
    box-sizing: border-box;
    height: var(--filter-input-size);
    margin: 0 0 var(--main-gap) 0;
    padding: 1px;
`;

const Search = Styled(FilterField)`
    flex-shrink: 0;
    width: 300px;
`;

const FilterIcon = Styled(IconLink)`
    --link-size: calc(var(--filter-input-size) - 8px);
    --link-radius: var(--border-radius);
    --link-background: var(--filter-input-hover);

    padding: 4px;
    font-size: 16px;
    background-color: var(--filter-input-background);
`;

const Chips = Styled(ChipList)`
    flex-grow: 2;
    flex-wrap: nowrap;
    margin-left: calc(var(--main-gap) / 2);
    overflow: auto;

    li {
        white-space: nowrap;
    }
`;



/**
 * The Filter Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Filter(props) {
    const { className, icon, message, values, showRefresh, onFilter, children } = props;

    // The References
    const inputRef       = React.useRef(null);
    const optionsRef     = React.useRef(null);
    const selectedRef    = React.useRef(-1);
    const selectedSubRef = React.useRef(-1);

    // The Current State
    const [ search,      setSearch      ] = React.useState("");
    const [ data,        setData        ] = React.useState({});
    const [ showOptions, setShowOptions ] = React.useState(false);
    const [ bounds,      setBounds      ] = React.useState({ top : 0, left : 0, width : 0, maxHeight : 0 });
    const [ showDates,   setShowDates   ] = React.useState(false);
    const [ datesName,   setDatesName   ] = React.useState("");
    const [ withHour,    setWithHour    ] = React.useState(false);
    const [ onlyHour,    setOnlyHour    ] = React.useState(false);
    const [ update,      setUpdate      ] = React.useState(0);


    // Parse the Items
    const childProps = Utils.getChildrenProps(children);
    const [ items, itemList ] = React.useMemo(() => {
        const items    = {};
        const itemList = [];
        const fields   = {};

        for (const child of childProps) {
            const options = InputType.getOptions(child);
            if (child.type === "period" && options.length) {
                options.unshift({
                    key   : Period.CUSTOM,
                    value : NLS.get("PERIOD_SELECT"),
                });
            }
            if (child.type === "select" && !options.length) {
                continue;
            }

            const item = {
                key           : child.name,
                type          : child.type,
                name          : child.name,
                icon          : child.icon,
                message       : NLS.get(child.label),
                options       : options,
                anyValue      : child.anyText ? (child.anyValue ?? -1) : 0,
                allowMultiple : Boolean(child.allowMultiple),
                dontClose     : Boolean(child.dontClose),
                withHour      : Boolean(child.withHour),
                onlyHour      : child.type === "time",
            };

            itemList.push(item);
            items[child.name]  = item;
            fields[child.name] = "";
            if (child.type === "period" || child.type === "date" || child.type === "time") {
                if (child.name === "period") {
                    fields.fromDate = "";
                    fields.fromHour = "";
                    fields.toDate   = "";
                    fields.toHour   = "";
                } else {
                    fields[`${child.name}FromDate`] = "";
                    fields[`${child.name}FromHour`] = "";
                    fields[`${child.name}ToDate`]   = "";
                    fields[`${child.name}ToHour`]   = "";
                }
            }
        }
        if (values) {
            for (const [ key, value ] of Object.entries(values)) {
                fields[key] = value;
            }
        }

        setData(fields);
        return [ items, itemList ];
    }, [ JSON.stringify(childProps), JSON.stringify(values) ]);


    // Shows the Dates Dialog
    const showDatesDialog = (name, withHour, onlyHour) => {
        window.setTimeout(() => {
            setDatesName(name);
            setWithHour(withHour);
            setOnlyHour(onlyHour);
            setShowDates(true);
        }, 100);
    };

    // Handles the Update
    const handleUpdate = (name, value) => {
        setSearch(value);
        selectedRef.current    = -1;
        selectedSubRef.current = -1;
    };

    // Handles the Select
    const handleSelect = (name, value) => {
        const item = items[name];
        if (!item) {
            return;
        }

        if ((item.type === "period" && (!item.options.length || value === Period.CUSTOM)) || item.type === "date" || item.type === "time") {
            showDatesDialog(name, item.withHour, item.onlyHour);
        } else {
            let newData  = {};
            let newValue = value;

            if (item.allowMultiple) {
                let currentValues = data[name] || [];
                let newValues     = [];
                if (newValue === item.anyValue) {
                    newValues = [ item.anyValue ];
                } else {
                    if (item.anyValue && currentValues.includes(item.anyValue)) {
                        currentValues = currentValues.filter((currValue) => currValue !== item.anyValue);
                    }
                    if (currentValues.includes(newValue)) {
                        newValues = currentValues.filter((currValue) => currValue !== newValue);
                    } else {
                        newValues = [ ...currentValues, newValue ];
                    }
                }
                newData = { ...data, [name] : newValues };
            } else {
                if (item.type === "number") {
                    newValue = newValue.replace("#", "");
                }
                if (item.type === "toggle") {
                    newValue = Number(data[name]) === 1 ? 0 : 1;
                }
                newData = { ...data, [name] : newValue };
            }
            setData(newData);
            handleFilter(newData);
        }

        setSearch("");
        if (!item.dontClose) {
            inputRef.current.blur();
        }
    };

    // Handles the Remove
    const handleRemove = (name, value) => {
        const item = items[name];
        if (!item) {
            return;
        }

        let newData = {};
        if (item.allowMultiple) {
            const currentValues = data[name] || [];
            const newValues     = currentValues.filter((val) => val !== value);
            newData = { ...data, [name] : newValues };
        } else if (item.type === "period" || item.type === "date") {
            if (name === "period") {
                newData = {
                    ...data,
                    [name]   : "",
                    fromDate : "",
                    fromHour : "",
                    toDate   : "",
                    toHour   : "",
                };
            } else {
                newData = {
                    ...data,
                    [name]              : "",
                    [`${name}FromDate`] : "",
                    [`${name}FromHour`] : "",
                    [`${name}ToDate`]   : "",
                    [`${name}ToHour`]   : "",
                };
            }
        } else {
            newData = { ...data, [name] : "" };
        }

        setData(newData);
        handleFilter(newData);
    };

    // Handles the Submit of the Dates Dialog
    const handleDates = (fromDate, fromHour, toDate, toHour) => {
        const item = items[datesName];
        let newData = {};
        if (datesName === "period") {
            newData = { ...data, fromDate, fromHour, toDate, toHour, period : Period.CUSTOM };
        } else {
            newData = {
                ...data,
                [datesName]              : item.type === "period" ? Period.CUSTOM : "",
                [`${datesName}FromDate`] : fromDate,
                [`${datesName}FromHour`] : fromHour,
                [`${datesName}ToDate`]   : toDate,
                [`${datesName}ToHour`]   : toHour,
            };
        }

        setShowDates(false);
        setData(newData);
        handleFilter(newData);
    };

    // Handles the Click on a Chip
    const handleChipClick = (name, forDates) => {
        const item = items[name];
        if (item && forDates) {
            showDatesDialog(name, item.withHour, item.onlyHour);
        }
    };

    // Handles the Refresh
    const handleRefresh = () => {
        handleFilter(data);
    };

    // Handles the Clear
    const handleClear = () => {
        setData({});
        handleFilter({});
    };

    // Handles the Refresh
    const handleFilter = (data) => {
        Ajax.abort();
        onFilter(data);
    };


    // Returns the Icon for the Item
    const getIcon = (name, value, isSubmenu) => {
        const item = items[name];
        if (!item) {
            return "";
        }
        if (item.type !== "toggle" && !isSubmenu) {
            return item.icon;
        }

        let hasValue = data[name] === value;
        if (item.allowMultiple) {
            const currentValues = data[name] || [];
            hasValue = currentValues.includes(value);
        }

        if (item.allowMultiple || item.type === "toggle") {
            return hasValue ? "checkbox-on" : "checkbox-off";
        }
        return hasValue ? "radio-on" : "radio-off";
    };


    // Handles the Focus
    const handleFocus = () => {
        const bounds = Utils.getBounds(inputRef);
        setBounds({
            top       : bounds.bottom + 6,
            left      : bounds.left - 32,
            width     : bounds.width,
            maxHeight : window.innerHeight - bounds.bottom - 10,
        });
        setShowOptions(true);
        selectedRef.current = -1;
    };

    // Handles the Blur
    const handleBlur = () => {
        setShowOptions(false);
        setSearch("");
        selectedRef.current    = -1;
        selectedSubRef.current = -1;
    };

    // Handles the Close
    const handleClose = () => {
        inputRef.current.blur();
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        if (e.keyCode === KeyCode.DOM_VK_RETURN) {
            return;
        }

        const item = optionList[selectedRef.current];
        if (item && item.options) {
            let newSubIndex = 0;
            let subHandled  = false;

            switch (e.keyCode) {
            case KeyCode.DOM_VK_RIGHT:
            case KeyCode.DOM_VK_RETURN:
                newSubIndex = 0;
                subHandled  = true;
                break;
            case KeyCode.DOM_VK_LEFT:
                newSubIndex = -1;
                subHandled  = true;
                break;
            default:
                if (selectedSubRef.current >= 0) {
                    [ newSubIndex, subHandled ] = Utils.handleKeyNavigation(e.keyCode, selectedSubRef.current, item.options.length);
                }
            }
            if (subHandled) {
                selectedSubRef.current = newSubIndex;
                setUpdate(update + 1);
                e.preventDefault();
                return;
            }
        }

        const [ newIndex, handled ] = Utils.handleKeyNavigation(e.keyCode, selectedRef.current, optionList.length);
        if (handled) {
            selectedRef.current = newIndex;
            e.preventDefault();
        }

        selectedSubRef.current = -1;
        scrollToIndex(selectedRef.current);
        setShowOptions(true);
        setUpdate(update + 1);
    };

    // Scrolls to the Index
    const scrollToIndex = (index) => {
        if (optionsRef.current && selectedSubRef.current < 0) {
            const elem = optionsRef.current.querySelector(`.input-option-${index}`);
            if (elem) {
                elem.scrollIntoView({
                    behavior : "instant",
                    block    : "nearest",
                });
            }
        }
    };

    // Handles the Key Up
    const handleKeyUp = (e) => {
        switch (e.keyCode) {
        case KeyCode.DOM_VK_ESCAPE:
            if (showOptions) {
                setShowOptions(false);
                e.stopPropagation();
            }
            break;
        case KeyCode.DOM_VK_RETURN: {
            const index  = Math.max(0, selectedRef.current);
            const option = optionList[index];
            if (option) {
                if (selectedSubRef.current >= 0) {
                    const subOption = option.options[selectedSubRef.current];
                    if (subOption) {
                        handleSelect(option.name, subOption.key);
                    }
                } else {
                    handleSelect(option.name, option.value);
                }
            }
            break;
        }
        default:
        }
        e.preventDefault();
    };


    // Generates the Options
    const optionList = React.useMemo(() => {
        const result = [];
        for (const item of itemList) {
            // Only show a text item if searching
            if (!item.type || item.type === "text" || item.type === "textarea" || item.type === "email") {
                if (search) {
                    result.push({
                        ...item,
                        value : search,
                        text  : `${NLS.get(item.message)} "${search}"`,
                    });
                }
                continue;
            }

            // Only show a number item if searching a number
            if (item.type === "number") {
                if (search && Utils.isNumeric(search.replace("#", ""))) {
                    result.push({
                        ...item,
                        value : search,
                        text  : `${NLS.get(item.message)} "${search}"`,
                    });
                }
                continue;
            }

            // If searching show the item options as main items
            if (search && item.options) {
                let added = false;
                for (const option of item.options || []) {
                    if (Utils.searchValue(option.value, search)) {
                        result.push({
                            key           : `${item.name}-${option.key}`,
                            name          : item.name,
                            value         : option.key,
                            icon          : item.icon,
                            message       : item.message,
                            text          : `${NLS.get(item.message)} "${option.value}"`,
                            options       : [],
                            allowMultiple : false,
                            dontClose     : false,
                            withHour      : false,
                        });
                        added = true;
                    }
                }
                if (added) {
                    continue;
                }
            }

            // Show the normal item if match the search
            if (Utils.searchValue(item.message, search)) {
                if (item.type === "toggle") {
                    result.push({ ...item, value : 1 });
                } else {
                    result.push({ ...item, value : "" });
                }
            }
        }
        return result;
    }, [ JSON.stringify(itemList), JSON.stringify(data), search ]);


    // Generates the Chips
    const chipList = React.useMemo(() => {
        const result = [];
        for (const [ name, value ] of Object.entries(data)) {
            const item = items[name];
            if (!item) {
                continue;
            }

            const values = Array.isArray(value) ? value : [ value ];
            for (const val of values) {
                let valueName = val;
                let forDates  = false;
                if ((item.type === "period" && val === Period.CUSTOM) || item.type === "date") {
                    forDates = true;

                    // @ts-ignore
                    let { fromDate, fromHour, toDate, toHour } = data;
                    let fromText = "";
                    let toText   = "";

                    if (name !== "period") {
                        fromDate = data[`${name}FromDate`];
                        fromHour = data[`${name}FromHour`];
                        toDate   = data[`${name}ToDate`];
                        toHour   = data[`${name}ToHour`];
                    }

                    fromText = fromDate ? DateTime.formatDate(fromDate, "dashes") : "";
                    toText   = toDate   ? DateTime.formatDate(toDate,   "dashes") : "";
                    if (item.withHour) {
                        fromText += fromHour ? `, ${fromHour}` : "";
                        toText   += toHour   ? `, ${toHour}`   : "";
                    }

                    if (fromText && toText) {
                        valueName = NLS.format("DATE_RANGE", fromText, toText);
                    } else if (fromText) {
                        valueName = NLS.format("DATE_FROM", fromText);
                    } else if (toText) {
                        valueName = NLS.format("DATE_TO", toText);
                    }
                } else if (item.type === "time") {
                    forDates = true;
                    const fromText = data[`${name}FromHour`] || "";
                    const toText   = data[`${name}ToHour`]   || "";

                    if (fromText && toText) {
                        valueName = NLS.format("DATE_RANGE", fromText, toText);
                    } else if (fromText) {
                        valueName = NLS.format("DATE_FROM", fromText);
                    } else if (toText) {
                        valueName = NLS.format("DATE_TO", toText);
                    }
                } else if (val && item.options) {
                    valueName = item.options.find((opt) => opt.key === val)?.value || val;
                }
                if (!valueName) {
                    continue;
                }

                let message = `<b>${item.message}</b>: ${valueName}`;
                if (item.type === "toggle") {
                    message = `<b>${item.message}</b>`;
                }

                result.push({
                    key      : `${name}-${val}`,
                    name     : name,
                    value    : val,
                    message  : message,
                    forDates : forDates,
                });
            }
        }
        return result;
    }, [ JSON.stringify(data) ]);

    // Checks if it has any Filter
    const hasAnyFilter = React.useMemo(() => {
        for (const value of Object.values(data)) {
            if (value && ((Array.isArray(value) && value.length) || (!Array.isArray(value)))) {
                return true;
            }
        }
        return false;
    }, [ JSON.stringify(data) ]);


    // variables
    const hasRefresh = showRefresh || hasAnyFilter;
    const hasOptions = Boolean(showOptions && optionList.length);


    // Do the Render
    return <>
        <Container className={className}>
            <Search
                passedRef={inputRef}
                type="text"
                name="search"
                icon={icon}
                placeholder={message}
                value={search}
                onUpdate={handleUpdate}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
            />
            <FilterIcon
                isHidden={!hasRefresh}
                variant="black"
                icon="refresh"
                onClick={handleRefresh}
            />
            <FilterIcon
                isHidden={!hasAnyFilter}
                variant="black"
                icon="filter-clear"
                onClick={handleClear}
            />

            <Chips>
                {chipList.map(({ key, name, value, message, forDates }) => <ChipItem
                    key={key}
                    message={message}
                    onClick={forDates ? () => handleChipClick(name, forDates) : undefined}
                    onClose={() => handleRemove(name, value)}
                />)}
            </Chips>
        </Container>

        {hasOptions && <InputOptions
            passedRef={optionsRef}
            inputRef={inputRef}
            top={bounds.top}
            left={bounds.left}
            width={bounds.width}
            maxHeight={bounds.maxHeight}
            minWidth={300}
            gap={4}
        >
            {optionList.map(({ key, name, value, text, message, options, dontClose }, index) => <InputOption
                key={key}
                className={`input-option-${index}`}
                icon={getIcon(name, value, false)}
                content={text || message}
                isSelected={selectedRef.current === index}
                onMouseDown={!options.length ? () => handleSelect(name, value) : undefined}
                onClose={handleClose}
            >
                {options.map((option, subIndex) => <MenuItem
                    key={option.key}
                    icon={getIcon(name, option.key, true)}
                    message={option.value}
                    isSelected={selectedSubRef.current === subIndex}
                    onClick={() => handleSelect(name, option.key)}
                    dontClose={dontClose}
                />)}
            </InputOption>)}
        </InputOptions>}

        <FilterDate
            open={showDates}
            withHour={withHour}
            onlyHour={onlyHour}
            currData={data}
            datesName={datesName}
            onSubmit={handleDates}
            onClose={() => setShowDates(false)}
        />
    </>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Filter.propTypes = {
    className   : PropTypes.string,
    icon        : PropTypes.string,
    message     : PropTypes.string,
    values      : PropTypes.object.isRequired,
    onFilter    : PropTypes.func.isRequired,
    showRefresh : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Filter.defaultProps = {
    className : "",
    icon      : "search",
    message   : "GENERAL_WRITE_TO_SEARCH_FILTER",
};

export default Filter;
