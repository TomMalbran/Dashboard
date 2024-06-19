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
    font-size: 18px;
    transform: rotate(45deg);
`;



/**
 * The Media Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MediaInput(props) {
    const {
        className, icon, postIcon, isFocused, isDisabled,
        value, placeholder, onlyImages, onClick, onClear,
    } = props;


    // Do the Render
    const message = placeholder || (onlyImages ? "GENERAL_SELECT_IMAGE" : "GENERAL_SELECT_FILE");

    return <InputContent
        className={className}
        icon={icon}
        postIcon={postIcon}
        isFocused={isFocused}
        isDisabled={isDisabled}
        onClick={onClick}
        onClear={onClear}
        withBorder
        withPadding
        withLabel
        withClick
    >
        <InputValue>{value ? value : NLS.get(message)}</InputValue>
        <InputIcon icon="attachment" />
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MediaInput.propTypes = {
    className   : PropTypes.string,
    icon        : PropTypes.string,
    postIcon    : PropTypes.string,
    isFocused   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    value       : PropTypes.any,
    placeholder : PropTypes.string,
    onlyImages  : PropTypes.bool,
    onClick     : PropTypes.func,
    onClear     : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MediaInput.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    placeholder : "",
    onlyImages  : false,
};

export default MediaInput;
