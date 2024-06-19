import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import KeyCode              from "../../Utils/KeyCode";

// Components
import InputContent         from "../Input/InputContent";
import InputBase            from "../Input/InputBase";
import Icon                 from "../Common/Icon";



// Styles
const Input = Styled(InputBase).attrs(({ isDisabled }) => ({ isDisabled }))`
    {(props) => !props.isDisabled && "cursor: pointer;"}
`;

const InputIcon = Styled(Icon)`
    margin-top: -4px;
    margin-right: -6px;
    font-size: 18px;
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
    overflow-x: hidden;
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
 * The Select Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SelectInput(props) {
    const {
        inputRef, className, icon, postIcon,
        isFocused, isDisabled, isSmall, withBorder, withLabel,
        id, name, value, placeholder,
        noneText, noneValue,
        withCustom, customFirst, customText,
        options, extraOptions, onChange, onClear, onFocus, onBlur,
    } = props;


    // The References
    const containerRef = React.useRef(null);
    const optionsRef   = React.useRef(null);

    // The Current State
    const [ filter,      setFilter      ] = React.useState("");
    const [ timer,       setTimer       ] = React.useState(null);
    const [ hasFocus,    setFocus       ] = React.useState(false);
    const [ bounds,      setBounds      ] = React.useState({ top : 0, left : 0, width : 0, maxHeight : 0 });
    const [ selectedIdx, setSelectedIdx ] = React.useState(-1);

    // Variables
    const valueKey   = String(value || noneValue);
    const items      = Array.isArray(options)      ? options      : NLS.select(options);
    const extraItems = Array.isArray(extraOptions) ? extraOptions : NLS.select(extraOptions);


    // Clear the Timer
    React.useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ timer ]);


    // Handles the Click
    const handleClick = () => {
        if (!hasFocus) {
            inputRef.current.focus();
        }
    };

    // Handles the Focus
    const handleFocus = () => {
        const node   = containerRef.current.closest(".inputfield-double") || containerRef.current;
        const bounds = node.getBoundingClientRect();
        setBounds({
            top       : bounds.bottom,
            left      : bounds.left,
            width     : bounds.width,
            maxHeight : window.innerHeight - bounds.bottom - 10,
        });
        const index = optionList.findIndex((option) => String(option.value) === valueKey) ?? -1;

        setSelectedIdx(index);
        setFocus(true);
        onFocus();

        setTimer(window.setTimeout(() => {
            scrollToIndex(index, true);
        }, 200));
    };

    // Handles the Blur
    const handleBlur = () => {
        setTimer(window.setTimeout(() => {
            triggerBlur();
            onBlur();
        }, 200));
    };

    // Handles the Blur
    const triggerBlur = () => {
        setFilter("");
        setFocus(false);
        setTimer(null);
    };

    // Handles the Input
    const handleInput = (e) => {
        setFilter(e.target.value);
    };

    // Handles the Select
    const handleSelect = (e, value) => {
        e.stopPropagation();
        onChange(name, value);
        triggerBlur();
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        switch (e.keyCode) {
        case KeyCode.DOM_VK_DOWN: {
            const newSelectedIdx = (selectedIdx + 1) % options.length;
            setSelectedIdx(newSelectedIdx);
            scrollToIndex(newSelectedIdx, false);
            e.preventDefault();
            break;
        }
        case KeyCode.DOM_VK_UP: {
            const newSelectedIdx = (selectedIdx - 1) < 0 ? options.length - 1 : selectedIdx - 1;
            setSelectedIdx(newSelectedIdx);
            scrollToIndex(newSelectedIdx, false);
            e.preventDefault();
            break;
        }
        default:
        }
    };

    // Handles the Key Up
    const handleKeyUp = (e) => {
        if (e.keyCode === KeyCode.DOM_VK_RETURN && optionList[selectedIdx]) {
            onChange(name, optionList[selectedIdx].value);
            triggerBlur();
        }
        e.preventDefault();
    };

    // Scrolls to the Index
    const scrollToIndex = (index, isInitial) => {
        if (optionsRef.current) {
            const elem = optionsRef.current.querySelector(`.input-option-${index}`);
            if (elem) {
                elem.scrollIntoView({
                    behavior : "instant",
                    block    : isInitial ? "center" : "nearest",
                });
            }
        }
    };


    // Get the Options List
    const optionList = React.useMemo(() => {
        const result = [];
        if (noneText) {
            result.push({ key : "none", value : noneValue, message : noneText });
        }
        if (withCustom && customFirst) {
            result.push({ key : "custom", value : -1, message : customText  || "GENERAL_CUSTOM" });
        }
        for (const { key, value } of items) {
            result.push({ key, value : key, message : value });
        }
        for (const { key, value } of extraItems) {
            result.push({ key, value : key, message : value });
        }
        if (withCustom && !customFirst) {
            result.push({ key : "custom", value : -1, message : customText || "GENERAL_CUSTOM" });
        }

        if (filter) {
            return result.filter(({ message }) => {
                return NLS.get(message).toLowerCase().includes(filter.toLowerCase());
            });
        }
        return result;
    }, [
        noneValue, noneText,
        withCustom, customFirst, customText,
        JSON.stringify(items), JSON.stringify(extraItems),
        filter,
    ]);

    // Get the Option Value
    const optionValue = React.useMemo(() => {
        let result = "";
        for (const item of optionList) {
            if (String(item.value) === valueKey) {
                result = item.message;
                break;
            }
        }
        return NLS.get(result);
    }, [ valueKey, JSON.stringify(optionList) ]);


    // Do the Render
    const showOptions = Boolean(hasFocus && optionList.length);

    return <InputContent
        passedRef={containerRef}
        className={className}
        icon={icon}
        postIcon={postIcon}
        isFocused={isFocused}
        isDisabled={isDisabled}
        isSmall={isSmall}
        onClick={handleClick}
        onClear={onClear}
        withBorder={withBorder}
        withLabel={withLabel}
        withPadding
    >
        <Input
            inputRef={inputRef}
            className="input-select"
            id={id}
            type="text"
            name={name}
            value={hasFocus ? filter : optionValue}
            placeholder={placeholder}
            isDisabled={isDisabled}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
        <InputIcon icon="expand" />

        {showOptions && <Options
            ref={optionsRef}
            top={bounds.top}
            left={bounds.left}
            width={bounds.width}
            maxHeight={bounds.maxHeight}
        >
            {optionList.map(({ key, value, message }, index) => <Option
                className={`input-option-${index}`}
                key={key}
                isSelected={selectedIdx === index}
                onMouseDown={(e) => handleSelect(e, value)}
            >
                {NLS.get(message)}
            </Option>)}
        </Options>}
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SelectInput.propTypes = {
    inputRef     : PropTypes.any,
    className    : PropTypes.string,
    icon         : PropTypes.string,
    postIcon     : PropTypes.string,
    isFocused    : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    isSmall      : PropTypes.bool,
    withBorder   : PropTypes.bool,
    withLabel    : PropTypes.bool,
    id           : PropTypes.string,
    name         : PropTypes.string.isRequired,
    placeholder  : PropTypes.string,
    value        : PropTypes.any,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noneText     : PropTypes.string,
    noneValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    withCustom   : PropTypes.bool,
    customFirst  : PropTypes.bool,
    customText   : PropTypes.string,
    onChange     : PropTypes.func.isRequired,
    onClear      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SelectInput.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    isSmall     : false,
    withBorder  : true,
    withLabel   : true,
    placeholder : "",
    noneText    : "",
    noneValue   : "",
    withCustom  : false,
    customFirst : false,
    customText  : "",
};

export default SelectInput;
