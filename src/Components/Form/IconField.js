import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import InputType            from "../../Core/InputType";

// Components
import InputContainer       from "../Input/InputContainer";
import InputLabel           from "../Input/InputLabel";
import InputError           from "../Input/InputError";
import Input                from "../Input/Input";
import Icon                 from "../Common/Icon";



// Styles
const FieldContainer = Styled(InputContainer).attrs(({ isFocused }) => ({ isFocused }))`
    &&, .inputfield {
        --input-border: var(--border-color-dark);
    }

    ${(props) => props.isFocused && `
        --input-border: var(--input-border-focus);
        box-shadow: 0 0 0 1px var(--border-color-dark);
        border-radius: var(--border-radius);
    `}
`;

const FieldContent = Styled.div.attrs(({ hasError }) => ({ hasError }))`
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
        .input-content {
            border-bottom-right-radius: 0;
        }
    `}
`;

const FieldInput = Styled(Input)`
    min-height: var(--inputicon-height);
    color: var(--black-color);
    background-color: var(--white-color);
    border-top-left-radius: 0px;
    border-top-right-radius: var(--border-radius);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: var(--border-radius);

    &.input-textarea {
        min-height: var(--inputicon-height);
    }
`;

const FieldLabel = Styled(InputLabel).attrs(({ withTransform, withValue }) => ({ withTransform, withValue }))`
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

const FieldIcon = Styled(Icon)`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(var(--inputicon-height) - 2px);
    width: calc(var(--inputicon-height) - 2px);
    font-size: var(--inputicon-icon);
    color: white;
    background-color: var(--primary-color);
    border: 1px solid var(--input-border);
    border-right: none;
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    transition: all 0.2s;
`;



/**
 * The Icon Field Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function IconField(props) {
    const {
        passedRef, isHidden, className, type, icon, autoFocus, value,
        isRequired, error, fullWidth, onChange, onFocus, onBlur,
        withLabel, label, placeholder, shrinkLabel,
    } = props;

    // The Current State
    const [ isFocused, setFocus    ] = React.useState(false);
    const [ hasValue,  setHasValue ] = React.useState(false);

    const fieldRef = React.useRef();
    const inputRef = passedRef || fieldRef;


    // The Input got Focus
    const handleFocus = () => {
        setFocus(true);
        if (onFocus) {
            onFocus();
        }
    };

    // The Input lost Focus
    const handleBlur = () => {
        setFocus(false);
        if (onBlur) {
            onBlur();
        }
    };

    // Handles the Input Change
    const handleChange = (name, value) => {
        setHasValue(InputType.isValueFilled(type, value));
        if (onChange) {
            onChange(name, value);
        }
    };


    // Autofocus
    React.useEffect(() => {
        const node = inputRef.current;
        if (autoFocus && node) {
            // @ts-ignore
            node.focus();
        }
        setHasValue(InputType.isValueFilled(type, value));
    }, []);


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }

    const hasLabel      = Boolean(withLabel && label && InputType.hasLabel(type));
    const withValue     = isFocused || hasValue || Boolean(value);
    const withTransform = !shrinkLabel && InputType.canShrink(type);
    const hasError      = Boolean(error);

    return <FieldContainer
        className={`inputfield inputfield-${type} ${className}`}
        fullWidth={fullWidth}
        hasError={hasError}
        isFocused={isFocused}
    >
        <FieldContent hasError={hasError}>
            <FieldIcon icon={icon} />
            <div>
                {hasLabel && <FieldLabel
                    className="inputfield-label"
                    isRequired={isRequired}
                    withTransform={withTransform}
                    withValue={withValue}
                    isFocused={isFocused}
                    message={label}
                />}
                <FieldInput
                    {...props}
                    className="inputfield-input"
                    type={type}
                    icon=""
                    placeholder={placeholder}
                    inputRef={inputRef}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </FieldContent>
        <InputError error={error} useBackground />
    </FieldContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
IconField.propTypes = {
    passedRef    : PropTypes.any,
    isHidden     : PropTypes.bool,
    className    : PropTypes.string,
    id           : PropTypes.string,
    type         : PropTypes.string,
    name         : PropTypes.string,
    label        : PropTypes.string,
    placeholder  : PropTypes.string,
    icon         : PropTypes.string,
    value        : PropTypes.any,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    isRequired   : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    onChange     : PropTypes.func.isRequired,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    onSubmit     : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
    error        : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noneText     : PropTypes.string,
    noneValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    withLabel    : PropTypes.bool,
    fullWidth    : PropTypes.bool,
    shrinkLabel  : PropTypes.bool,
    withCustom   : PropTypes.bool,
    customFirst  : PropTypes.bool,
    customText   : PropTypes.string,
    autoFocus    : PropTypes.bool,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
IconField.defaultProps = {
    isHidden     : false,
    className    : "",
    type         : InputType.TEXT,
    placeholder  : "",
    autoComplete : "off",
    isRequired   : false,
    isDisabled   : false,
    options      : [],
    extraOptions : [],
    withLabel    : true,
    fullWidth    : false,
    shrinkLabel  : false,
    noneText     : "",
    withCustom   : false,
    customFirst  : false,
    customText   : "",
    autoFocus    : false,
};

export default IconField;
