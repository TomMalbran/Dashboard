import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

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
    font-size: 18px;
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
        inputRef, className, icon, postIcon, isFocused, isDisabled,
        name, value, placeholder, onlyImages, accept, maxSize,
        onChange, onClear, onError, onFocus, onBlur,
    } = props;


    // Handles the File Change
    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (Utils.isValidFile(file, false, maxSize)) {
                onChange(name, file, `${name}Name`, file.name);
            } else if (onError) {
                onError(name, NLS.get("GENERAL_ERROR_FILE_SIZE"));
            }
        }
    };


    // Do the Render
    const message = placeholder || (onlyImages ? "GENERAL_SELECT_IMAGE" : "GENERAL_SELECT_FILE");

    return <InputContent
        inputRef={inputRef}
        className={className}
        icon={icon}
        postIcon={postIcon}
        isFocused={isFocused}
        isDisabled={isDisabled}
        onClear={onClear}
        onError={onError}
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
            accept={onlyImages ? "image/*" : accept}
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
    postIcon    : PropTypes.string,
    isFocused   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    name        : PropTypes.string.isRequired,
    value       : PropTypes.any,
    placeholder : PropTypes.string,
    onlyImages  : PropTypes.bool,
    accept      : PropTypes.string,
    maxSize     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange    : PropTypes.func.isRequired,
    onClear     : PropTypes.func,
    onError     : PropTypes.func,
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
    accept      : "",
};

export default FileInput;
