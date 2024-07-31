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
        passedRef, isHidden, className, type, name,
        label, icon, postIcon, autoFocus, value,
        button, onClick, error, helperText,
        onChange, onInput, onFocus, onBlur,
        width, fullWidth, isRequired,
        withLabel, shrinkLabel, errorBackground,
        suggestID, hasClear, hideClear, onClear,
    } = props;


    // The References
    const fieldRef     = React.useRef();
    const inputRef     = passedRef || fieldRef;
    const containerRef = React.useRef();

    // The Current State
    const [ timer,     setTimer ] = React.useState(null);
    const [ isFocused, setFocus ] = React.useState(false);


    // The Input got Focus
    const handleFocus = (e) => {
        setFocus(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    // The Input lost Focus
    const handleBlur = (e) => {
        setTimer(window.setTimeout(() => {
            setFocus(false);
            setTimer(null);
            if (onBlur) {
                onBlur(e);
            }
        }, 200));
    };

    // Handles the Change
    const handleChange = (name, value, secName, secValue, data) => {
        if (onChange) {
            onChange(name, value, secName, secValue, data);
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
        if (suggestID) {
            params = [ name, "", suggestID, 0 ];
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
    }, []);

    // Clear the Timer
    React.useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ timer ]);


    // Variables
    const hasLabel      = Boolean(label && InputType.hasLabel(type));
    const hasValue      = InputType.isValueFilled(type, value);
    const withTransform = !shrinkLabel && InputType.canShrink(type);
    const withValue     = Boolean(hasValue || isFocused);
    const withInsideCnt = !hasLabel || hasValue || isFocused || shrinkLabel;
    const withClear     = hasValue && !hideClear && (hasClear || InputType.hasClear(type));
    const hasError      = Boolean(error);
    const hasHelperText = !hasError && Boolean(helperText);


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
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
        <FieldContent ref={containerRef}>
            <Input
                {...props}
                className="inputfield-input"
                inputRef={inputRef}
                isFocused={isFocused}
                onChange={handleChange}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                icon={withInsideCnt ? icon : undefined}
                postIcon={withInsideCnt ? postIcon : undefined}
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
        {hasHelperText && <FieldHelper>
            {NLS.get(helperText)}
        </FieldHelper>}
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
    onInput         : PropTypes.func,
    onFocus         : PropTypes.func,
    onBlur          : PropTypes.func,
    onSubmit        : PropTypes.func,
    button          : PropTypes.string,
    onClick         : PropTypes.func,
    onKeyDown       : PropTypes.func,
    onKeyUp         : PropTypes.func,
    onMedia         : PropTypes.func,
    suggestID       : PropTypes.string,
    suggestFetch    : PropTypes.func,
    suggestParams   : PropTypes.object,
    suggestWidth    : PropTypes.number,
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
    withLine        : PropTypes.bool,
    withEditor      : PropTypes.bool,
    isSmall         : PropTypes.bool,
    errorBackground : PropTypes.bool,
    generateCode    : PropTypes.bool,
    codeSets        : PropTypes.string,
    codeLength      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    noneText        : PropTypes.string,
    withCustom      : PropTypes.bool,
    customFirst     : PropTypes.bool,
    customText      : PropTypes.string,
    customKey       : PropTypes.string,
    hasClear        : PropTypes.bool,
    hideClear       : PropTypes.bool,
    onClear         : PropTypes.func,
    allowEmpty      : PropTypes.bool,
    isSortable      : PropTypes.bool,
    onSort          : PropTypes.func,
    autoFocus       : PropTypes.bool,
    onlyImages      : PropTypes.bool,
    maxSize         : PropTypes.number,
    onError         : PropTypes.func,
    columns         : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    rows            : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxRows         : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
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
    withCustom      : false,
    customFirst     : false,
    customText      : "",
    customKey       : "",
    hasClear        : false,
    hideClear       : false,
    allowEmpty      : false,
    isSortable      : false,
    autoFocus       : false,
    onlyImages      : false,
};

export default InputField;
