import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";

// Components
import InputContent         from "../Input/InputContent";
import InputBase            from "../Input/InputBase";
import InputOptions         from "../Input/InputOptions";
import InputOption          from "../Input/InputOption";
import Icon                 from "../Common/Icon";



// Styles
const List = Styled.ul`
    display: flex;
    flex-grow: 2;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 4px;
    width: 100%;
`;

const InputIcon = Styled(Icon)`
    margin-top: -4px;
    margin-right: -6px;
    font-size: 18px;
`;

const Chip = Styled.li.attrs(({ isDisabled }) => ({ isDisabled }))`
    padding: 2px 8px;
    font-size: 12px;
    background-color: var(--light-gray);
    border-radius: var(--border-radius);
    transition: all 0.2s;

    ${(props) => !props.isDisabled && `
        cursor: pointer;
        &:hover {
            background-color: var(--lighter-gray);
        }
    `}
`;



/**
 * The Chooser Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ChooserInput(props) {
    const {
        inputRef, className, isFocused, isDisabled,
        id, name, value, placeholder,
        onChange, onClear, onFocus, onBlur,
    } = props;


    // The References
    const containerRef = React.useRef(null);
    const optionsRef   = React.useRef(null);
    const selectedRef  = React.useRef(0);

    // The Current State
    const [ filter,   setFilter ] = React.useState("");
    const [ timer,    setTimer  ] = React.useState(null);
    const [ hasFocus, setFocus  ] = React.useState(false);
    const [ bounds,   setBounds ] = React.useState({ top : 0, left : 0, width : 0, maxHeight : 0 });
    const [ update,   setUpdate ] = React.useState(0);


    // Clear the Timer
    React.useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ timer ]);


    // Sets the Values
    const setValues = (key) => {
        const pos = values.indexOf(key);
        if (pos > -1) {
            values.splice(pos, 1);
        } else {
            values.push(key);
        }
        onChange(name, values);
        setFilter("");
        selectedRef.current = 0;
    };

    // Handles the Click
    const handleClick = () => {
        if (!hasFocus) {
            inputRef.current.focus();
        }
    };

    // Handles the Add
    const handleAdd = (e, key) => {
        if (isDisabled) {
            return;
        }
        e.stopPropagation();
        setValues(key);
        triggerBlur();
    };

    // Handles the Remove
    const handleRemove = (e, key) => {
        if (isDisabled) {
            return;
        }
        e.stopPropagation();
        setValues(key);
        triggerBlur();
    };

    // Handles the Focus
    const handleFocus = () => {
        const bounds = Utils.getBounds(containerRef);
        setBounds({
            top       : bounds.bottom,
            left      : bounds.left,
            width     : bounds.width,
            maxHeight : window.innerHeight - bounds.bottom - 10,
        });
        setFocus(true);
        onFocus();
        selectedRef.current = 0;
    };

    // Handles the Blur
    const handleBlur = () => {
        setTimer(window.setTimeout(() => {
            setFilter("");
            triggerBlur();
            onBlur();
        }, 200));
    };

    // Handles the Blur
    const triggerBlur = () => {
        setFocus(false);
        setTimer(null);
    };

    // Handles the Input
    const handleInput = (e) => {
        setFilter(e.target.value);
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        let newSelectedIdx = 0;

        switch (e.keyCode) {
        case KeyCode.DOM_VK_DOWN:
            newSelectedIdx = (selectedRef.current + 1) % optionList.length;
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_UP:
            newSelectedIdx = (selectedRef.current - 1) < 0 ? optionList.length - 1 : selectedRef.current - 1;
            e.preventDefault();
            break;

        case KeyCode.DOM_VK_HOME:
            newSelectedIdx = 0;
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_END:
            newSelectedIdx = options.length - 1;
            e.preventDefault();
            break;

        case KeyCode.DOM_VK_PAGE_UP:
            if (selectedRef.current === 0) {
                newSelectedIdx = options.length - 1;
            } else if (selectedRef.current - 5 < 0) {
                newSelectedIdx = 0;
            } else {
                newSelectedIdx = selectedRef.current - 5;
            }
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_PAGE_DOWN:
            if (selectedRef.current === options.length - 1) {
                newSelectedIdx = 0;
            } else if (selectedRef.current + 5 >= options.length) {
                newSelectedIdx = options.length - 1;
            } else {
                newSelectedIdx = selectedRef.current + 5;
            }
            e.preventDefault();
            break;

        case KeyCode.DOM_VK_BACK_SPACE:
            if (!filter.length && values.length > 0) {
                setValues(values[values.length - 1]);
                e.preventDefault();
            }
            break;
        default:
        }

        scrollToIndex(newSelectedIdx);
        selectedRef.current = newSelectedIdx;
        setUpdate(update + 1);
    };

    // Handles the Key Up
    const handleKeyUp = (e) => {
        switch (e.keyCode) {
        case KeyCode.DOM_VK_ESCAPE:
            if (showOptions) {
                setFocus(false);
                e.stopPropagation();
            }
            break;
        case KeyCode.DOM_VK_RETURN:
            if (optionList[selectedRef.current]) {
                setValues(optionList[selectedRef.current].key);
            }
            break;
        default:
        }
        e.preventDefault();
    };

    // Scrolls to the Index
    const scrollToIndex = (index) => {
        if (optionsRef.current) {
            const elem = optionsRef.current.querySelector(`.input-chooser-${index}`);
            if (elem) {
                elem.scrollIntoView({
                    behavior : "instant",
                    block    : "nearest",
                });
            }
        }
    };


    // Variables
    const options     = InputType.useOptions(props);
    const values      = !Array.isArray(value) ? [] : value;
    const showOptions = Boolean(hasFocus && options.length);


    // Get the Options List
    const optionList = React.useMemo(() => {
        const search = Utils.convertToSearch(filter);
        const result = [];
        for (const item of options) {
            if (Utils.hasValue(values, item.key)) {
                continue;
            }
            if (!filter) {
                result.push(item);
                continue;
            }

            const text      = item.value;
            const parts     = text.split(" ");
            let   fromIndex = 0;
            for (const part of parts) {
                const searchText = text.substring(text.indexOf(part));
                if (Utils.convertToSearch(searchText).startsWith(search)) {
                    const pos = Utils.convertToSearch(text).indexOf(search, fromIndex);
                    result.push({
                        ...item,
                        text : `${text.substring(0, pos)}<u>${text.substring(pos, pos + search.length)}</u>${text.substring(pos + search.length)}`,
                    });
                    break;
                }
                fromIndex += part.length + 1;
            }
        }
        return result;
    }, [ JSON.stringify(values), JSON.stringify(options), filter ]);

    // Get the Chips
    const chips = React.useMemo(() => {
        const result = [];
        for (const key of values) {
            result.push({ key, value : Utils.getValue(options, "key", key, "value") });
        }
        return result;
    }, [ JSON.stringify(values), JSON.stringify(options) ]);


    // Do the Render
    const hasOptions = Boolean(showOptions && optionList.length);

    return <InputContent
        passedRef={containerRef}
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        onClick={handleClick}
        onClear={onClear}
        withBorder
        withPadding
        withLabel
    >
        <List>
            {chips.map(({ key, value }) => <Chip
                key={key}
                onClick={(e) => handleRemove(e, key)}
                isDisabled={isDisabled}
            >
                {value}
            </Chip>)}

            {!isDisabled && <li>
                <InputBase
                    inputRef={inputRef}
                    className="input-chooser"
                    id={id}
                    type="text"
                    name={name}
                    value={filter}
                    placeholder={placeholder}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                />
            </li>}
        </List>
        <InputIcon icon="expand" />

        {hasOptions && <InputOptions
            passedRef={optionsRef}
            top={bounds.top}
            left={bounds.left}
            width={bounds.width}
            maxHeight={bounds.maxHeight}
        >
            {optionList.map(({ key, value, text }, index) => <InputOption
                key={key}
                className={`input-chooser-${index}`}
                content={text || NLS.get(value)}
                isSelected={selectedRef.current === index}
                onMouseDown={(e) => handleAdd(e, key)}
            />)}
        </InputOptions>}
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ChooserInput.propTypes = {
    className    : PropTypes.string,
    isFocused    : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    id           : PropTypes.string,
    name         : PropTypes.string,
    value        : PropTypes.any,
    placeholder  : PropTypes.string,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noneText     : PropTypes.string,
    noneValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange     : PropTypes.func,
    onClear      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    inputRef     : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ChooserInput.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    placeholder : "",
    noneText    : "",
};

export default ChooserInput;
