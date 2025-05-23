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
import MenuLine             from "../Menu/MenuLine";
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



/**
 * The Suggest Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SuggestInput(props) {
    const {
        inputRef, className, icon, postIcon,
        isFocused, isDisabled, isSmall, withBorder, withLabel,
        id, name, value, placeholder, emptyText, searchText,
        suggestID, suggestFetch, suggestParams, keepSuggestions,
        suggestWidth, onChange, onClear, onFocus, onBlur,
    } = props;


    // The References
    const containerRef = React.useRef(null);
    const optionsRef   = React.useRef(null);
    const selectedRef  = React.useRef(-1);
    const timerRef     = React.useRef(null);

    // The Current State
    const [ showOptions, setShowOptions ] = React.useState(false);
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ search,      setSearch      ] = React.useState("");
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


    // Returns true if it should search
    const shouldSearch = (search) => {
        return search.length > 1;
    };

    // Sets the Search Value
    const setSearchValue = async (newSearch) => {
        setSearch(newSearch);
        if (search !== newSearch && value !== newSearch) {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
                setSearching(false);
            }

            if (shouldSearch(newSearch)) {
                setSearching(true);
                timerRef.current = window.setTimeout(() => {
                    fetchValue(newSearch);
                }, 1000);
            } else {
                setSuggestions([]);
            }
        }
    };

    // Does the Actual Fetch
    const fetchValue = async (value) => {
        const newSuggestions = await suggestFetch({ value, ...suggestParams || {} });
        setSearching(false);

        if (newSuggestions && Array.isArray(newSuggestions)) {
            selectedRef.current = 0;
            const parsedSuggestions = Utils.parseSearchResult(newSuggestions, value, "title", false);
            setSuggestions(parsedSuggestions);
        }
    };

    // Selects the Elem
    const selectElem = (newID, newValue, data) => {
        onChange(name, newValue, suggestID, newID, data);
        if (!keepSuggestions) {
            setSuggestions([]);
        }

        selectedRef.current = 0;
        setSearch("");
        setShowOptions(false);
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
        const node   = containerRef.current.closest(".inputfield-double") || containerRef.current;
        const bounds = node.getBoundingClientRect();
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
            setSearch("");
            setSuggestions([]);
            setTimer(null);
            onBlur();
        }, 200));
    };

    // Handles the Select
    const handleSelect = (e, newID, newValue, data) => {
        e.stopPropagation();
        selectElem(newID, newValue, data);
        setShowOptions(false);
    };

    // Handles the Input
    const handleInput = (e) => {
        setSearchValue(e.target.value);
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
        case KeyCode.DOM_VK_UP:
        case KeyCode.DOM_VK_LEFT:
            newSelectedIdx = (selectedIdx - 1) < 0 ? suggestions.length - 1 : selectedIdx - 1;
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_DOWN:
        case KeyCode.DOM_VK_RIGHT:
            newSelectedIdx = (selectedIdx + 1) % suggestions.length;
            e.preventDefault();
            break;

        case KeyCode.DOM_VK_HOME:
            newSelectedIdx = 0;
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_END:
            newSelectedIdx = suggestions.length - 1;
            e.preventDefault();
            break;

        case KeyCode.DOM_VK_PAGE_UP:
            if (selectedIdx === 0) {
                newSelectedIdx = suggestions.length - 1;
            } else if (selectedIdx - 5 < 0) {
                newSelectedIdx = 0;
            } else {
                newSelectedIdx = selectedIdx - 5;
            }
            e.preventDefault();
            break;
        case KeyCode.DOM_VK_PAGE_DOWN:
            if (selectedIdx === suggestions.length - 1) {
                newSelectedIdx = 0;
            } else if (selectedIdx + 5 >= suggestions.length) {
                newSelectedIdx = suggestions.length - 1;
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
            if (suggestions[selectedRef.current]) {
                const elem = suggestions[selectedRef.current];
                selectElem(elem.id, elem.title, elem);
            }
            break;

        default:
            setSearchValue(e.target.value);
        }
        e.preventDefault();
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


    // Variables
    const hasValue        = Boolean(value);
    const hasSearch       = shouldSearch(search);
    const showSearch      = Boolean(hasSearch && searching && searchText);
    const showEmpty       = Boolean(hasSearch && !searching && !suggestions.length && emptyText);
    const showLine        = Boolean(hasValue && (showSearch || showEmpty || suggestions.length));
    const showSuggestions = Boolean(suggestions.length && !searching);
    const hasOptions      = Boolean(showOptions && (hasValue || showSearch || showEmpty || suggestions.length));


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
            className="input-search"
            id={id}
            type="text"
            name={name}
            value={showOptions ? search : value}
            placeholder={placeholder}
            isDisabled={isDisabled}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
        <InputIcon icon="search" />

        {hasOptions && <InputOptions
            passedRef={optionsRef}
            top={bounds.top}
            left={bounds.left}
            width={Math.max(suggestWidth ?? 0, bounds.width)}
            maxHeight={bounds.maxHeight}
        >
            {hasValue && <InputOption content={`<b>${value}</b>`} />}
            {showLine && <MenuLine />}
            {showSearch && <InputOption content={NLS.get(searchText)} />}
            {showEmpty && <InputOption content={NLS.get(emptyText)} />}

            {showSuggestions && suggestions.map((elem, index) => <InputOption
                key={index}
                className={`input-suggestion-${index}`}
                content={elem.text}
                isSelected={selectedRef.current === index}
                onMouseDown={(e) => handleSelect(e, elem.id, elem.title, elem)}
            />)}
        </InputOptions>}
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SuggestInput.propTypes = {
    inputRef        : PropTypes.any,
    className       : PropTypes.string,
    icon            : PropTypes.string,
    postIcon        : PropTypes.string,
    isFocused       : PropTypes.bool,
    isDisabled      : PropTypes.bool,
    isSmall         : PropTypes.bool,
    withBorder      : PropTypes.bool,
    withLabel       : PropTypes.bool,
    id              : PropTypes.string,
    name            : PropTypes.string.isRequired,
    placeholder     : PropTypes.string,
    emptyText       : PropTypes.string,
    searchText      : PropTypes.string,
    value           : PropTypes.any,
    onChange        : PropTypes.func.isRequired,
    onClear         : PropTypes.func,
    onFocus         : PropTypes.func,
    onBlur          : PropTypes.func,
    onSubmit        : PropTypes.func,
    suggestID       : PropTypes.string,
    suggestFetch    : PropTypes.func,
    suggestParams   : PropTypes.object,
    suggestNone     : PropTypes.string,
    suggestWidth    : PropTypes.number,
    keepSuggestions : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SuggestInput.defaultProps = {
    className    : "",
    isFocused    : false,
    isDisabled   : false,
    isSmall      : false,
    withBorder   : true,
    withLabel    : true,
    placeholder  : "",
    emptyText    : "GENERAL_NONE_RESULTS",
    searchText   : "GENERAL_SEARCHING",
    suggestWidth : 0,
};

export default SuggestInput;
