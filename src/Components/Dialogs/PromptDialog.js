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
const Content = Styled(Html)`
    margin: 0 0 16px 0;
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
        open, title, message, content, icon, lightHeader,
        inputType, inputLabel, inputIcon, placeholder, initialValue, inputOptions, spellCheck,
        isOptional, onSubmit, onClose,
    } = props;

    const [ value, setValue ] = React.useState(initialValue);

    // Handles the Input Change
    const handleChange = (name, value) => {
        setValue(value);
    };

    // Handles the Submit
    const handleSubmit = () => {
        if (isOptional || value) {
            onSubmit(value);
            setValue("");
        }
    };

    // Update the Initial Value
    React.useEffect(() => {
        setValue(initialValue);
    }, [ initialValue ]);


    // Do the Render
    const isDisabled = !isOptional && !value;
    const hasMessage = !!message;
    const body       = content ? NLS.format(message, content) : NLS.get(message);

    return <Dialog open={open} onClose={onClose} isNarrow>
        <DialogHeader
            message={title}
            icon={icon}
            lightHeader={lightHeader}
        />
        <DialogBody withSpacing>
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
                onChange={handleChange}
                onSubmit={handleSubmit}
                spellCheck={spellCheck}
                isRequired
                withNone
            />
        </DialogBody>
        <DialogFooter
            primary="GENERAL_SAVE"
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
    open         : PropTypes.bool.isRequired,
    title        : PropTypes.string.isRequired,
    message      : PropTypes.string,
    content      : PropTypes.string,
    placeholder  : PropTypes.string,
    icon         : PropTypes.string,
    inputType    : PropTypes.string,
    inputLabel   : PropTypes.string,
    inputIcon    : PropTypes.string,
    initialValue : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    inputOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    onSubmit     : PropTypes.func.isRequired,
    onClose      : PropTypes.func.isRequired,
    lightHeader  : PropTypes.bool,
    isOptional   : PropTypes.bool,
    spellCheck   : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
PromptDialog.defaultProps = {
    inputType    : InputType.TEXT,
    initialValue : "",
    lightHeader  : false,
    isOptional   : false,
};

export default PromptDialog;
