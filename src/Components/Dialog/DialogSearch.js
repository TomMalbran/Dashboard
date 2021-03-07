import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import IconField            from "../Form/IconField";



// Styles
const SearchField = Styled(IconField)`
    --input-height: 30px;
    margin-left: 32px;
    width: 200px;

    .input {
        background-color: var(--secondary-color);
        color: white;
    }
    .input:focus {
        color: white;
    }
`;



/**
 * The Dialog Search Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogSearch(props) {
    const { value, onChange } = props;

    // Handles the Input Change
    const handleChange = (name, value) => {
        onChange(value);
    };


    return <SearchField
        name="search"
        icon="search"
        placeholder="GENERAL_SEARCH"
        value={value}
        onChange={handleChange}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogSearch.propTypes = {
    value    : PropTypes.string,
    onChange : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogSearch.defaultProps = {
    value : "",
};

export default DialogSearch;
