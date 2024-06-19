import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Options = Styled.ul.attrs(({ isOpen, top, left, width, minWidth, maxHeight }) => ({ isOpen, top, left, width, minWidth, maxHeight }))`
    box-sizing: border-box;
    display: ${(props)=> props.isOpen ? "block" : "none"};
    position: fixed;
    top: ${(props) => `${props.top + 2}px`};
    left: ${(props) => `${props.left}px`};
    width: ${(props) => `${props.width}px`};
    max-height: ${(props) => `${props.maxHeight}px`};
    min-width: ${(props) => `${props.minWidth || 200}px`};
    overflow: auto;
    margin: 0;
    padding: 8px;
    list-style: none;
    background-color: white;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    transform: translateY(1px);
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
 * The AutoSuggest Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AutoSuggest(props) {
    const {
        inputRef, suggestRef, open, minWidth,
        id, name, noneText, keepSuggestions,
        params, fetch, onChange, onSuggest,
    } = props;


    // The References
    const listRef = React.useRef(null);

    // The Current State
    const [ timer,       setTimer       ] = React.useState(null);
    const [ value,       setValue       ] = React.useState("");
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ selectedIdx, setSelectedIdx ] = React.useState(0);
    const [ selectedVal, setSelectedVal ] = React.useState("");
    const [ bounds,      setBounds      ] = React.useState({ top : 0, left : 0, width : 0, maxHeight : 0 });


    // Clear the Timer
    React.useEffect(() => {
        if (open) {
            const bounds = Utils.getBounds(inputRef);
            setBounds({
                top       : bounds.bottom,
                left      : bounds.left,
                width     : bounds.width,
                maxHeight : window.innerHeight - bounds.bottom - 10,
            });
        }
    }, [ open ]);

    // Initializes the Value
    const initValue = async (newValue) => {
        setValue(newValue);
        setSelectedVal(newValue);
    };

    // Sets the Value
    const setNewValue = async (newValue) => {
        if (value !== newValue && selectedVal !== newValue) {
            setValue(newValue);
            if (timer) {
                window.clearTimeout(timer);
            }
            if (newValue.length > 1) {
                const newTimer = window.setTimeout(() => fetchValue(newValue), 500);
                setTimer(newTimer);
            } else {
                setSuggestions([]);
            }
            if (onChange) {
                onChange(id, 0, name, newValue);
            }
        }
    };

    // Clears the Value
    const clearValue = async () => {
        setValue("");
        setSuggestions([]);

        if (onChange) {
            onChange(id, 0, name, "");
        }
        if (timer) {
            window.clearTimeout(timer);
        }
    };

    // Does the Actual Fetch
    const fetchValue = async (value) => {
        const newSuggestions = await fetch({ value, ...params || {} });
        setSelectedIdx(0);
        setSuggestions(newSuggestions);
    };

    // Applies the Selection
    const applySelection = () => {
        if (!suggestions.length) {
            return null;
        }
        const newValue = suggestions[selectedIdx].title;
        selectElem(suggestions[selectedIdx].id, newValue, suggestions[selectedIdx]);
        if (newValue) {
            setValue(newValue);
            setSuggestions([]);
        }
        return newValue;
    };

    // Selects the Next Elem
    const selectNext = () => {
        const newSelectedIdx = (selectedIdx + 1) % suggestions.length;
        setSelectedIdx(newSelectedIdx);
        scrollIntoView(newSelectedIdx);
    };

    // Selects the Prev Elem
    const selectPrev = () => {
        const newSelectedIdx = (selectedIdx - 1) < 0 ? suggestions.length - 1 : selectedIdx - 1;
        setSelectedIdx(newSelectedIdx);
        scrollIntoView(newSelectedIdx);
    };

    // Scroll the result into view
    const scrollIntoView = (index) => {
        if (listRef.current) {
            listRef.current.querySelector(`.auto-suggest-${index}`).scrollIntoView({
                behaviour : "instant",
                block     : "nearest",
            });
        }
    };

    // Selects the Elem
    const selectElem = (newID, newValue, data) => {
        if (onSuggest) {
            onSuggest(id, newID, name, newValue, data);
        } else if (onChange) {
            onChange(id, newID, name, newValue);
        }
        if (!keepSuggestions) {
            setSuggestions([]);
        }
        setSelectedIdx(0);
        setSelectedVal(newValue);
    };

    // Handles the Click
    const handleClick = (e, newID, newValue, data) => {
        e.stopPropagation();
        selectElem(newID, newValue, data);
    };


    // Set the Reference
    React.useEffect(() => {
        suggestRef.current = {
            apply      : applySelection,
            initValue  : initValue,
            setValue   : setNewValue,
            clear      : clearValue,
            selectNext : selectNext,
            selectPrev : selectPrev,
            selectElem : selectElem,
        };
    }, [ setNewValue ]);


    // There is nothing to show
    if (!suggestions.length) {
        if (value && value.length > 1 && noneText) {
            return <Options
                isOpen={open}
                top={bounds.top}
                left={bounds.left}
                width={bounds.width}
                maxHeight={bounds.maxHeight}
                minWidth={minWidth}
            >
                <Option>{NLS.get(noneText)}</Option>
            </Options>;
        }
        return <React.Fragment />;
    }

    // There are some results
    return <Options
        ref={listRef}
        isOpen={open}
        top={bounds.top}
        left={bounds.left}
        width={bounds.width}
        maxHeight={bounds.maxHeight}
        minWidth={minWidth}
    >
        {suggestions.map((elem, index) => <Option
            key={index}
            className={`auto-suggest-${index}`}
            isSelected={selectedIdx === index}
            onMouseDown={(e) => handleClick(e, elem.id, elem.title, elem)}
        >{elem.title}</Option>)}
    </Options>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AutoSuggest.propTypes = {
    inputRef        : PropTypes.object.isRequired,
    suggestRef      : PropTypes.object.isRequired,
    open            : PropTypes.bool.isRequired,
    name            : PropTypes.string.isRequired,
    id              : PropTypes.string.isRequired,
    fetch           : PropTypes.func.isRequired,
    params          : PropTypes.object,
    minWidth        : PropTypes.number,
    noneText        : PropTypes.string,
    keepSuggestions : PropTypes.bool,
    onChange        : PropTypes.func,
    onSuggest       : PropTypes.func,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
AutoSuggest.defaultProps = {
    params : {},
};

export default AutoSuggest;
