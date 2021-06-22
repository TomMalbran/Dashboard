import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";

// Components
import InputContainer       from "../Input/InputContainer";
import InputLabel           from "../Input/InputLabel";
import Input                from "../Input/Input";
import Icon                 from "../Common/Icon";



// Styles
const InputContent = Styled.div.attrs(({ hasError }) => ({ hasError }))`
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);

    & > div {
        position: relative;
        flex-grow: 1;
    }

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

const InputInput = Styled(Input).attrs(({ width }) => ({ width }))`
    box-sizing: border-box;
    min-height: var(--inputicon-height);
    color: var(--black-color);
    background-color: white;
    border: 1px solid var(--border-color);
    border-top-left-radius: 0px;
    border-top-right-radius: var(--border-radius);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: var(--border-radius);
    transition: all 0.2s;

    &.input {
        appearance: none;
        font-size: var(--inputicon-font);
        width: 100%;
        margin: 0;
        padding: 12px 8px 4px 8px;
    }
    &.input-textarea {
        min-height: var(--inputicon-height);
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
    &.input::placeholder {
        color: rgb(100, 100, 100);
    }

    &.inputfield-pre {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        ${(props) => props.width ? `width: ${props.width}px` : ""};
    }
    &.inputfield-pre + .inputfield-input {
        ${(props) => props.width ? `width: calc(100% - ${props.width}px)` : ""};
    }
`;

const InputIconLabel = Styled(InputLabel).attrs(({ withTransform, withValue }) => ({ withTransform, withValue }))`
    && {
        top: 6px;
        left: 6px;
        font-size: 12px;
        background-color: transparent;

        ${(props) => props.withTransform && `
            transform-origin: top left;
            transform: translateY(var(--inputicon-move));
            font-size: var(--inputicon-font);
        `}
        ${(props) => props.withValue && `
            transform: translateY(0);
            font-size: 12px;
        `}
    }
`;

const InputIcon = Styled(Icon)`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(var(--inputicon-height) - 2px);
    width: calc(var(--inputicon-height) - 2px);
    font-size: var(--inputicon-icon);
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
        isHidden, className, type, icon, autoFocus, value,
        isRequired, error, fullWidth, onChange,
        withLabel, label, placeholder, shrinkLabel, withNone,
        preType, preName, preLabel, prePlaceholder, preValue, preOptions, preWithNone, preWidth,
    } = props;

    const [ isFocused,    setFocus    ] = React.useState(false);
    const [ hasValue,     setValue    ] = React.useState(false);
    const [ isPreFocused, setPreFocus ] = React.useState(false);
    const [ hasPreValue,  setPreValue ] = React.useState(false);

    const inputRef         = React.useRef();

    const hasLabel         = Boolean(withLabel && label && InputType.hasLabel(type));
    const withValue        = isFocused || hasValue || Boolean(value);
    const withTransform    = !shrinkLabel && InputType.canShrink(type, withNone);

    const hasPreInput      = Boolean(preName);
    const hasPreLabel      = Boolean(withLabel && preLabel && InputType.hasLabel(preType));
    const withPreValue     = isPreFocused || hasPreValue || Boolean(preValue);
    const withPreTransform = !shrinkLabel && InputType.canShrink(preType, preWithNone);


    // The Input got Focus
    const handleFocus = () => {
        setFocus(true);
    };

    // The Input lost Focus
    const handleBlur = () => {
        setFocus(false);
    };

    // Handles the Input Change
    const handleChange = (name, value) => {
        setValue(Boolean(value));
        if (onChange) {
            onChange(name, value);
        }
    };


    // The Pre Input got Focus
    const handlePreFocus = () => {
        setPreFocus(true);
    };

    // The Pre Input lost Focus
    const handlePreBlur = () => {
        setPreFocus(false);
    };

    // Handles the Pre Input Change
    const handlePreChange = (name, value) => {
        setPreValue(Boolean(value));
        if (onChange) {
            onChange(name, value);
        }
    };


    // Autofocus
    React.useEffect(() => {
        const node = inputRef.current;
        if (autoFocus && node) {
            node.focus();
        }
        setValue(Boolean(value));
        setPreValue(Boolean(preValue));
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
            {hasPreInput && <div>
                {hasPreLabel && <InputIconLabel
                    className="inputfield-label"
                    isRequired={isRequired}
                    withTransform={withPreTransform}
                    withValue={withPreValue}
                    isFocused={isPreFocused}
                    message={preLabel}
                />}
                <InputInput
                    className="inputfield-input inputfield-pre"
                    type={preType}
                    name={preName}
                    value={preValue}
                    options={preOptions}
                    withNone={preWithNone}
                    placeholder={prePlaceholder}
                    onChange={handlePreChange}
                    onFocus={handlePreFocus}
                    onBlur={handlePreBlur}
                    width={preWidth}
                />
            </div>}
            <div>
                {hasLabel && <InputIconLabel
                    className="inputfield-label"
                    isRequired={isRequired}
                    withTransform={withTransform}
                    withValue={withValue}
                    isFocused={isFocused}
                    message={label}
                />}
                <InputInput
                    {...props}
                    className="inputfield-input"
                    placeholder={placeholder}
                    inputRef={inputRef}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </InputContent>
        {!!error && <InputError>{NLS.get(error)}</InputError>}
    </InputContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
IconField.propTypes = {
    isHidden       : PropTypes.bool,
    className      : PropTypes.string,
    id             : PropTypes.string,
    type           : PropTypes.string,
    name           : PropTypes.string,
    label          : PropTypes.string,
    placeholder    : PropTypes.string,
    icon           : PropTypes.string,
    value          : PropTypes.any,
    autoComplete   : PropTypes.string,
    spellCheck     : PropTypes.string,
    isRequired     : PropTypes.bool,
    isDisabled     : PropTypes.bool,
    onChange       : PropTypes.func.isRequired,
    onSubmit       : PropTypes.func,
    onKeyDown      : PropTypes.func,
    onKeyUp        : PropTypes.func,
    error          : PropTypes.string,
    options        : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions   : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    tabIndex       : PropTypes.string,
    withLabel      : PropTypes.bool,
    fullWidth      : PropTypes.bool,
    shrinkLabel    : PropTypes.bool,
    withNone       : PropTypes.bool,
    noneText       : PropTypes.string,
    withCustom     : PropTypes.bool,
    customFirst    : PropTypes.bool,
    customText     : PropTypes.string,
    autoFocus      : PropTypes.bool,
    preType        : PropTypes.string,
    preName        : PropTypes.string,
    preLabel       : PropTypes.string,
    preValue       : PropTypes.any,
    preOptions     : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    preWithNone    : PropTypes.bool,
    prePlaceholder : PropTypes.string,
    preWidth       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
IconField.defaultProps = {
    isHidden       : false,
    className      : "",
    type           : InputType.TEXT,
    placeholder    : "",
    autoComplete   : "off",
    isRequired     : false,
    isDisabled     : false,
    options        : [],
    extraOptions   : [],
    withLabel      : true,
    fullWidth      : false,
    shrinkLabel    : false,
    withNone       : false,
    noneText       : "",
    withCustom     : false,
    customFirst    : false,
    customText     : "",
    autoFocus      : false,
    preType        : InputType.TEXT,
    preOptions     : [],
    preWithNone    : false,
    prePlaceholder : "",

};

export default IconField;
