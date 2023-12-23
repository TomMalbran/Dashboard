import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogFooter         from "../Dialog/DialogFooter";
import InputField           from "../Form/InputField";
import Html                 from "../Common/Html";



// Styles
const Container = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Content = Styled(Html)`
    margin: 0;
    color: var(--black-color);
    font-weight: 400;
`;



/**
 * The Prompt Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PromptDialog(props) {
    const {
        open, title, message, content, icon, isLoading,
        primary, primaryVariant, lightHeader,
        inputType, inputLabel, inputIcon, placeholder,
        initialValue, inputOptions, maxLength, spellCheck,
        secInputType, secInputLabel, secInputIcon,
        secPlaceholder, secInitialValue, secInputOptions, secMaxLength,
        isOptional, onSubmit, onClose,
    } = props;


    // The Current State
    const [ value,    setValue    ] = React.useState(initialValue);
    const [ secValue, setSecValue ] = React.useState(secInitialValue);


    // Handles the Input Change
    const handleChange = (name, value) => {
        if (name === "prompt") {
            setValue(value);
        } else {
            setSecValue(value);
        }
    };

    // Handles the Submit
    const handleSubmit = () => {
        if (isOptional || value) {
            onSubmit(value, secValue);
            setValue("");
            setSecValue("");
        }
    };

    // Update the Initial Value
    React.useEffect(() => {
        setValue(initialValue);
        setSecValue(secInitialValue);
    }, [ initialValue, secInitialValue ]);


    // Do the Render
    const isDisabled = !isOptional && !value;
    const hasMessage = !!message;
    const body       = content ? NLS.format(message, content) : NLS.get(message);

    return <Dialog
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        isNarrow
    >
        <DialogHeader
            message={title}
            icon={icon}
            lightHeader={lightHeader}
        />
        <DialogBody withSpacing>
            <Container>
                {hasMessage && <Content variant="h3">{body}</Content>}
                <InputField
                    name="prompt"
                    type={inputType}
                    label={inputLabel}
                    icon={inputIcon}
                    placeholder={placeholder}
                    value={value}
                    options={inputOptions}
                    autoFocus={open}
                    maxLength={maxLength}
                    spellCheck={spellCheck}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isRequired={!isOptional}
                    withNone
                />
                <InputField
                    isHidden={!secInputLabel}
                    name="secPrompt"
                    type={secInputType}
                    label={secInputLabel}
                    icon={secInputIcon}
                    placeholder={secPlaceholder}
                    value={secValue}
                    options={secInputOptions}
                    maxLength={secMaxLength}
                    spellCheck={spellCheck}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    withNone
                />
            </Container>
        </DialogBody>
        <DialogFooter
            primary={primary}
            primaryVariant={primaryVariant}
            onSubmit={handleSubmit}
            isDisabled={isDisabled}
        />
    </Dialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PromptDialog.propTypes = {
    open            : PropTypes.bool.isRequired,
    title           : PropTypes.string.isRequired,
    message         : PropTypes.string,
    content         : PropTypes.string,
    icon            : PropTypes.string,
    primary         : PropTypes.string,
    primaryVariant  : PropTypes.string,
    inputType       : PropTypes.string,
    inputLabel      : PropTypes.string,
    placeholder     : PropTypes.string,
    inputIcon       : PropTypes.string,
    initialValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    inputOptions    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    maxLength       : PropTypes.number,
    secInputType    : PropTypes.string,
    secInputLabel   : PropTypes.string,
    secPlaceholder  : PropTypes.string,
    secInputIcon    : PropTypes.string,
    secInitialValue : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    secInputOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    secMaxLength    : PropTypes.number,
    isOptional      : PropTypes.bool,
    isLoading       : PropTypes.bool,
    lightHeader     : PropTypes.bool,
    spellCheck      : PropTypes.string,
    onSubmit        : PropTypes.func.isRequired,
    onClose         : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
PromptDialog.defaultProps = {
    primary         : "GENERAL_SAVE",
    inputType       : InputType.TEXT,
    initialValue    : "",
    secInputType    : InputType.TEXT,
    secInitialValue : "",
    isOptional      : false,
    isLoading       : false,
    lightHeader     : false,
};

export default PromptDialog;
