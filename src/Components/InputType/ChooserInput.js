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
    background-color: transparent;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAICAYAAAAIloRgAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAdElEQVQ4T2P4//8/AyGsLK8ggE8NIXmYXoIWgRQCDbuAy0CQOEiekINB8sRa9h+bhTCLgDTQLMIhRKxlIJ+hWIhsEbV9Bg4qJAsd0Ph445SkOIPGG7KFIF9iDVp8wUlUMMIMQA86YlMhyT5Ds3ABqRaB9AMArxAryYUamQYAAAAASUVORK5CYII=);
    background-position: right -6px center;
    background-size: auto;
    background-repeat: no-repeat;
`;

const Chip = Styled.li`
    padding: 2px 8px;
    font-size: 12px;
    background-color: var(--light-gray);
    border-radius: var(--border-radius);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: var(--lighter-gray);
    }
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
    z-index: 2;
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

    const containerRef = React.useRef(null);

    // The Current State
    const [ filter,      setFilter      ] = React.useState("");
    const [ timer,       setTimer       ] = React.useState(null);
    const [ hasFocus,    setFocus       ] = React.useState(false);
    const [ bounds,      setBounds      ] = React.useState({ top : 0, left : 0, width : 0, maxHeight : 0 });
    const [ selectedIdx, setSelectedIdx ] = React.useState(0);


    // Calculate the Values
    const items   = InputType.createOptions(props);
    const values  = !Array.isArray(value) ? [] : value;
    const options = [];
    const chips   = [];

    for (const key of values) {
        chips.push({ key, value : Utils.getValue(items, "key", key, "value") });
    }
    for (const item of items) {
        if (!Utils.hasValue(values, item.key) && (!filter || item.value.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))) {
            options.push(item);
        }
    }


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


    // Do the Render
    const showOptions = Boolean(hasFocus && options.length);

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
            >
                {value}
            </Chip>)}

            <li>
                <InputBase
                    inputRef={inputRef}
                    className={`input-chooser ${className}`}
                    id={id}
                    type="text"
                    name={name}
                    value={filter}
                    placeholder={placeholder}
                    isDisabled={isDisabled}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                />
            </li>
        </List>

        {showOptions && <Options
            top={bounds.top}
            left={bounds.left}
            width={bounds.width}
            maxHeight={bounds.maxHeight}
        >
            {options.map(({ key, value }, index) => <Option
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
    withNone     : PropTypes.bool,
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
    withNone    : false,
};

export default ChooserInput;
