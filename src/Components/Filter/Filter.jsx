import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
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
    gap: var(--main-gap);
    box-sizing: border-box;
    height: var(--filter-input-size);
    margin: 0 0 var(--main-gap) 0;
    padding: var(--filter-padding);
`;

const Search = Styled(FilterField)`
    flex-shrink: 0;
    width: 300px;
`;

const ClearIcon = Styled(IconLink)`
    --link-size: calc(var(--filter-input-size) - 8px);
    --link-radius: var(--border-radius);
    --link-background: var(--filter-input-hover);

    margin-left: -6px;
    padding: 4px;
    font-size: 16px;
    background-color: var(--filter-input-background);
`;

const Chips = Styled(ChipList)`
    flex-grow: 2;
    flex-wrap: nowrap;
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
    const { className, icon, message, values, onFilter, children } = props;

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
    const [ withHour,    setWithHour    ] = React.useState(false);
    const [ update,      setUpdate      ] = React.useState(0);


    // Parse the Items
    const childProps = Utils.getChildrenProps(children);
    const items      = React.useMemo(() => {
        const items  = {};
        const fields = {};
        for (const child of childProps) {
            let options = [];
            if (Array.isArray(child.options)) {
                options = Utils.clone(child.options);
            } else if (typeof child.options === "string") {
                options = NLS.select(child.options);
            }
            if (child.type === "period" && options.length) {
                options.unshift({
                    key   : Period.CUSTOM,
                    value : NLS.get("PERIOD_SELECT"),
                });
            }
            if (child.type === "select" && !options.length) {
                continue;
            }

            items[child.name] = {
                key           : child.name,
                type          : child.type,
                name          : child.name,
                icon          : child.icon,
                message       : NLS.get(child.label),
                options       : options,
                allowMultiple : child.allowMultiple,
                withHour      : child.withHour,
            };

            fields[child.name] = "";
            if (child.type === "period") {
                fields.fromDate = "";
                fields.toDate   = "";
            }
        }
        if (values) {
            for (const [ key, value ] of Object.entries(values)) {
                fields[key] = value;
            }
        }

        setData(fields);
        return items;
    }, [ JSON.stringify(childProps), JSON.stringify(values) ]);


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

        if (item.type === "period" && (!item.options.length || value === Period.CUSTOM)) {
            window.setTimeout(() => {
                setShowDates(true);
                setWithHour(item.withHour);
            }, 100);
        } else {
            let newData  = {};
            let newValue = value;

            if (item.allowMultiple) {
                const currentValues = data[name] || [];
                let   newValues     = [];
                if (currentValues.includes(newValue)) {
                    newValues = currentValues.filter((currValue) => currValue !== newValue);
                } else {
                    newValues = [ ...currentValues, newValue ];
                }
                newData = { ...data, [name] : newValues };
            } else {
                if (item.type === "number") {
                    newValue = newValue.replace("#", "");
                }
                newData = { ...data, [name] : newValue };
            }
            setData(newData);
            onFilter(newData);
        }

        setSearch("");
        inputRef.current.blur();
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
        } else if (item.type === "period") {
            newData = {
                ...data,
                [name]   : "",
                fromDate : "",
                fromHour : "",
                toDate   : "",
                toHour   : "",
            };
        } else {
            newData = { ...data, [name] : "" };
        }

        setData(newData);
        onFilter(newData);
    };

    // Handles the Submit of the Dates Dialog
    const handleDates = (fromDate, fromHour, toDate, toHour) => {
        const newData = { ...data, fromDate, fromHour, toDate, toHour, period : Period.CUSTOM };
        setShowDates(false);
        setData(newData);
        onFilter(newData);
    };

    // Handles the Clear
    const handleClear = () => {
        setData({});
        onFilter({});
    };

    // Returns the Icon for the Item
    const getIcon = (name, value, isSubmenu) => {
        const item = items[name];
        if (item.type !== "toggle" && !isSubmenu) {
            return item.icon;
        }

        let hasValue = data[name] === value;
        if (item.allowMultiple) {
            const currentValues = data[name] || [];
            hasValue = currentValues.includes(value);
        }
        return hasValue ? "checkbox-on" : "checkbox-off";
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


    // Checks if it has any Filter
    const hasAnyFilter = React.useMemo(() => {
        for (const value of Object.values(data)) {
            if (value && ((Array.isArray(value) && value.length) || (!Array.isArray(value)))) {
                return true;
            }
        }
        return false;
    }, [ JSON.stringify(data) ]);


    // Generates the Options
    const optionList = React.useMemo(() => {
        const result = [];
        for (const item of Object.values(items)) {
            // Only show a text item if searching
            if (!item.type || item.type === "text") {
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
                            key   : `${item.name}-${option.key}`,
                            name  : item.name,
                            value : option.key,
                            icon  : item.icon,
                            text  : `${NLS.get(item.message)} "${option.value}"`,
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
                    result.push(item);
                }
            }
        }
        return result;
    }, [ JSON.stringify(items), JSON.stringify(data), search ]);


    // Generates the Chips
    const chipList = React.useMemo(() => {
        const result = [];
        for (const [ name, value ] of Object.entries(data)) {
            const item = items[name];
            if (!value || !item) {
                continue;
            }

            const values = Array.isArray(value) ? value : [ value ];
            for (const val of values) {
                let valueName = val;
                if (item.type === "period" && val === Period.CUSTOM) {
                    // @ts-ignore
                    const { fromDate, fromHour, toDate, toHour } = data;

                    let fromText = fromDate ? DateTime.formatDate(fromDate, "dashes") : "";
                    let toText   = toDate   ? DateTime.formatDate(toDate,   "dashes") : "";

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
                } else if (item.options) {
                    valueName = item.options.find((opt) => opt.key === val)?.value || val;
                }

                let message = `<b>${item.message}</b>: ${valueName}`;
                if (item.type === "toggle") {
                    message = `<b>${item.message}</b>`;
                }

                result.push({
                    key     : `${name}-${val}`,
                    name    : name,
                    value   : val,
                    message : message,
                });
            }
        }
        return result;
    }, [ JSON.stringify(data) ]);


    // Do the Render
    const hasOptions = Boolean(showOptions && optionList.length);

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
            <ClearIcon
                isHidden={!hasAnyFilter}
                variant="black"
                icon="filter-clear"
                onClick={handleClear}
            />

            <Chips>
                {chipList.map(({ key, name, value, message }) => <ChipItem
                    key={key}
                    message={message}
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
        >
            {optionList.map(({ key, name, value, text, message, options }, index) => <InputOption
                key={key}
                className={`input-option-${index}`}
                icon={getIcon(name, value, false)}
                content={text || message}
                isSelected={selectedRef.current === index}
                onMouseDown={() => handleSelect(name, value)}
                onClose={handleClose}
            >
                {options?.map((option, subIndex) => <MenuItem
                    key={option.key}
                    icon={getIcon(name, option.key, true)}
                    message={option.value}
                    isSelected={selectedSubRef.current === subIndex}
                    onClick={() => handleSelect(name, option.key)}
                />)}
            </InputOption>)}
        </InputOptions>}

        <FilterDate
            open={showDates}
            withHour={withHour}
            currData={data}
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
    className : PropTypes.string,
    icon      : PropTypes.string,
    message   : PropTypes.string,
    values    : PropTypes.object.isRequired,
    onFilter  : PropTypes.func.isRequired,
    children  : PropTypes.any,
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
