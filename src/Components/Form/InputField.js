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
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const InputContent = Styled.div`
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
`;

const InputError = Styled.p`
    font-size: 12px;
    margin: 4px 0 0 4px;
    color: #ff0033;
`;

const InputHelper = Styled.p`
    font-size: 0.9em;
    margin: 4px 0 0 4px;
    color: var(--lighter-color);
`;

const InputInput = Styled(Input).attrs(({ isSmall, width, labelInside }) => ({ isSmall, width, labelInside }))`
    box-sizing: border-box;
    color: var(--black-color);
    background-color: white;
    transition: all 0.2s;

    &.input, & .input {
        box-sizing: border-box;
        appearance: none;
        font-size: var(--input-font);
        width: 100%;
        margin: 0;
        padding: 4px 8px;
        border: 1px solid var(--lighter-color);
        border-radius: var(--border-radius);
        min-height: ${(props) => (
            props.isSmall ? "calc(var(--input-height) - 7px)" :
            (props.labelInside ? "calc(var(--input-height) + 7px)" : "var(--input-height)")
        )};
    }

    &.input-textarea, & .input-textarea {
        resize: none;
    }
    &.input:focus, & .input:focus {
        outline: none;
        border-color: var(--border-color);
        color: var(--secondary-color);
    }
    &.input:disabled, & .input:disabled {
        border-color: rgb(205, 205, 205);
        box-shadow: none;
    }
    &.input::placeholder, & .input::placeholder {
        color: rgb(100, 100, 100);
    }

    &.inputfield-pre {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        ${(props) => props.width ? `width: ${props.width}px` : ""};
    }
    &.inputfield-pre + .inputfield-input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        ${(props) => props.width ? `width: calc(100% - ${props.width}px)` : ""};
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
const InputClear = Styled(IconLink)`
    position: absolute;
    right: 0;
    top: calc(50% + 3px);
    transform: translateY(-50%);
    .icon {
        box-shadow: none;
    }
`;
const InputButton = Styled(Button)`
    margin-left: 16px;
    height: var(--input-height);
    white-space: nowrap;
`;



/**
 * The Input Field Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputField(props) {
    const {
        isHidden, className, type, name, label, icon, autoFocus, value,
        button, onClick, error, helperText, withLabel, onChange, onInput, onSuggest, onBlur,
        fullWidth, smallMargin, noMargin, isRequired, withNone, isSmall, labelInside, shrinkLabel,
        preType, preName, preValue, preOptions, preWithNone, prePlaceholder, preWidth,
        suggestFetch, suggestID, suggestParams, suggestNone, keepSuggestions, hasClear,
    } = props;

    const inputRef   = React.useRef();
    const suggestRef = React.useRef();

    const [ timer,     setTimer ] = React.useState(null);
    const [ isFocused, setFocus ] = React.useState(false);
    const [ hasValue,  setValue ] = React.useState(false);

    const hasLabel      = Boolean(withLabel && label && InputType.hasLabel(type));
    const withTransform = !shrinkLabel && InputType.canShrink(type, withNone);
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
            if (onBlur) {
                onBlur();
            }
        }, 300));
    };

    // Handles the Change
    const handleChange = (name, value) => {
        setValue(Boolean(value));
        if (onChange) {
            onChange(name, value);
        }
    };

    // Handles the Input
    const handleInput = (name, value) => {
        if (onInput) {
            onInput(name, value);
        }
    };

    // Handles the Clear Click
    const handleClear = () => {
        if (suggestRef && suggestRef.current) {
            // @ts-ignore
            suggestRef.current.clear();
        } else {
            handleChange(name, "");
        }
    };


    // AutoFocus
    React.useEffect(() => {
        const node = inputRef.current;
        if (autoFocus && node) {
            node.focus();
        }
        setValue(Boolean(value));
        if (suggestRef && suggestRef.current) {
            // @ts-ignore
            suggestRef.current.initValue(value);
        }
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
        smallMargin={smallMargin}
        noMargin={noMargin}
        hasLabel={hasLabel}
        labelInside={labelInside}
        hasError={hasError}
        isFocused={isFocused}
    >
        {hasLabel && <InputLabel
            className="inputfield-label"
            isRequired={isRequired}
            withTransform={withTransform}
            withValue={withValue}
            labelInside={labelInside}
            isFocused={isFocused}
            message={label}
        />}
        <InputContent className="inputfield-cnt">
            {!!icon && <InputIcon icon={icon} />}
            {!!preName && <InputInput
                className="inputfield-input inputfield-pre"
                type={preType}
                name={preName}
                value={preValue}
                options={preOptions}
                withNone={preWithNone}
                placeholder={prePlaceholder}
                width={preWidth}
                labelInside={labelInside}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />}
            <InputInput
                {...props}
                className="inputfield-input"
                inputRef={inputRef}
                suggestRef={suggestRef}
                autoSuggest={autoSuggest}
                onChange={handleChange}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                isSmall={isSmall}
                labelInside={labelInside}
            />
            {hasClear && hasValue && <InputClear
                variant="light"
                icon="close"
                onClick={handleClear}
                isSmall
            />}
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
            noneText={suggestNone}
            keepSuggestions={keepSuggestions}
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
    isHidden        : PropTypes.bool,
    className       : PropTypes.string,
    id              : PropTypes.string,
    type            : PropTypes.string,
    inputType       : PropTypes.string,
    name            : PropTypes.string,
    label           : PropTypes.string,
    placeholder     : PropTypes.string,
    icon            : PropTypes.string,
    value           : PropTypes.any,
    minValue        : PropTypes.number,
    step            : PropTypes.string,
    autoComplete    : PropTypes.string,
    spellCheck      : PropTypes.string,
    isRequired      : PropTypes.bool,
    isDisabled      : PropTypes.bool,
    onChange        : PropTypes.func,
    onInput         : PropTypes.func,
    onBlur          : PropTypes.func,
    onSubmit        : PropTypes.func,
    button          : PropTypes.string,
    onClick         : PropTypes.func,
    onKeyDown       : PropTypes.func,
    onKeyUp         : PropTypes.func,
    onMedia         : PropTypes.func,
    onSuggest       : PropTypes.func,
    suggestID       : PropTypes.string,
    suggestFetch    : PropTypes.func,
    suggestParams   : PropTypes.object,
    suggestNone     : PropTypes.string,
    keepSuggestions : PropTypes.bool,
    fieldButton     : PropTypes.string,
    error           : PropTypes.string,
    helperText      : PropTypes.string,
    options         : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    tabIndex        : PropTypes.string,
    withLabel       : PropTypes.bool,
    smallMargin     : PropTypes.bool,
    noMargin        : PropTypes.bool,
    fullWidth       : PropTypes.bool,
    labelInside     : PropTypes.bool,
    shrinkLabel     : PropTypes.bool,
    isSmall         : PropTypes.bool,
    withNone        : PropTypes.bool,
    noneText        : PropTypes.string,
    withCustom      : PropTypes.bool,
    customFirst     : PropTypes.bool,
    customText      : PropTypes.string,
    customKey       : PropTypes.string,
    hasClear        : PropTypes.bool,
    autoFocus       : PropTypes.bool,
    onlyImages      : PropTypes.bool,
    preType         : PropTypes.string,
    preName         : PropTypes.string,
    preValue        : PropTypes.any,
    preOptions      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    preWithNone     : PropTypes.bool,
    prePlaceholder  : PropTypes.string,
    preWidth        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
InputField.defaultProps = {
    isHidden       : false,
    className      : "",
    type           : InputType.TEXT,
    inputType      : InputType.TEXT,
    placeholder    : "",
    autoComplete   : "off",
    isRequired     : false,
    isDisabled     : false,
    options        : [],
    extraOptions   : [],
    suggestParams  : {},
    withLabel      : true,
    smallMargin    : false,
    noMargin       : false,
    fullWidth      : false,
    labelInside    : false,
    shrinkLabel    : false,
    isSmall        : false,
    withNone       : false,
    noneText       : "",
    withCustom     : false,
    customFirst    : false,
    customText     : "",
    customKey      : "",
    hasClear       : false,
    autoFocus      : false,
    onlyImages     : false,
    preType        : InputType.TEXT,
    preOptions     : [],
    preWithNone    : false,
    prePlaceholder : "",

};

export default InputField;
