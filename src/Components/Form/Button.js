import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import Href                 from "../../Core/Href";

// Components
import Icon                 from "../Common/Icon";

// Variants
const Variant = {
    NONE            : "none",
    PRIMARY         : "primary",
    CANCEL          : "cancel",
    ERROR           : "error",
    ACCENT          : "accent",
    WHITE           : "white",
    OUTLINED        : "outlined",
    OUTLINED_WHITE  : "outlined-white",
    OUTLINED_ACCENT : "outlined-accent",
    MENU            : "menu",
    ICON            : "icon",
};



// Styles
const Btn = Styled.button.attrs(({ variant, isSmall, fullWidth, withIcon }) => ({ variant, isSmall, fullWidth, withIcon }))`
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    border: none;
    line-height: 1;
    cursor: pointer;
    border-radius: var(--border-radius);
    transition: all 0.5s;
    background: var(--button-background);
    border: 1px solid var(--button-border);
    color: var(--button-font);
    text-transform: uppercase;
    font-size: ${(props) => props.isSmall ? "11px" : "12px"};
    padding: ${(props) => props.isSmall ? "4px 8px" : "8px 16px"};
    width: ${(props) => props.fullWidth ? "100%"    : "auto"};

    --button-font: var(--black-color);
    --button-color: var(--black-color);
    --button-shadow: white;

    ${(props) => props.withIcon ? `
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 12px 4px 8px;
    ` : ""}

    &:disabled,
    &:disabled:hover,
    &:disabled:focus,
    &:disabled:active {
        border-color: #ededed;
        background-color: #ededed;
        color: rgba(21, 28, 41, .48);
        box-shadow: none;
        cursor: not-allowed;
    }
    &:hover,
    &:focus,
    &:active {
        color: var(--button-color);
        box-shadow: inset 0 0 0 2em var(--button-shadow);
        outline: none;
    }

    .btn-preicon {
        font-size: 19px;
        margin-right: 4px;
    }
    .btn-aftericon {
        font-size: 19px;
        margin-left: 4px;
    }

    & + & {
        ${(props) => props.fullWidth ? "margin-top: 8px;" : "margin-left: 8px;"}
    }

    ${(props) => {
        switch (props.variant) {
        case Variant.PRIMARY: return `
            --button-font: white;
            --button-border: var(--primary-color);
            --button-background: var(--primary-color);
        `;
        case Variant.CANCEL: return `
            --button-font: var(--black-color);
            --button-border: rgb(225, 225, 225);
            --button-background: rgb(225, 225, 225);
            --button-shadow: #ededed;
        `;
        case Variant.ERROR: return `
            --button-font: white;
            --button-border: var(--red-color);
            --button-background: var(--red-color);
        `;
        case Variant.ACCENT: return `
            --button-font: white;
            --button-border: var(--accent-color);
            --button-background: var(--accent-color);
        `;
        case Variant.WHITE: return `
            --button-font: black;
            --button-border: var(--primary-color);
            --button-background: white;
            --button-color: white;
            --button-shadow: var(--primary-color);
        `;
        case Variant.OUTLINED: return `
            --button-background: transparent;
            --button-font: var(--primary-color);
            --button-border: var(--primary-color);
            --button-color: white;
            --button-shadow: var(--primary-color);
        `;
        case Variant.OUTLINED_WHITE: return `
            --button-background: transparent;
            --button-font: white;
            --button-border: white;
            --button-color: var(--font-dark);
            --button-shadow: white;
        `;
        case Variant.OUTLINED_ACCENT: return `
            --button-background: transparent;
            --button-font: var(--accent-color);
            --button-border: var(--accent-color);
            --button-color: white;
            --button-shadow: var(--accent-color);
        `;
        case Variant.MENU: return `
            text-transform: none;
            --button-font: var(--lightest-color);
            --button-color: white;
            --button-shadow: rgba(255, 255, 255, 0.05);

            .icon {
                color: var(--lightest-color);
            }

            &:disabled,
            &:disabled:hover,
            &:disabled:focus,
            &:disabled:active {
                color: var(--light-color);
                border-color: transparent;
                background-color: transparent;
            }
            &:disabled .icon {
                color: var(--light-color);
            }
        `;
        default: return "";
        }
    }};
`;



/**
 * The Button Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Button(props) {
    const {
        className, variant, isDisabled, isSmall, fullWidth,
        icon, afterIcon, message, children,
    } = props;

    const content  = children || NLS.get(message);
    const withIcon = Boolean((icon || afterIcon) && variant !== Variant.ICON && !!content);


    return <Btn
        className={`btn ${className}`}
        variant={variant}
        disabled={isDisabled}
        isSmall={isSmall}
        fullWidth={fullWidth}
        withIcon={withIcon}
        onClick={(e) => Href.handleClick(e, props)}
    >
        {!!icon      && <Icon className="btn-preicon" icon={icon} />}
        {!!content   && <span className="btn-content">{content}</span>}
        {!!afterIcon && <Icon className="btn-aftericon" icon={afterIcon} />}
    </Btn>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Button.propTypes = {
    className  : PropTypes.string,
    message    : PropTypes.string,
    variant    : PropTypes.string.isRequired,
    isDisabled : PropTypes.bool,
    isSmall    : PropTypes.bool,
    fullWidth  : PropTypes.bool,
    href       : PropTypes.string,
    url        : PropTypes.string,
    target     : PropTypes.string,
    isEmail    : PropTypes.bool,
    isPhone    : PropTypes.bool,
    isWhatsApp : PropTypes.bool,
    icon       : PropTypes.string,
    afterIcon  : PropTypes.string,
    onClick    : PropTypes.func,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Button.defaultProps = {
    className  : "",
    isDisabled : false,
    isSmall    : false,
    fullWidth  : false,
    href       : "",
    url        : "",
    target     : "_self",
    isEmail    : false,
    isPhone    : false,
    isWhatsApp : false,
};

export default Button;
