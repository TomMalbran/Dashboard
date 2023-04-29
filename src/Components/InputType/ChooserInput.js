import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";



// Styles
const Container = Styled.div.attrs(({ hasLabel, labelInside }) => ({ hasLabel, labelInside }))`
    box-sizing: border-box;
    width: 100%;
    padding: 4px 8px;
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
    color: var(--black-color);
    background-color: transparent;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAICAYAAAAIloRgAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAdElEQVQ4T2P4//8/AyGsLK8ggE8NIXmYXoIWgRQCDbuAy0CQOEiekINB8sRa9h+bhTCLgDTQLMIhRKxlIJ+hWIhsEbV9Bg4qJAsd0Ph445SkOIPGG7KFIF9iDVp8wUlUMMIMQA86YlMhyT5Ds3ABqRaB9AMArxAryYUamQYAAAAASUVORK5CYII=);
    background-position: right center;
    background-size: auto;
    background-repeat: no-repeat;

    &:hover {
        border-color: var(--border-color);
    }

    ${(props) => props.hasLabel && props.labelInside && `
        & {
            min-height: calc(var(--input-height) + 7px);
            padding-top: 18px !important;
        }
    `}
`;

const List = Styled.ul`
    display: flex;
    flex-grow: 2;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 4px;
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

const Input = Styled.input`
    border: none;
    width: 100%;
    margin: 0;
    background: none;

    &:focus {
        outline: none;
    }
`;

const Options = Styled.ul.attrs(({ top, left, width, maxHeight }) => ({ top, left, width, maxHeight }))`
    box-sizing: border-box;
    display: block;
    position: fixed;
    top: ${(props) => `${props.top}px`};
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
        className, inputRef, id, name, value, placeholder, isDisabled,
        onChange, onFocus, onBlur, hasLabel, labelInside,
    } = props;

    const containerRef = React.useRef(null);

    const [ filter,      setFilter      ] = React.useState("");
    const [ timer,       setTimer       ] = React.useState(null);
    const [ isFocused,   setFocus       ] = React.useState(false);
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
        inputRef.current.focus();
    };

    // Handles the Add
    const handleAdd = (key) => {
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
        if (onFocus) {
            onFocus();
        }
    };

    // Handles the Blur
    const handleBlur = () => {
        setTimer(window.setTimeout(() => {
            setFilter("");
            triggerBlur();
            if (onBlur) {
                onBlur();
            }
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
    const showOptions = Boolean(isFocused && options.length);

    return <Container
        ref={containerRef}
        hasLabel={hasLabel}
        labelInside={labelInside}
        onClick={handleClick}
    >
        <List>
            {chips.map(({ key, value }) => <Chip
                key={key}
                onClick={(e) => handleRemove(e, key)}
            >
                {value}
            </Chip>)}

            <li>
                <Input
                    className={`input-chooser ${className}`}
                    id={id}
                    ref={inputRef}
                    type="text"
                    name={name}
                    value={filter}
                    placeholder={NLS.get(placeholder)}
                    disabled={isDisabled}
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
                onClick={() => handleAdd(key)}
            >
                {NLS.get(value)}
            </Option>)}
        </Options>}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ChooserInput.propTypes = {
    className    : PropTypes.string,
    id           : PropTypes.string,
    name         : PropTypes.string,
    value        : PropTypes.any,
    placeholder  : PropTypes.string,
    isDisabled   : PropTypes.bool,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    hasLabel     : PropTypes.bool,
    labelInside  : PropTypes.bool,
    onChange     : PropTypes.func,
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
    placeholder : "",
    isDisabled  : false,
    withNone    : false,
};

export default ChooserInput;
