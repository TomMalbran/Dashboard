import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import InputContent         from "../Input/InputContent";
import Icon                 from "../Common/Icon";



// Styles
const InputValue = Styled.div`
    flex-grow: 2;
    font-size: var(--input-font);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const InputIcon = Styled(Icon)`
    margin-top: -4px;
    margin-right: -6px;
    font-size: 20px;
    transform: rotate(45deg);
`;

const Input = Styled.input`
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    opacity: 0;
    pointer-events: none;
`;



/**
 * The File Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FileInput(props) {
    const {
        inputRef, className, icon, isFocused, isDisabled,
        name, value, placeholder, onlyImages,
        onChange, onClear, onFocus, onBlur,
    } = props;

    // Handles the File Change
    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onChange(name, file);
        }
    };


    // Do the Render
    const message = placeholder || (onlyImages ? "GENERAL_SELECT_IMAGE" : "GENERAL_SELECT_FILE");

    return <InputContent
        inputRef={inputRef}
        className={className}
        icon={icon}
        isFocused={isFocused}
        isDisabled={isDisabled}
        onClear={onClear}
        withBorder
        withPadding
        withLabel
        withClick
    >
        <InputValue>{value ? value : NLS.get(message)}</InputValue>
        <InputIcon icon="attachment" />
        <Input
            ref={inputRef}
            type="file"
            name={name}
            accept={onlyImages ? "image/*" : ""}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
FileInput.propTypes = {
    inputRef    : PropTypes.any,
    className   : PropTypes.string,
    icon        : PropTypes.string,
    isFocused   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    name        : PropTypes.string.isRequired,
    value       : PropTypes.any,
    placeholder : PropTypes.string,
    onlyImages  : PropTypes.bool,
    onChange    : PropTypes.func.isRequired,
    onClear     : PropTypes.func,
    onFocus     : PropTypes.func.isRequired,
    onBlur      : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
FileInput.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    placeholder : "",
    onlyImages  : false,
};

export default FileInput;
