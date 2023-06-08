import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import IconField            from "../Form/IconField";



// Styles
const SearchField = Styled(IconField)`
    --inputicon-height: 30px;
    margin-left: 32px;
    width: 200px;

    .input-content {
        background-color: var(--secondary-color);
    }
    .input {
        color: white;
        padding: 4px 8px;
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


    // Do the Render
    return <SearchField
        name="search"
        icon="search"
        placeholder="GENERAL_SEARCH"
        value={value}
        onChange={handleChange}
        withBorder={false}
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
