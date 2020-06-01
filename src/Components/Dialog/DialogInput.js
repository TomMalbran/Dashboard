import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import InputField            from "../Form/InputField";



// Styles
const DialogField = Styled(InputField)`
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
 * The Dialog Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogInput(props) {
    const { type, value, placeholder, options, onChange } = props;
    
    // Handles the Input Change
    const handleChange = (name, value) => {
        onChange(value);
    };


    return <DialogField
        type={type}
        name="dialog"
        placeholder={placeholder}
        value={value}
        options={options}
        onChange={handleChange}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogInput.propTypes = {
    type        : PropTypes.string,
    value       : PropTypes.any,
    placeholder : PropTypes.string,
    options     : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    onChange    : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogInput.defaultProps = {
    value : "",
};

export default DialogInput;
