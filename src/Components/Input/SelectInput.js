import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Select = Styled.select`
    text-indent: 0.01px;
    margin: 0;
    padding: 4px 24px 4px 8px;
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
        options, extraOptions, withNone, noneText, withCustom, customText,
        onChange, onFocus, onBlur, inputRef,
    } = props;

    // Stop other Events
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };


    return <Select
        className={className}
        id={id}
        ref={inputRef}
        name={name}
        value={value}
        disabled={isDisabled}
        onClick={handleClick}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
    >
        {withNone && <option key="0" value="">
            {NLS.get(noneText || "")}
        </option>}
        {options.map(({ key, value }) => <option key={key} value={key}>
            {NLS.get(value)}
        </option>)}
        {extraOptions.map(({ key, value }) => <option key={key} value={key}>
            {NLS.get(value)}
        </option>)}
        {withCustom && <option key="-1" value={-1}>
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
    value        : PropTypes.any,
    isDisabled   : PropTypes.bool,
    tabIndex     : PropTypes.string,
    options      : PropTypes.array,
    extraOptions : PropTypes.array,
    withNone     : PropTypes.bool,
    noneText     : PropTypes.string,
    withCustom   : PropTypes.bool,
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
    className : "",
    id        : "",
};

export default SelectInput;
