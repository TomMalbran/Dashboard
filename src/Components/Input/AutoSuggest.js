import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Ul = Styled.ul.attrs(({ isOpen }) => ({ isOpen }))`
    box-sizing: border-box;
    display: ${(props)=> props.isOpen ? "block" : "none"};
    position: absolute;
    overflow: auto;
    width: 100%;
    min-width: 200px;
    margin: 0;
    padding: 8px;
    list-style: none;
    background-color: white;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    transform: translateY(1px);
    z-index: 2;
`;

const Li = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
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
        suggestRef, open, id, name, noneText, keepSuggestions,
        params, fetch, onChange, onSuggest,
    } = props;

    // The State
    const [ timer,       setTimer       ] = React.useState(null);
    const [ value,       setValue       ] = React.useState("");
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ selectedIdx, setSelectedIdx ] = React.useState(0);
    const [ selectedVal, setSelectedVal ] = React.useState("");

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
            onChange(id, 0, name, newValue);
        }
    };

    // Clears the Value
    const clearValue = async () => {
        setValue("");
        onChange(id, 0, name, "");
        setSuggestions([]);
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
        selectElem(suggestions[selectedIdx].id, newValue);
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
    };

    // Selects the Prev Elem
    const selectPrev = () => {
        const newSelectedIdx = (selectedIdx - 1) < 0 ? suggestions.length - 1 : selectedIdx - 1;
        setSelectedIdx(newSelectedIdx);
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
            return <Ul isOpen={open}>
                <Li>{NLS.get(noneText)}</Li>
            </Ul>;
        }
        return <React.Fragment />;
    }

    // There are some results
    return <Ul isOpen={open}>
        {suggestions.map((elem, index) => <Li
            key={index}
            isSelected={selectedIdx === index}
            onMouseDown={(e) => handleClick(e, elem.id, elem.title, elem)}
        >{elem.title}</Li>)}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AutoSuggest.propTypes = {
    suggestRef      : PropTypes.object.isRequired,
    open            : PropTypes.bool.isRequired,
    noneText        : PropTypes.string,
    keepSuggestions : PropTypes.bool,
    fetch           : PropTypes.func.isRequired,
    onChange        : PropTypes.func,
    onSuggest       : PropTypes.func,
    id              : PropTypes.string.isRequired,
    name            : PropTypes.string.isRequired,
    params          : PropTypes.object,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
AutoSuggest.defaultProps = {
    params : {},
};

export default AutoSuggest;
