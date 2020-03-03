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
    font-size: 12px;
    margin: 4px 0 0 4px;
    color: #ff0033;
`;
const InputHelper = Styled.p`
    font-size: 0.8em;
    margin: 4px 0 0 4px;
    color: var(--lighter-color);
`;

const InputInput = Styled(Input).attrs(({ isSmall }) => ({ isSmall }))`
    box-sizing: border-box;
    color: var(--black-color);
    background-color: white;
    transition: all 0.2s;
    
    &.input {
        appearance: none;
        font-size: 13px;
        width: 100%;
        margin: 0;
        padding: 4px 8px;
        min-height: ${(props) => props.isSmall ? "calc(var(--input-height) - 8px)" : "var(--input-height)"};
        border: 1px solid var(--lighter-color);
        border-radius: var(--border-radius);
    }
    &.input-textarea {
        resize: none;
    }
    &.input:focus {
        outline: none;
        border-color: var(--border-color);
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
    padding: 0 4px;
    font-size: 16px;
    border: 1px solid var(--lighter-color);
    border-right: none;
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);

    & + .input {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding-left: 0;
    }
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
        button, onClick, error, helperText, withLabel, onChange, onSuggest,
        fullWidth, noMargin, isRequired, withNone, shrink, isSmall,
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
    const autoSuggest   = Boolean(suggestFetch && suggestID);
    
    // The Input got Focus
    const handleFocus = () => {
        setFocus(true);
    };

    // The Input lost Focus
    const handleBlur = () => {
        setTimer(window.setTimeout(() => {
            setFocus(false);
            setTimer(null);
        }, 300));
    };

    // Handles the Input Change
    const handleChange = (name, value) => {
        setValue(Boolean(value));
        onChange(name, value);
    };


    // AutoFocus
    React.useEffect(() => {
        const node = inputRef.current;
        if (autoFocus && node) {
            node.focus();
        }
        setValue(Boolean(value));
    }, []);

    // Clear the Timer
    React.useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ timer ]);


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
                autoSuggest={autoSuggest}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                isSmall={isSmall}
            />
            {!!button && <InputButton
                variant="outlined"
                message={button}
                onClick={onClick}
            />}
        </InputContent>
        {hasError  && <InputError>{NLS.get(error)}</InputError>}
        {hasHelper && <InputHelper>{NLS.get(helperText)}</InputHelper>}

        {autoSuggest && <AutoSuggest
            suggestRef={suggestRef}
            open={isFocused}
            name={name}
            id={suggestID}
            fetch={suggestFetch}
            params={suggestParams}
            onChange={onChange}
            onSuggest={onSuggest}
        />}
    </InputContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
InputField.propTypes = {
    className     : PropTypes.string,
    id            : PropTypes.string,
    type          : PropTypes.string,
    name          : PropTypes.string,
    label         : PropTypes.string,
    placeholder   : PropTypes.string,
    icon          : PropTypes.string,
    value         : PropTypes.any,
    minValue      : PropTypes.number,
    step          : PropTypes.string,
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
    onSuggest     : PropTypes.func,
    suggestID     : PropTypes.string,
    suggestFetch  : PropTypes.func,
    suggestParams : PropTypes.object,
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
    isSmall       : PropTypes.bool,
    withNone      : PropTypes.bool,
    noneText      : PropTypes.string,
    withCustom    : PropTypes.bool,
    customText    : PropTypes.string,
    customKey     : PropTypes.string,
    autoFocus     : PropTypes.bool,
    isHidden      : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
InputField.defaultProps = {
    className     : "",
    type          : InputType.TEXT,
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
    isSmall       : false,
    withNone      : false,
    noneText      : "",
    withCustom    : false,
    customText    : "",
    customKey     : "",
    autoFocus     : false,
};

export default InputField;
