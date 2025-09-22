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
import ChipList             from "../Chip/ChipList";
import ChipItem             from "../Chip/ChipItem";



// Styles
const EditItem = Styled.li`
    flex-grow: 2;
`;



/**
 * The Emails Input Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function EmailsInput(props) {
    const {
        inputRef, className, icon, postIcon, isFocused, isDisabled,
        isSmall, withBorder, withLabel,
        id, name, value, placeholder, emptyText, searchText,
        options, suggestFetch, suggestParams,
        onChange, onClear, onFocus, onBlur,
    } = props;


    // The References
    const containerRef = React.useRef(null);
    const optionsRef   = React.useRef(null);
    const selectedRef  = React.useRef(-1);
    const timerRef     = React.useRef(null);

    // The Current State
    const [ showOptions, setShowOptions ] = React.useState(false);
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ text,        setText        ] = React.useState("");
    const [ timer,       setTimer       ] = React.useState(null);
    const [ bounds,      setBounds      ] = React.useState({ top : 0, left : 0, width : 0, maxHeight : 0 });
    const [ searching,   setSearching   ] = React.useState(false);
    const [ update,      setUpdate      ] = React.useState(0);


    // Clear the Timer
    React.useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ timer ]);


    // Sets the Values
    const setValues = (key, onlyAdd = false) => {
        const pos = values.indexOf(key);
        if (pos > -1 && !onlyAdd) {
            values.splice(pos, 1);
        } else if (pos === -1) {
            values.push(key);
        }
        onChange(name, values);
        setText("");
        selectedRef.current = 0;
    };

    // Returns true if it should search
    const shouldSearch = (text) => {
        return text.length > 1;
    };


    // Handles the Click
    const handleClick = () => {
        if (!showOptions) {
            inputRef.current.focus();
            setShowOptions(true);
        }
    };

    // Handles the Add
    const handleAdd = (e, key) => {
        if (isDisabled) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        inputRef.current.focus();
        selectElem(key);
    };

    // Handles the Remove
    const handleRemove = (key) => {
        if (isDisabled) {
            return;
        }
        setValues(key);
        inputRef.current.focus();
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
        onFocus();
        selectedRef.current = 0;
    };

    // Handles the Blur
    const handleBlur = () => {
        setTimer(window.setTimeout(() => {
            setShowOptions(false);
            setText("");
            setSuggestions([]);
            setTimer(null);
            onBlur();
        }, 200));
    };

    // Handles the Input
    const handleInput = (e) => {
        setTextValue(e.target.value);
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        if (e.keyCode === KeyCode.DOM_VK_TAB && !text.length) {
            e.preventDefault();
        }

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

        case KeyCode.DOM_VK_BACK_SPACE:
            if (!text.length && values.length > 0) {
                setValues(values[values.length - 1]);
                setUpdate(update + 1);
            }
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

        case KeyCode.DOM_VK_TAB:
        case KeyCode.DOM_VK_RETURN: {
            if (optionList[selectedRef.current]) {
                const elem = optionList[selectedRef.current];
                selectElem(elem.title);
            } else {
                const email = text.trim();
                if (Utils.isValidEmail(email)) {
                    setValues(email, true);
                    setText("");
                }
                if (email.length) {
                    e.preventDefault();
                }
            }
            break;
        }
        default:
        }
        e.preventDefault();
    };

    // Handles the paste
    const handlePaste = (e) => {
        e.preventDefault();

        const paste  = e.clipboardData.getData("text");
        const emails = paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g);
        for (const email of emails) {
            setValues(email);
        }
    };


    // Sets the Text
    const setTextValue = async (newText) => {
        setText(newText);
        if (suggestFetch && text !== newText && value !== newText) {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
                setSearching(false);
            }

            if (shouldSearch(newText)) {
                setSearching(true);
                timerRef.current = window.setTimeout(() => {
                    fetchValue(newText);
                }, 1000);
            } else {
                setSuggestions([]);
            }
        }
    };

    // Does the Actual Fetch
    const fetchValue = async (value) => {
        const fetchedSuggestions = await suggestFetch({ value, ...suggestParams || {} });
        setSearching(false);

        if (fetchedSuggestions && Array.isArray(fetchedSuggestions)) {
            selectedRef.current = 0;
            const filteredSuggestions = fetchedSuggestions.filter((elem) => !values.includes(elem.title));
            const parsedSuggestions   = Utils.parseSearchResult(filteredSuggestions, value, "title", false);
            setSuggestions(parsedSuggestions);
        }
    };

    // Selects the Elem
    const selectElem = (newValue) => {
        setValues(newValue, true);
        setText("");

        const filteredSuggestions = suggestions.filter((elem) => elem.title !== newValue);
        setSuggestions(filteredSuggestions);
    };

    // Scrolls to the Index
    const scrollToIndex = (index, isInitial) => {
        if (optionsRef.current) {
            const elem = optionsRef.current.querySelector(`.input-suggestion-${index}`);
            if (elem) {
                elem.scrollIntoView({
                    behavior : "instant",
                    block    : isInitial ? "center" : "nearest",
                });
            }
        }
    };


    // Get the Values
    const values = React.useMemo(() => !Array.isArray(value) ? [] : value, [ value ]);

    // Get the Options List
    const optionList = React.useMemo(() => {
        if (suggestions.length) {
            return suggestions;
        }
        if (!text.length && options.length) {
            return options.filter((item) => !values.includes(item)).map((item) => ({ text : item, title : item }));
        }
        return [];
    }, [ text, JSON.stringify(values), JSON.stringify(options), JSON.stringify(suggestions) ]);


    // Variables
    const hasSearch      = shouldSearch(text);
    const showSearch     = Boolean(hasSearch && searching && searchText);
    const showEmpty      = Boolean(hasSearch && !searching && !optionList.length && emptyText);
    const showOptionList = Boolean(optionList.length && !searching);
    const hasOptions     = Boolean(showOptions && (showSearch || showEmpty || optionList.length));


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
        <ChipList>
            {values.map((value, index) => <ChipItem
                key={index}
                message={value}
                onClose={() => handleRemove(value)}
                isDisabled={isDisabled}
            />)}

            {!isDisabled && <EditItem>
                <InputBase
                    inputRef={inputRef}
                    className="input-chooser"
                    id={id}
                    type="text"
                    name={name}
                    value={text}
                    placeholder={placeholder}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onPaste={handlePaste}
                />
            </EditItem>}
        </ChipList>

        {hasOptions && <InputOptions
            passedRef={optionsRef}
            top={bounds.top}
            left={bounds.left}
            width={bounds.width}
            maxHeight={bounds.maxHeight}
        >
            {showSearch && <InputOption content={NLS.get(searchText)} />}
            {showEmpty && <InputOption content={NLS.get(emptyText)} />}

            {showOptionList && optionList.map((elem, index) => <InputOption
                key={index}
                className={`input-suggestion-${index}`}
                content={elem.text}
                isSelected={selectedRef.current === index}
                onMouseDown={(e) => handleAdd(e, elem.title)}
            />)}
        </InputOptions>}
    </InputContent>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
EmailsInput.propTypes = {
    inputRef      : PropTypes.object,
    className     : PropTypes.string,
    icon          : PropTypes.string,
    postIcon      : PropTypes.string,
    isFocused     : PropTypes.bool,
    isDisabled    : PropTypes.bool,
    isSmall       : PropTypes.bool,
    withBorder    : PropTypes.bool,
    withLabel     : PropTypes.bool,
    id            : PropTypes.string,
    name          : PropTypes.string,
    placeholder   : PropTypes.string,
    emptyText     : PropTypes.string,
    searchText    : PropTypes.string,
    value         : PropTypes.any,
    options       : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    onChange      : PropTypes.func.isRequired,
    onClear       : PropTypes.func,
    onFocus       : PropTypes.func.isRequired,
    onBlur        : PropTypes.func.isRequired,
    suggestFetch  : PropTypes.func,
    suggestParams : PropTypes.object,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
EmailsInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
    isSmall    : false,
    withBorder : true,
    withLabel  : true,
    searchText : "GENERAL_SEARCHING",
};

export default EmailsInput;
