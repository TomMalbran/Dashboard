import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";

// Components
import Input                from "../Input/Input";
import AutoSuggest          from "../Form/AutoSuggest";
import Button               from "../Form/Button";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.div.attrs(
    ({ fullWidth, noMargin, hasLabel, hasError, isFocused }) =>
        ({ fullWidth, noMargin, hasLabel, hasError, isFocused })
)`
    position: relative;
    display: block;

    ${(props) => props.fullWidth && "width: 100%;"}
    ${(props) => !props.noMargin && `
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    `}
    
    ${(props) => props.hasLabel && `
        padding-top: 6px;
        .textfield-input.textfield-input {
            padding-top: 8px;
            min-height: var(--input-height);
            width: 100%;
        }
        textarea {
            min-height: var(--input-height);
            padding-top: 10px;
            padding-bottom: 8px;
        }
    `}
    ${(props) => props.hasError && `
        .textfield-input, textarea,
        .textfield-cnt > .icon {
            border-color: var(--error-color);
        }
    `}
    ${(props) => props.isFocused && `
        .textfield-input {
            border-color: var(--border-color);
            box-shadow: 0 0 0 1px var(--border-color);
        }
        .icon {
            box-shadow: 0 0 0 1px var(--border-color);
        }
    `}
`;
const Content = Styled.div`
    display: flex;
    align-items: center;
`;

const Label = Styled.p.attrs(
    ({ isRequired, withTransform, withValue, isFocused }) =>
        ({ isRequired, withTransform, withValue, isFocused })
)`
    position: absolute;
    top: 0px;
    left: 8px;
    margin: 0;
    padding: 0 4px;
    font-size: 13px;
    line-height: 1;
    background-color: white;
    color: var(--lighter-color);
    transition: all 0.2s;
    pointer-events: none;
    z-index: 1;

    ${(props) => props.isRequired && `
        &::after {
            content: "*";
            margin-left: 4px;
        }
    `}
    ${(props) => props.withTransform && `
        transform-origin: top left;
        transform: translateY(18px) scale(1.1);
    `}
    ${(props) => props.withValue && `
        transform: translateY(0) scale(1);
    `}
    ${(props) => props.isFocused && `
        color: var(--primary-color);
    `}
`;

const Error = Styled.p`
    font-size: 0.8em;
    margin: 4px 0 0 4px;
    color: #ff0033;
`;
const Helper = Styled.p`
    font-size: 0.8em;
    margin: 4px 0 0 4px;
    color: var(--lighter-color);
`;

const TextInput = Styled(Input)`
    box-sizing: border-box;
    min-height: var(--input-height);
    color: var(--black-color);
    background-color: white;
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
    transition: all 0.2s;

    .icon + & {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-color: var(--border-color);
    }
`;
const TextIcon = Styled(Icon)`
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
const TextButton = Styled(Button)`
    margin-left: 16px;
    height: var(--input-height);
`;



/**
 * The Text Field Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextField(props) {
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
    return <Container
        className={`textfield textfield-${type} ${className}`}
        fullWidth={fullWidth}
        noMargin={noMargin}
        hasLabel={hasLabel}
        hasError={!!error}
        isFocused={isFocused}
    >
        {hasLabel && <Label
            className="textfield-label"
            isRequired={isRequired}
            withTransform={withTransform}
            withValue={withValue}
            isFocused={isFocused}
        >
            {NLS.get(label)}
        </Label>}
        <Content className="textfield-cnt">
            {!!icon && <TextIcon icon={icon} />}
            <TextInput
                {...props}
                className="textfield-input"
                inputRef={inputRef}
                suggestRef={suggestRef}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!!button && <TextButton
                variant="outlined"
                message={button}
                onClick={onClick}
            />}
        </Content>
        {hasError  && <Error>{NLS.get(error)}</Error>}
        {hasHelper && <Helper>{NLS.get(helperText)}</Helper>}

        {hasSuggestion && <AutoSuggest
            ref={suggestRef}
            open={isFocused}
            name={name}
            id={suggestID}
            fetch={suggestFetch}
            params={suggestParams}
            onChange={onChange}
        />}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TextField.propTypes = {
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
TextField.defaultProps = {
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

export default TextField;
