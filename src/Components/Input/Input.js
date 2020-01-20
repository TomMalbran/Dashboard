import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import InputType            from "../../Core/InputType";

// Components
import TextareaInput        from "./TextareaInput";
import SelectInput          from "./SelectInput";
import CheckboxInput        from "./CheckboxInput";
import RadioInput           from "./RadioInput";
import ToggleInput          from "./ToggleInput";
import MultipleInput        from "./MultipleInput";
import FileInput            from "./FileInput";
import FieldInput           from "./FieldInput";
import MediaInput           from "./MediaInput";
import NumberInput          from "./NumberInput";
import ColorInput           from "./ColorInput";
import TextInput            from "./TextInput";



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
    case InputType.RADIO:
        return <RadioInput {...props} />;
    case InputType.TOGGLE:
        return <ToggleInput {...props} />;
    case InputType.MULTIPLE:
        return <MultipleInput {...props} />;
    case InputType.FILE:
        return <FileInput {...props} />;
    case InputType.MEDIA:
        return <MediaInput {...props} onClick={onMedia} />;
    case InputType.FIELDS:
        return <FieldInput {...props} button={fieldButton} />;
    case InputType.NUMBER:
        return <NumberInput {...props} />;
    case InputType.COLOR:
        return <ColorInput {...props} />;
    case InputType.SELECT:
        return <SelectInput {...props} />;
    case InputType.TEXTAREA:
        return <TextareaInput {...props} />;
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
    name         : PropTypes.string,
    label        : PropTypes.string,
    placeholder  : PropTypes.string,
    value        : PropTypes.any,
    autoComplete : PropTypes.string,
    spellCheck   : PropTypes.string,
    isDisabled   : PropTypes.bool,
    fieldButton  : PropTypes.string,
    options      : PropTypes.array,
    extraOptions : PropTypes.array,
    tabIndex     : PropTypes.string,
    fullWidth    : PropTypes.bool,
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    withCustom   : PropTypes.bool,
    customText   : PropTypes.string,
    onChange     : PropTypes.func.isRequired,
    onSubmit     : PropTypes.func,
    onKeyDown    : PropTypes.func,
    onKeyUp      : PropTypes.func,
    onMedia      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
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
    autoComplete : "off",
    isDisabled   : false,
    options      : [],
    extraOptions : [],
    fullWidth    : false,
    withNone     : false,
    noneText     : "",
    withCustom   : false,
    customText   : "",
};

export default Input;
