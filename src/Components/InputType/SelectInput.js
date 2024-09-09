import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";

// Components
import InputContent         from "../Input/InputContent";
import InputBase            from "../Input/InputBase";
import InputOptions         from "../Input/InputOptions";
import InputOption          from "../Input/InputOption";
import Icon                 from "../Common/Icon";



// Styles
const Input = Styled(InputBase).attrs(({ isDisabled }) => ({ isDisabled }))`
    {(props) => !props.isDisabled && "cursor: pointer;"}
`;

const InputIcon = Styled(Icon).attrs(({ withLabel }) => ({ withLabel }))`
    margin-top: -4px;
    margin-right: -6px;
    font-size: 18px;

    ${(props) => props.withLabel ? `
        margin-top: -4px;
    ` : `
        margin-top: 0;
        margin-bottom: -4px;
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
        options, extraOptions,
        onChange, onClear, onFocus, onBlur, onSubmit,
    } = props;

    const initStyle = { top : 0, left : 0, width : 0, maxHeight : 0, opacity : 0 };


    // The References
    const containerRef = React.useRef(null);
    const optionsRef   = React.useRef(null);
    const selectedRef  = React.useRef(-1);

    // The Current State
    const [ initialIdx,  setInitialIdx  ] = React.useState(0);
    const [ showOptions, setShowOptions ] = React.useState(false);
    const [ filter,      setFilter      ] = React.useState("");
    const [ timer,       setTimer       ] = React.useState(null);
    const [ style,       setStyle       ] = React.useState({ ...initStyle });
    const [ update,      setUpdate      ] = React.useState(0);

    // Variables
    const valueKey   = String(value || noneValue);
    const items      = Array.isArray(options)      ? options      : NLS.select(options);
    const extraItems = Array.isArray(extraOptions) ? extraOptions : NLS.select(extraOptions);


    // Get the Options List
    const optionList = React.useMemo(() => {
        const result = [];
        if (noneText) {
            result.push({
                key     : "none",
                value   : noneValue,
                message : NLS.get(noneText),
            });
        }
        if (withCustom && customFirst) {
            result.push({
                key     : "custom",
                value   : -1,
                message : NLS.get(customText  || "GENERAL_CUSTOM"),
            });
        }
        for (const { key, value } of items) {
            result.push({
                key     : `item-${key}`,
                value   : key,
                message : NLS.get(value),
            });
        }
        for (const { key, value } of extraItems) {
            result.push({
                key     : `extra-${key}`,
                value   : key,
                message : NLS.get(value),
            });
        }
        if (withCustom && !customFirst) {
            result.push({
                key     : "custom",
                value   : -1,
                message : NLS.get(customText || "GENERAL_CUSTOM"),
            });
        }

        if (!filter) {
            return result;
        }

        const filtered = [];
        const search   = Utils.convertToSearch(filter);
        for (const item of result) {
            const text      = item.message;
            const parts     = text.split(" ");
            let   fromIndex = 0;
            for (const part of parts) {
                const searchText = text.substring(text.indexOf(part));
                if (Utils.convertToSearch(searchText).startsWith(search)) {
                    const pos = Utils.convertToSearch(text).indexOf(search, fromIndex);
                    filtered.push({
                        ...item,
                        text : `${text.substring(0, pos)}<u>${text.substring(pos, pos + search.length)}</u>${text.substring(pos + search.length)}`,
                    });
                    break;
                }
                fromIndex += part.length + 1;
            }
        }
        return filtered;
    }, [
        noneValue, noneText,
        withCustom, customFirst, customText,
        JSON.stringify(items), JSON.stringify(extraItems),
        filter,
    ]);
    const hasOptions = Boolean(showOptions && optionList.length);

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


    // Clear the Timer
    React.useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ timer ]);

    // Sets the Selected Index
    const setSelectedIndex = (value) => {
        selectedRef.current = optionList.findIndex((option) => String(option.value) === String(value)) ?? -1;
    };


    // Handles the Click
    const handleClick = () => {
        if (!showOptions) {
            inputRef.current.focus();
            setShowOptions(true);
        }
    };

    // Handles the Focus
    const handleFocus = () => {
        setStyle({ ...initStyle });
        setSelectedIndex(valueKey);
        setInitialIdx(selectedRef.current);
        onFocus();
    };

    // Handle the After Focus
    React.useEffect(() => {
        if (!hasOptions || !containerRef.current || !optionsRef.current) {
            return;
        }

        const node    = containerRef.current.closest(".inputfield-double") || containerRef.current;
        const bounds  = node.getBoundingClientRect();
        const options = optionsRef.current.getBoundingClientRect();

        const left    = bounds.left;
        const width   = bounds.width;
        const height  = options.height;

        let top       = bounds.bottom;
        let maxHeight = window.innerHeight - bounds.bottom - 10;

        if (top + 50 > window.innerHeight) {
            top       = bounds.top - height - 5;
            maxHeight = height;
        }

        setStyle({ top, left, width, maxHeight, opacity : 1 });
        scrollToIndex(selectedRef.current, true);
    }, [ hasOptions, optionsRef.current ]);

    // Handles the Blur
    const handleBlur = () => {
        setTimer(window.setTimeout(() => {
            if (selectedRef.current >= 0 && optionList[selectedRef.current] && selectedRef.current !== initialIdx) {
                onChange(name, optionList[selectedRef.current].value);
            }

            setFilter("");
            setShowOptions(false);
            setTimer(null);
            onBlur();
        }, 200));
    };

    // Handles the Input
    const handleInput = (e) => {
        setFilter(e.target.value);
    };

    // Handles the Select
    const handleSelect = (e, value) => {
        e.stopPropagation();
        setSelectedIndex(value);
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        const specialKeys = [
            KeyCode.DOM_VK_ESCAPE, KeyCode.DOM_VK_TAB,
            KeyCode.DOM_VK_SHIFT, KeyCode.DOM_VK_CONTROL,
            KeyCode.DOM_VK_META, KeyCode.DOM_VK_ALT,
            KeyCode.DOM_VK_RETURN, KeyCode.DOM_VK_ENTER,
        ];
        if (specialKeys.includes(e.keyCode)) {
            return;
        }

        const selectedIdx    = selectedRef.current;
        let   newSelectedIdx = 0;

        switch (e.keyCode) {
        case KeyCode.DOM_VK_SPACE:
            if (!filter) {
                e.preventDefault();
            }
            break;

        case KeyCode.DOM_VK_UP:
            newSelectedIdx = (selectedIdx - 1) < 0 ? optionList.length - 1 : selectedIdx - 1;
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_DOWN:
            newSelectedIdx = (selectedIdx + 1) % optionList.length;
            e.preventDefault();
            break;

        case KeyCode.DOM_VK_HOME:
            newSelectedIdx = 0;
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_END:
            newSelectedIdx = optionList.length - 1;
            e.preventDefault();
            break;

        case KeyCode.DOM_VK_PAGE_UP:
            if (selectedIdx === 0) {
                newSelectedIdx = optionList.length - 1;
            } else if (selectedIdx - 5 < 0) {
                newSelectedIdx = 0;
            } else {
                newSelectedIdx = selectedIdx - 5;
            }
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_PAGE_DOWN:
            if (selectedIdx === optionList.length - 1) {
                newSelectedIdx = 0;
            } else if (selectedIdx + 5 >= optionList.length) {
                newSelectedIdx = optionList.length - 1;
            } else {
                newSelectedIdx = selectedIdx + 5;
            }
            e.preventDefault();
            break;

        default:
        }

        setShowOptions(true);
        scrollToIndex(newSelectedIdx, false);
        selectedRef.current = newSelectedIdx;
        setUpdate(update + 1);
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

        case KeyCode.DOM_VK_RETURN:
            if (!showOptions) {
                if (onSubmit) {
                    onSubmit();
                }
                return;
            }

            if (optionList[selectedRef.current]) {
                onChange(name, optionList[selectedRef.current].value);
                setShowOptions(false);
            } else if (optionList[0]) {
                onChange(name, optionList[0].value);
                setShowOptions(false);
            }
            break;

        default:
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


    // Do the Render
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
            value={showOptions ? filter : optionValue}
            placeholder={placeholder}
            isDisabled={isDisabled}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
        <InputIcon
            icon="expand"
            withLabel={withLabel}
        />

        {hasOptions && <InputOptions
            passedRef={optionsRef}
            top={style.top}
            left={style.left}
            width={style.width}
            maxHeight={style.maxHeight}
            opacity={style.opacity}
        >
            {optionList.map(({ key, value, text, message }, index) => <InputOption
                key={key}
                className={`input-option-${index}`}
                content={text || message}
                isSelected={selectedRef.current === index}
                onMouseDown={(e) => handleSelect(e, value)}
            />)}
        </InputOptions>}
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
    onSubmit     : PropTypes.func,
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
