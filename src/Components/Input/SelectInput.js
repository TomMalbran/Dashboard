import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Select = Styled.select`
    text-indent: 0.01px;
    margin: 0;
    padding-right: 24px !important;
    background-color: transparent;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAICAYAAAAIloRgAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAdElEQVQ4T2P4//8/AyGsLK8ggE8NIXmYXoIWgRQCDbuAy0CQOEiekINB8sRa9h+bhTCLgDTQLMIhRKxlIJ+hWIhsEbV9Bg4qJAsd0Ph445SkOIPGG7KFIF9iDVp8wUlUMMIMQA86YlMhyT5Ds3ABqRaB9AMArxAryYUamQYAAAAASUVORK5CYII=);
    background-position: right center;
    background-size: auto;
    background-repeat: no-repeat;
`;



/**
 * The Select Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SelectInput(props) {
    const {
        className, id, name, value, isDisabled, tabIndex,
        placeholder, withNone, noneText,
        withCustom, customFirst, customText,
        options, extraOptions,
        onChange, onFocus, onBlur, inputRef,
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


    return <Select
        className={`input input-select ${className}`}
        id={id}
        ref={inputRef}
        name={name}
        value={value}
        disabled={isDisabled}
        onClick={handleClick}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
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
    </Select>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SelectInput.propTypes = {
    className    : PropTypes.string,
    id           : PropTypes.string,
    name         : PropTypes.string.isRequired,
    placeholder  : PropTypes.string,
    value        : PropTypes.any,
    isDisabled   : PropTypes.bool,
    tabIndex     : PropTypes.string,
    options      : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    extraOptions : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    withCustom   : PropTypes.bool,
    customFirst  : PropTypes.bool,
    customText   : PropTypes.string,
    onChange     : PropTypes.func.isRequired,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    inputRef     : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SelectInput.defaultProps = {
    className   : "",
    placeholder : "",
    isDisabled  : false,
    withNone    : false,
    noneText    : "",
    withCustom  : false,
    customFirst : false,
    customText  : "",
};

export default SelectInput;
