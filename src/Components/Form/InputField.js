import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";

// Components
import Input                from "../Input/Input";
import InputContainer       from "../Input/InputContainer";
import InputLabel           from "../Input/InputLabel";
import AutoSuggest          from "../Form/AutoSuggest";
import Button               from "../Form/Button";
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
const InputHelper = Styled.p`
    font-size: 0.8em;
    margin: 4px 0 0 4px;
    color: var(--lighter-color);
`;

const InputInput = Styled(Input)`
    box-sizing: border-box;
    min-height: var(--input-height);
    color: var(--black-color);
    background-color: white;
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
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
`;
const InputButton = Styled(Button)`
    margin-left: 16px;
    height: var(--input-height);
`;



/**
 * The Input Field Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputField(props) {
    const {
        isHidden, className, type, name, label, icon, autoFocus, value,
        button, onClick, error, helperText, withLabel, onChange,
        fullWidth, noMargin, isRequired, withNone, shrink,
        suggestFetch, suggestID, suggestParams,
    } = props;

    const inputRef   = React.useRef();
    const suggestRef = React.useRef();

    const [ timer,     setTimer ] = React.useState(null);
    const [ isFocused, setFocus ] = React.useState(false);
    const [ hasValue,  setValue ] = React.useState(false);

    const hasLabel      = Boolean(withLabel && label && InputType.withLabel(type));
    const withTransform = !shrink && (!InputType.canShrink(type) || (type === InputType.SELECT && withNone));
    const withValue     = isFocused || hasValue || Boolean(value);
    const hasError      = Boolean(error);
    const hasHelper     = !hasError && Boolean(helperText);
    const hasSuggestion = Boolean(suggestFetch && suggestID);
    
    // The Input got Focus
    const handleFocus = () => {
        setFocus(true);
    };

    // The Input lost Focus
    const handleBlur = () => {
        setTimer(window.setTimeout(() => setFocus(false), 300));
    };

    // Handles the Input Change
    const handleChange = (e, value = e.target.value) => {
        setValue(Boolean(value));
        onChange(name, value);
    };


    // Autofocus
    React.useEffect(() => {
        if (autoFocus && inputRef.current) {
            const node = inputRef.current;
            node.focus();
        }
        setValue(Boolean(value));
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
        noMargin={noMargin}
        hasLabel={hasLabel}
        hasError={hasError}
        isFocused={isFocused}
    >
        {hasLabel && <InputLabel
            className="inputfield-label"
            isRequired={isRequired}
            withTransform={withTransform}
            withValue={withValue}
            isFocused={isFocused}
            message={label}
        />}
        <InputContent className="inputfield-cnt">
            {!!icon && <InputIcon icon={icon} />}
            <InputInput
                {...props}
                className="inputfield-input"
                inputRef={inputRef}
                suggestRef={suggestRef}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!!button && <InputButton
                variant="outlined"
                message={button}
                onClick={onClick}
            />}
        </InputContent>
        {hasError  && <InputError>{NLS.get(error)}</InputError>}
        {hasHelper && <InputHelper>{NLS.get(helperText)}</InputHelper>}

        {hasSuggestion && <AutoSuggest
            ref={suggestRef}
            open={isFocused}
            name={name}
            id={suggestID}
            fetch={suggestFetch}
            params={suggestParams}
            onChange={onChange}
        />}
    </InputContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
InputField.propTypes = {
    className     : PropTypes.string,
    type          : PropTypes.string,
    name          : PropTypes.string,
    label         : PropTypes.string,
    placeholder   : PropTypes.string,
    icon          : PropTypes.string,
    value         : PropTypes.any,
    autoComplete  : PropTypes.string,
    spellCheck    : PropTypes.string,
    isRequired    : PropTypes.bool,
    isDisabled    : PropTypes.bool,
    onChange      : PropTypes.func.isRequired,
    onSubmit      : PropTypes.func,
    button        : PropTypes.string,
    onClick       : PropTypes.func,
    onKeyDown     : PropTypes.func,
    onKeyUp       : PropTypes.func,
    onMedia       : PropTypes.func,
    suggestID     : PropTypes.string,
    suggestFetch  : PropTypes.string,
    suggestParams : PropTypes.object,
    mediaPath     : PropTypes.string,
    mediaType     : PropTypes.string,
    fieldButton   : PropTypes.string,
    error         : PropTypes.string,
    helperText    : PropTypes.string,
    options       : PropTypes.array,
    extraOptions  : PropTypes.array,
    tabIndex      : PropTypes.string,
    withLabel     : PropTypes.bool,
    noMargin      : PropTypes.bool,
    fullWidth     : PropTypes.bool,
    shrink        : PropTypes.bool,
    withNone      : PropTypes.bool,
    noneText      : PropTypes.string,
    withCustom    : PropTypes.bool,
    customText    : PropTypes.string,
    autoFocus     : PropTypes.bool,
    isHidden      : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
InputField.defaultProps = {
    className     : "",
    type          : "text",
    autoComplete  : "off",
    isRequired    : false,
    isDisabled    : false,
    options       : [],
    extraOptions  : [],
    suggestParams : {},
    withLabel     : true,
    noMargin      : false,
    fullWidth     : false,
    shrink        : false,
    withNone      : false,
    noneText      : "",
    withCustom    : false,
    customText    : "",
    autoFocus     : false,
};

export default InputField;
