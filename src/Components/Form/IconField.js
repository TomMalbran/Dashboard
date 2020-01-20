import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Input                from "../Input/Input";
import InputContainer       from "../Input/InputContainer";
import Icon                 from "../Common/Icon";



// Styles
const InputContent = Styled.div`
    display: flex;
    align-items: center;
`;

const InputError = Styled.p`
    font-size: 0.8em;
    margin: 4px 0 0 4px;
    color: #ff0033;
`;

const InputInput = Styled(Input)`
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
        error, onChange, fullWidth,
    } = props;

    const inputRef = React.useRef();

    const [ timer,     setTimer ] = React.useState(null);
    const [ isFocused, setFocus ] = React.useState(false);

    // The Input got Focus
    const handleFocus = () => {
        setFocus(true);
    };

    // The Input lost Focus
    const handleBlur = () => {
        setTimer(window.setTimeout(() => setFocus(false), 300));
    };


    // Autofocus
    React.useEffect(() => {
        if (autoFocus && inputRef.current) {
            const node = inputRef.current;
            node.focus();
        }
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
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
        <InputContent className="inputfield-cnt">
            <InputIcon icon={icon} />
            <InputInput
                {...props}
                className="inputfield-input"
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
    options      : PropTypes.array,
    extraOptions : PropTypes.array,
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
    type         : "text",
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
