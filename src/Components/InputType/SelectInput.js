import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import InputContent         from "../Input/InputContent";



// Styles
const Select = Styled.select`
    box-sizing: border-box;
    appearance: none;
    font-size: var(--input-font);
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    padding-right: 18px !important;
    background-color: transparent;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAICAYAAAAIloRgAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAdElEQVQ4T2P4//8/AyGsLK8ggE8NIXmYXoIWgRQCDbuAy0CQOEiekINB8sRa9h+bhTCLgDTQLMIhRKxlIJ+hWIhsEbV9Bg4qJAsd0Ph445SkOIPGG7KFIF9iDVp8wUlUMMIMQA86YlMhyT5Ds3ABqRaB9AMArxAryYUamQYAAAAASUVORK5CYII=);
    background-position: right -6px center;
    background-size: auto;
    background-repeat: no-repeat;

    &:focus {
        outline: none;
    }
    &:disabled {
        color: var(--input-color-disabled);
    }
`;



/**
 * The Select Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SelectInput(props) {
    const {
        inputRef, className, icon, isFocused, isDisabled, isSmall,
        withBorder, withLabel,
        id, name, value, placeholder,
        withNone, noneText, withCustom, customFirst, customText,
        options, extraOptions, onChange, onClear, onFocus, onBlur,
    } = props;

    const useLabel   = Boolean(placeholder);
    const items      = Array.isArray(options)      ? options      : NLS.select(options);
    const extraItems = Array.isArray(extraOptions) ? extraOptions : NLS.select(extraOptions);

    // Handles the Input Change
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    // Stop other Events
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };


    // Do the Render
    return <InputContent
        inputRef={inputRef}
        className={className}
        icon={icon}
        isFocused={isFocused}
        isDisabled={isDisabled}
        isSmall={isSmall}
        onClear={onClear}
        withBorder={withBorder}
        withLabel={withLabel}
        withPadding
    >
        <Select
            ref={inputRef}
            className="input-select"
            id={id}
            name={name}
            value={value}
            disabled={isDisabled}
            onClick={handleClick}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {useLabel && <option key="placeholder" value="">
                {NLS.get(placeholder)}
            </option>}
            {withNone && <option key="none" value="">
                {NLS.get(noneText || "")}
            </option>}
            {(withCustom && customFirst) && <option key="custom" value={-1}>
                {NLS.get(customText || "GENERAL_CUSTOM")}
            </option>}
            {items.map(({ key, value }) => <option key={key} value={key}>
                {NLS.get(value)}
            </option>)}
            {extraItems.map(({ key, value }) => <option key={key} value={key}>
                {NLS.get(value)}
            </option>)}
            {(withCustom && !customFirst) && <option key="custom" value={-1}>
                {NLS.get(customText || "GENERAL_CUSTOM")}
            </option>}
        </Select>
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SelectInput.propTypes = {
    inputRef     : PropTypes.any,
    className    : PropTypes.string,
    icon         : PropTypes.string,
    isFocused    : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    isSmall      : PropTypes.bool,
    withBorder   : PropTypes.bool,
    withLabel    : PropTypes.bool,
    id           : PropTypes.string,
    name         : PropTypes.string.isRequired,
    placeholder  : PropTypes.string,
    value        : PropTypes.any,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    withCustom   : PropTypes.bool,
    customFirst  : PropTypes.bool,
    customText   : PropTypes.string,
    onChange     : PropTypes.func.isRequired,
    onClear      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SelectInput.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    isSmall     : false,
    withBorder  : true,
    withLabel   : true,
    placeholder : "",
    withNone    : false,
    noneText    : "",
    withCustom  : false,
    customFirst : false,
    customText  : "",
};

export default SelectInput;
