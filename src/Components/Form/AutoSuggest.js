import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



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
    z-index: 2;
`;

const Li = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
    margin: 0;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;

    &:nth-child(odd) {
        background-color: var(--dark-gray);
    }
    &:nth-child(even) {
        background-color: var(--lighter-gray);
    }
    &:hover {
        background-color: var(--primary-color);
        color: white;
    }

    ${(props) => props.isSelected && `
        background-color: var(--primary-color);
        color: white;
    `}
`;



/**
 * The AutoSuggest Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AutoSuggest(props) {
    const { ref, open, id, name, params, fetch, onChange } = props;

    // The State
    const [ value,       setValue       ] = React.useState("");
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ selectedIdx, setSelectedIdx ] = React.useState(0);
    const [ selectedVal, setSelectedVal ] = React.useState("");

    // Sets the Value
    const changeValue = (newValue) => {
        if (newValue && value !== newValue && selectedVal !== newValue) {
            if (newValue.length > 1) {
                fetchValue(newValue);
            } else {
                setValue(newValue);
                setSuggestions([]);
                onChange(id, 0);
            }
        }
    };

    // Does the Actual Fetch
    const fetchValue = async (value) => {
        const newSuggestions = await fetch({ value, ...params || {} });
        setValue(value);
        setSelectedIdx(0);
        setSuggestions(newSuggestions);
    };

    // Applies the Selection
    const applySelection = () => {
        if (suggestions.length) {
            const newValue = suggestions[selectedIdx].title;
            selectElem(suggestions[selectedIdx].id, newValue);
            if (newValue) {
                setSuggestions([]);
                setValue(newValue);
            }
            return newValue;
        }
        return null;
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
        await onChange(id,   newID);
        await onChange(name, newValue);
        setSuggestions([]);
        setSelectedIdx(0);
        setSelectedVal(newValue);
    };


    // Set the Reference
    React.useEffect(() => {
        ref.apply       = applySelection;
        ref.changeValue = changeValue;
        ref.selectNext  = selectNext;
        ref.selectPrev  = selectPrev;
        ref.selectElem  = selectElem;
    }, []);


    // There is nothing to show
    if (!suggestions.length) {
        return <React.Fragment />;
    }

    return <Ul isOpen={open}>
        {suggestions.map((elem, index) => <Li
            key={index}
            isSelected={selectedIdx === index}
            onClick={() => selectElem(elem.id, elem.title)}
        >{elem.title}</Li>)}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AutoSuggest.propTypes = {
    ref      : PropTypes.object.isRequired,
    open     : PropTypes.bool.isRequired,
    fetch    : PropTypes.func.isRequired,
    onChange : PropTypes.func.isRequired,
    id       : PropTypes.string.isRequired,
    name     : PropTypes.string.isRequired,
    params   : PropTypes.object,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
AutoSuggest.defaultProps = {
    params : {},
};

export default AutoSuggest;
