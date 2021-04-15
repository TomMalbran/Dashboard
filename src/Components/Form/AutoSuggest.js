import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Ul = Styled.ul.attrs(({ isOpen }) => ({ isOpen }))`
    display: ${(props)=> props.isOpen ? "block" : "none"};
    position: absolute;
    overflow: auto;
    width: 100%;
    min-width: 200px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-weight: 200;
    transform: translateY(1px);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
    z-index: 2;
`;

const Li = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
    margin: 0;
    padding: 10px;
    color: var(--title-color);
    cursor: pointer;
    font-size: 14px;
    background-color: var(--lighter-gray);
    transition: all 0.2s;

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
        suggestRef, open, id, name, noneText,
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
            await onChange(name, newValue);
            if (timer) {
                window.clearTimeout(timer);
            }
            if (newValue.length > 1) {
                const newTimer = window.setTimeout(() => fetchValue(newValue), 500);
                setTimer(newTimer);
            } else {
                setSuggestions([]);
                onChange(id, 0);
            }
        }
    };

    // Clears the Value
    const clearValue = async () => {
        setValue("");
        await onChange(name, "");
        onChange(id, 0);
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
    const selectElem = async (newID, newValue) => {
        if (onSuggest) {
            onSuggest(id, newID, name, newValue);
        } else if (onChange) {
            await onChange(id, newID);
            await onChange(name, newValue);
        }
        setSuggestions([]);
        setSelectedIdx(0);
        setSelectedVal(newValue);
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
        {suggestions.map(({ id, title }, index) => <Li
            key={index}
            isSelected={selectedIdx === index}
            onClick={() => selectElem(id, title)}
        >{title}</Li>)}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AutoSuggest.propTypes = {
    suggestRef : PropTypes.object.isRequired,
    open       : PropTypes.bool.isRequired,
    noneText   : PropTypes.string,
    fetch      : PropTypes.func.isRequired,
    onChange   : PropTypes.func,
    onSuggest  : PropTypes.func,
    id         : PropTypes.string.isRequired,
    name       : PropTypes.string.isRequired,
    params     : PropTypes.object,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
AutoSuggest.defaultProps = {
    params : {},
};

export default AutoSuggest;
