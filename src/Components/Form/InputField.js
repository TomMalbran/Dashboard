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
import InputError           from "../Input/InputError";
import AutoSuggest          from "../Input/AutoSuggest";
import Button               from "../Form/Button";



// Styles
const FieldContent = Styled.div`
    display: flex;
    align-items: center;
`;

const FieldHelper = Styled.p`
    font-size: 0.9em;
    margin: 4px 0 0 4px;
    color: var(--lighter-color);
`;

const FieldButton = Styled(Button)`
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
        passedRef, isHidden, className, type, name, label, autoFocus, value,
        button, onClick, error, helperText,
        onChange, onSearch, onInput, onSuggest, onFocus, onBlur,
        width, fullWidth, isRequired, withNone,
        withLabel, shrinkLabel, errorBackground,
        suggestFetch, suggestID, suggestParams, suggestNone,
        keepSuggestions, hasClear, onClear,
    } = props;


    // The References
    const fieldRef   = React.useRef();
    const inputRef   = passedRef || fieldRef;
    const suggestRef = React.useRef();

    // The Current State
    const [ timer,     setTimer ] = React.useState(null);
    const [ isFocused, setFocus ] = React.useState(false);


    // The Input got Focus
    const handleFocus = () => {
        setFocus(true);
        if (onFocus) {
            onFocus();
        }
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
    const handleChange = (name, value, secondName, secondValue) => {
        if (onChange) {
            onChange(name, value, secondName, secondValue);
        }
    };

    // Handles the Input
    const handleInput = (name, value) => {
        if (onInput) {
            onInput(name, value);
        }
    };

    // Handles the Clear
    const handleClear = () => {
        let params = [ name, "" ];
        if (suggestRef && suggestRef.current) {
            // @ts-ignore
            suggestRef.current.clear();
            params = [ suggestID, 0, name, "" ];
        } else if (type === "file") {
            params = [ name, undefined, `${name}File`, "" ];
        }

        if (onClear) {
            onClear(...params);
        } else {
            handleChange(...params);
        }
    };


    // AutoFocus
    React.useEffect(() => {
        const node = inputRef.current;
        if (autoFocus && node) {
            // @ts-ignore
            node.focus();
        }

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



    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }

    const autoSuggest   = Boolean(suggestFetch && suggestID);
    const hasLabel      = Boolean(label && InputType.hasLabel(type));
    const hasValue      = InputType.isValueFilled(value);
    const withTransform = !shrinkLabel && InputType.canShrink(type, withNone);
    const withValue     = hasValue || isFocused;
    const withClear     = hasValue && (hasClear || InputType.hasClear(type) || autoSuggest);
    const hasError      = Boolean(error);
    const hasHelper     = !hasError && Boolean(helperText);

    return <InputContainer
        className={`inputfield inputfield-${type} ${className}`}
        width={width}
        fullWidth={fullWidth}
        hasError={hasError}
    >
        {hasLabel && <InputLabel
            className="inputfield-label"
            isRequired={isRequired}
            withTransform={withTransform}
            withValue={withValue}
            isFocused={isFocused}
            message={label}
        />}
        <FieldContent>
            <Input
                {...props}
                className="inputfield-input"
                inputRef={inputRef}
                suggestRef={suggestRef}
                autoSuggest={autoSuggest}
                isFocused={isFocused}
                onChange={handleChange}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClear={withClear ? handleClear : undefined}
                withLabel={withLabel || hasLabel}
            />
            {!!button && <FieldButton
                variant="outlined"
                message={button}
                onClick={onClick}
            />}
        </FieldContent>
        <InputError
            error={error}
            useBackground={errorBackground}
        />
        {hasHelper && <FieldHelper>
            {NLS.get(helperText)}
        </FieldHelper>}

        {autoSuggest && <AutoSuggest
            suggestRef={suggestRef}
            open={isFocused}
            name={name}
            id={suggestID}
            fetch={suggestFetch}
            params={suggestParams}
            noneText={suggestNone}
            keepSuggestions={keepSuggestions}
            onChange={onSearch}
            onSuggest={onSuggest}
        />}
    </InputContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
InputField.propTypes = {
    passedRef       : PropTypes.any,
    isHidden        : PropTypes.bool,
    className       : PropTypes.string,
    id              : PropTypes.string,
    type            : PropTypes.string,
    inputType       : PropTypes.string,
    name            : PropTypes.string,
    label           : PropTypes.string,
    placeholder     : PropTypes.string,
    title           : PropTypes.string,
    icon            : PropTypes.string,
    postIcon        : PropTypes.string,
    value           : PropTypes.any,
    step            : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    minValue        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxValue        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxAmount       : PropTypes.number,
    maxLength       : PropTypes.number,
    autoComplete    : PropTypes.string,
    spellCheck      : PropTypes.string,
    isRequired      : PropTypes.bool,
    isDisabled      : PropTypes.bool,
    onChange        : PropTypes.func,
    onSearch        : PropTypes.func,
    onInput         : PropTypes.func,
    onFocus         : PropTypes.func,
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
    addButton       : PropTypes.string,
    error           : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    errors          : PropTypes.object,
    helperText      : PropTypes.string,
    counterText     : PropTypes.string,
    options         : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    width           : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    fullWidth       : PropTypes.bool,
    shrinkLabel     : PropTypes.bool,
    withLabel       : PropTypes.bool,
    withBorder      : PropTypes.bool,
    withEditor      : PropTypes.bool,
    isSmall         : PropTypes.bool,
    errorBackground : PropTypes.bool,
    suggestPassword : PropTypes.bool,
    withNone        : PropTypes.bool,
    noneText        : PropTypes.string,
    withCustom      : PropTypes.bool,
    customFirst     : PropTypes.bool,
    customText      : PropTypes.string,
    customKey       : PropTypes.string,
    hasClear        : PropTypes.bool,
    onClear         : PropTypes.func,
    isSortable      : PropTypes.bool,
    onSort          : PropTypes.func,
    autoFocus       : PropTypes.bool,
    onlyImages      : PropTypes.bool,
    columns         : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    rows            : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    children        : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
InputField.defaultProps = {
    isHidden        : false,
    className       : "",
    type            : InputType.TEXT,
    inputType       : InputType.TEXT,
    placeholder     : "",
    autoComplete    : "off",
    isRequired      : false,
    isDisabled      : false,
    options         : [],
    extraOptions    : [],
    suggestParams   : {},
    fullWidth       : false,
    shrinkLabel     : false,
    isSmall         : false,
    errorBackground : false,
    withNone        : false,
    noneText        : "",
    withCustom      : false,
    customFirst     : false,
    customText      : "",
    customKey       : "",
    hasClear        : false,
    isSortable      : false,
    autoFocus       : false,
    onlyImages      : false,
};

export default InputField;
