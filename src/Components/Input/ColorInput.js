import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Input = Styled.input`
    width: 100%;
    padding: 6px 8px 2px;
`;



/**
 * The Color Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ColorInput(props) {
    const { className, id, name, value, isDisabled, tabIndex, onChange, inputRef } = props;

    return <Input
        className={`input input-color ${className}`}
        type="color"
        id={id}
        ref={inputRef}
        name={name}
        value={value}
        disabled={isDisabled}
        onChange={onChange}
        tabIndex={tabIndex}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ColorInput.propTypes = {
    className  : PropTypes.string,
    id         : PropTypes.string,
    name       : PropTypes.string,
    value      : PropTypes.any,
    isDisabled : PropTypes.bool,
    tabIndex   : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
    inputRef   : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ColorInput.defaultProps = {
    className  : "",
    id         : "",
    isDisabled : false,
};

export default ColorInput;
