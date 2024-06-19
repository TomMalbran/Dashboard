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

const Options = Styled.ul.attrs(({ top, left, width, maxHeight }) => ({ top, left, width, maxHeight }))`
    box-sizing: border-box;
    display: block;
    position: fixed;
    top: ${(props) => `${props.top + 2}px`};
    left: ${(props) => `${props.left}px`};
    width: ${(props) => `${props.width}px`};
    max-height: ${(props) => `${props.maxHeight}px`};
    overflow: auto;
    min-width: 200px;
    margin: 0;
    padding: 8px;
    list-style: none;
    background-color: white;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    transform: translateY(2px);
    z-index: var(--z-input, 3);
`;

const Option = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
    margin: 0;
    padding: 8px;
    font-size: 14px;
    color: var(--title-color);
    border-radius: var(--border-radius);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: var(--light-gray);
    }

    ${(props) => props.isSelected && `
        background-color: var(--primary-color);
        color: white;
        &:hover {
            background-color: var(--primary-color);
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

    // The Current State
    const [ filter,      setFilter      ] = React.useState("");
    const [ timer,       setTimer       ] = React.useState(null);
    const [ hasFocus,    setFocus       ] = React.useState(false);
    const [ bounds,      setBounds      ] = React.useState({ top : 0, left : 0, width : 0, maxHeight : 0 });
    const [ selectedIdx, setSelectedIdx ] = React.useState(0);


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
        setSelectedIdx(0);
    };

    // Handles the Click
    const handleClick = () => {
        if (!hasFocus) {
            inputRef.current.focus();
        }
    };

    // Handles the Add
    const handleAdd = (e, key) => {
        e.stopPropagation();
        setValues(key);
        triggerBlur();
    };

    // Handles the Remove
    const handleRemove = (e, key) => {
        if (!isDisabled) {
            setValues(key);
            triggerBlur();
        }
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
        switch (e.keyCode) {
        case KeyCode.DOM_VK_DOWN: {
            const newSelectedIdx = (selectedIdx + 1) % options.length;
            setSelectedIdx(newSelectedIdx);
            e.preventDefault();
            break;
        }
        case KeyCode.DOM_VK_UP: {
            const newSelectedIdx = (selectedIdx - 1) < 0 ? options.length - 1 : selectedIdx - 1;
            setSelectedIdx(newSelectedIdx);
            e.preventDefault();
            break;
        }
        case KeyCode.DOM_VK_BACK_SPACE:
            if (!filter.length && values.length > 0) {
                setValues(values[values.length - 1]);
                e.preventDefault();
            }
            break;
        default:
        }
    };

    // Handles the Key Up
    const handleKeyUp = (e) => {
        if (e.keyCode === KeyCode.DOM_VK_RETURN && options[selectedIdx]) {
            setValues(options[selectedIdx].key);
        }
        e.preventDefault();
    };


    // Variables
    const options     = InputType.useOptions(props);
    const values      = !Array.isArray(value) ? [] : value;
    const showOptions = Boolean(hasFocus && options.length);


    // Get the Options List
    const optionList = React.useMemo(() => {
        const result = [];
        for (const item of options) {
            if (!Utils.hasValue(values, item.key) && (!filter || item.value.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))) {
                result.push(item);
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

        {showOptions && <Options
            top={bounds.top}
            left={bounds.left}
            width={bounds.width}
            maxHeight={bounds.maxHeight}
        >
            {optionList.map(({ key, value }, index) => <Option
                key={key}
                isSelected={selectedIdx === index}
                onMouseDown={(e) => handleAdd(e, key)}
            >
                {NLS.get(value)}
            </Option>)}
        </Options>}
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
};

export default ChooserInput;
