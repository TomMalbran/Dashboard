import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";
import InputType            from "../../Core/InputType";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogFooter         from "../Dialog/DialogFooter";
import Html                 from "../Common/Html";
import InputField           from "../Form/InputField";



/**
 * The Prompt Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PromptDialog(props) {
    const {
        open, title, message, content, icon,
        inputType, inputLabel, inputIcon, placeholder, initialValue, spellCheck,
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
        }
    };

    // Update the Initial Value
    React.useEffect(() => {
        setValue(initialValue);
    }, [ initialValue ]);


    const isDisabled = !isOptional && !value;
    const hasMessage = !!message;
    const body       = content ? NLS.format(message, content) : NLS.get(message);

    return <Dialog open={open} onClose={onClose} isNarrow>
        <DialogHeader message={title} icon={icon} />
        <DialogBody withSpacing>
            {hasMessage && <Html variant="h3">
                {body}
            </Html>}
            <InputField
                name="prompt"
                type={inputType}
                label={inputLabel}
                icon={inputIcon}
                placeholder={placeholder}
                value={value}
                autoFocus={open}
                onChange={handleChange}
                onSubmit={handleSubmit}
                spellCheck={spellCheck}
                isRequired
                noMargin
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
    onSubmit     : PropTypes.func.isRequired,
    onClose      : PropTypes.func.isRequired,
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
    isOptional   : false,
};

export default PromptDialog;
