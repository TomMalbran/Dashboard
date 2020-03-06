import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";

// Components
import InputContainer       from "../Input/InputContainer";
import TextInput            from "../Input/TextInput";
import Icon                 from "../Common/Icon";



// Styles
const InputContent = Styled.div.attrs(({ hasError }) => ({ hasError }))`
    display: flex;
    align-items: center;
    ${(props) => props.hasError && `
        .icon {
            border-bottom-left-radius: 0;
        }
        .input {
            border-bottom-right-radius: 0;
        }
    `}
`;

const InputError = Styled.p`
    margin: 0;
    padding: 4px;
    color: white;
    font-size: 0.8em;
    text-align: center
    background-color: var(--error-color);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
`;

const InputInput = Styled(TextInput)`
    box-sizing: border-box;
    min-height: var(--input-height);
    color: var(--black-color);
    background-color: white;
    border: 1px solid var(--border-color);
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    transition: all 0.2s;

    &.input {
        appearance: none;
        font-size: 13px;
        width: 100%;
        margin: 0;
        padding: 4px 8px;
    }
    &.input-textarea {
        min-height: var(--input-height);
        resize: none;
    }
    &.input:focus {
        outline: none;
        border-color: 1px solid var(--border-color);
        color: var(--secondary-color);
    }
    &.input:disabled {
        color: rgb(175, 175, 175);
        border-color: rgb(205, 205, 205);
        box-shadow: none;
    }
`;

const InputIcon = Styled(Icon)`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(var(--input-height) - 2px);
    width: calc(var(--input-height) - 2px);
    font-size: 16px;
    color: white;
    background-color: var(--primary-color);
    border: 1px solid var(--border-color);
    border-right: none;
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    transition: all 0.2s;
`;



/**
 * The Input Field Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function IconField(props) {
    const {
        isHidden, className, type, icon, autoFocus,
        isRequired, error, fullWidth, onChange,
    } = props;

    const inputRef    = React.useRef();
    const placeholder = NLS.get(props.placeholder) + (isRequired ? " *" : "");

    const [ isFocused, setFocus ] = React.useState(false);

    // The Input got Focus
    const handleFocus = () => {
        setFocus(true);
    };

    // The Input lost Focus
    const handleBlur = () => {
        setFocus(false);
    };


    // Autofocus
    React.useEffect(() => {
        const node = inputRef.current;
        if (autoFocus && node) {
            node.focus();
        }
    }, []);


    if (isHidden) {
        return <React.Fragment />;
    }
    return <InputContainer
        className={`inputfield inputfield-${type} ${className}`}
        fullWidth={fullWidth}
        hasError={!!error}
        isFocused={isFocused}
        noMargin
    >
        <InputContent className="inputfield-cnt" hasError={!!error}>
            <InputIcon icon={icon} />
            <InputInput
                {...props}
                className="inputfield-input"
                placeholder={placeholder}
                inputRef={inputRef}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </InputContent>
        {!!error && <InputError>{NLS.get(error)}</InputError>}
    </InputContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
IconField.propTypes = {
    className    : PropTypes.string,
    id           : PropTypes.string,
    type         : PropTypes.string,
    name         : PropTypes.string,
    placeholder  : PropTypes.string,
    icon         : PropTypes.string,
    value        : PropTypes.any,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    isRequired   : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    onChange     : PropTypes.func.isRequired,
    onSubmit     : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
    error        : PropTypes.string,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    tabIndex     : PropTypes.string,
    fullWidth    : PropTypes.bool,
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    withCustom   : PropTypes.bool,
    customText   : PropTypes.string,
    autoFocus    : PropTypes.bool,
    isHidden     : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
IconField.defaultProps = {
    className    : "",
    type         : InputType.TEXT,
    autoComplete : "off",
    isRequired   : false,
    isDisabled   : false,
    options      : [],
    extraOptions : [],
    fullWidth    : false,
    withNone     : false,
    noneText     : "",
    withCustom   : false,
    customText   : "",
    autoFocus    : false,
};

export default IconField;
