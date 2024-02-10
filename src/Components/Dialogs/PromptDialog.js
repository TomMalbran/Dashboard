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
        isWide, isNarrow, bigSpacing, primary, primaryVariant,
        inputType, inputLabel, inputIcon, placeholder, helperText,
        initialValue, inputOptions, maxLength, rows, maxRows, spellCheck,
        secInputType, secInputLabel, secInputIcon, secPlaceholder,
        secHelperText, secInitialValue, secInputOptions,
        secMaxLength, secRows, secMaxRows,
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


    // Variables
    const isDisabled = !isOptional && !value;
    const hasMessage = !!message;
    const body       = content ? NLS.format(message, content) : NLS.get(message);


    // Do the Render
    return <Dialog
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        isWide={isWide}
        isNarrow={isNarrow}
    >
        <DialogHeader message={title} icon={icon} />
        <DialogBody bigSpacing={bigSpacing} withSpacing>
            <Container>
                {hasMessage && <Content variant="h3">{body}</Content>}
                <InputField
                    name="prompt"
                    type={inputType}
                    label={inputLabel}
                    icon={inputIcon}
                    placeholder={placeholder}
                    helperText={helperText}
                    value={value}
                    options={inputOptions}
                    autoFocus={open}
                    maxLength={maxLength}
                    rows={rows}
                    maxRows={maxRows}
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
                    helperText={secHelperText}
                    value={secValue}
                    options={secInputOptions}
                    maxLength={secMaxLength}
                    rows={secRows}
                    maxRows={secMaxRows}
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
    helperText      : PropTypes.string,
    inputIcon       : PropTypes.string,
    initialValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    inputOptions    : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    rows            : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxRows         : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxLength       : PropTypes.number,
    secInputType    : PropTypes.string,
    secInputLabel   : PropTypes.string,
    secPlaceholder  : PropTypes.string,
    secHelperText   : PropTypes.string,
    secInputIcon    : PropTypes.string,
    secInitialValue : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    secInputOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    secRows         : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    secMaxRows      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    secMaxLength    : PropTypes.number,
    secMinRows      : PropTypes.number,
    isOptional      : PropTypes.bool,
    isLoading       : PropTypes.bool,
    spellCheck      : PropTypes.string,
    isWide          : PropTypes.bool,
    isNarrow        : PropTypes.bool,
    bigSpacing      : PropTypes.bool,
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
    isWide          : false,
    isNarrow        : true,
    bigSpacing      : false,
};

export default PromptDialog;
