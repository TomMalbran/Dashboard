import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import InputType            from "../../Core/InputType";

// Components
import CheckboxInput        from "../InputType/CheckboxInput";
import ChooserInput         from "../InputType/ChooserInput";
import ColorInput           from "../InputType/ColorInput";
import DoubleInput          from "../InputType/DoubleInput";
import FieldInput           from "../InputType/FieldInput";
import FileInput            from "../InputType/FileInput";
import MediaInput           from "../InputType/MediaInput";
import MultipleInput        from "../InputType/MultipleInput";
import NumberInput          from "../InputType/NumberInput";
import PasswordInput        from "../InputType/PasswordInput";
import RadioInput           from "../InputType/RadioInput";
import SelectInput          from "../InputType/SelectInput";
import TextareaInput        from "../InputType/TextareaInput";
import ToggleInput          from "../InputType/ToggleInput";
import TextInput            from "../InputType/TextInput";



/**
 * The Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Input(props) {
    const { type, value, onMedia, fieldButton } = props;

    switch (type) {
    case InputType.CHECKBOX:
        return <CheckboxInput {...props} value="1" isChecked={!!value} />;
    case InputType.CHOOSER:
        return <ChooserInput {...props} />;
    case InputType.COLOR:
        return <ColorInput {...props} />;
    case InputType.DOUBLE:
        return <DoubleInput {...props} />;
    case InputType.FIELDS:
        return <FieldInput {...props} button={fieldButton} />;
    case InputType.FILE:
        return <FileInput {...props} />;
    case InputType.MEDIA:
        return <MediaInput {...props} onClick={onMedia} />;
    case InputType.MULTIPLE:
        return <MultipleInput {...props} />;
    case InputType.NUMBER:
        return <NumberInput {...props} />;
    case InputType.PASSWORD:
        return <PasswordInput {...props} />;
    case InputType.RADIO:
        return <RadioInput {...props} />;
    case InputType.SELECT:
        return <SelectInput {...props} />;
    case InputType.TEXTAREA:
        return <TextareaInput {...props} />;
    case InputType.TOGGLE:
        return <ToggleInput {...props} />;
    default:
        return <TextInput {...props} />;
    }
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Input.propTypes = {
    className    : PropTypes.string,
    id           : PropTypes.string,
    type         : PropTypes.string,
    inputType    : PropTypes.string,
    name         : PropTypes.string,
    label        : PropTypes.string,
    placeholder  : PropTypes.string,
    value        : PropTypes.any,
    minValue     : PropTypes.number,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    isDisabled   : PropTypes.bool,
    withBorder   : PropTypes.bool,
    fieldButton  : PropTypes.string,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    fullWidth    : PropTypes.bool,
    hasLabel     : PropTypes.bool,
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    withCustom   : PropTypes.bool,
    customFirst  : PropTypes.bool,
    customText   : PropTypes.string,
    customKey    : PropTypes.string,
    onChange     : PropTypes.func.isRequired,
    onInput      : PropTypes.func,
    onSubmit     : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
    onMedia      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    onClear      : PropTypes.func,
    inputRef     : PropTypes.object,
    suggestRef   : PropTypes.object,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Input.defaultProps = {
    className    : "",
    type         : InputType.TEXT,
    inputType    : InputType.TEXT,
    placeholder  : "",
    autoComplete : "off",
    isDisabled   : false,
    options      : [],
    extraOptions : [],
    fullWidth    : false,
    withNone     : false,
    noneText     : "",
    withCustom   : false,
    customFirst  : false,
    customText   : "",
    customKey    : "",
};

export default Input;
