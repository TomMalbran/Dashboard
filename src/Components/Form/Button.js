import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

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
    --button-color: var(--black-color);
    --button-border: black;
    --button-background: black;
    --button-hover-color: var(--button-color);
    --button-hover-border: var(--button-border);
    --button-hover-background: white;

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
    color: var(--button-color);
    text-transform: uppercase;
    font-size: ${(props) => props.isSmall ? "10px" : "12px"};
    padding: ${(props) => props.isSmall ? "4px 8px" : "8px 16px"};
    width: ${(props) => props.fullWidth ? "100%" : "auto"};

    ${(props) => props.withIcon ? `
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 12px 4px 8px;
        gap: 4px;
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
        color: var(--button-hover-color);
        box-shadow: inset 0 0 0 2em var(--button-hover-background);
        border-color: var(--button-hover-border);
        outline: none;
    }

    .btn-preicon {
        font-size: ${(props) => props.isSmall ? "15px" : "19px"};
    }
    .btn-aftericon {
        font-size: ${(props) => props.isSmall ? "15px" : "19px"};
    }

    & + & {
        ${(props) => props.fullWidth ? "margin-top: 8px;" : "margin-left: 8px;"}
    }

    ${(props) => {
        switch (props.variant) {
        case Variant.PRIMARY: return `
            --button-color: white;
            --button-border: var(--primary-color);
            --button-background: var(--primary-color);
            --button-hover-color: var(--primary-color);
        `;
        case Variant.CANCEL: return `
            --button-color: var(--black-color);
            --button-border: rgb(225, 225, 225);
            --button-background: rgb(225, 225, 225);
            --button-hover-background: #ededed;
        `;
        case Variant.ERROR: return `
            --button-color: white;
            --button-border: var(--red-color);
            --button-background: var(--red-color);
        `;
        case Variant.ACCENT: return `
            --button-color: white;
            --button-border: var(--accent-color);
            --button-background: var(--accent-color);
        `;
        case Variant.WHITE: return `
            --button-color: var(--primary-color);
            --button-border: white;
            --button-background: white;
            --button-hover-color: white;
            --button-hover-border: var(--primary-color);
            --button-hover-background: var(--primary-color);
        `;
        case Variant.OUTLINED: return `
            --button-color: var(--primary-color);
            --button-border: var(--primary-color);
            --button-background: white;
            --button-hover-color: white;
            --button-hover-background: var(--primary-color);
        `;
        case Variant.OUTLINED_WHITE: return `
            --button-color: white;
            --button-border: white;
            --button-background: transparent;
            --button-hover-color: var(--font-dark);
            --button-hover-background: white;
        `;
        case Variant.OUTLINED_ACCENT: return `
            --button-color: var(--accent-color);
            --button-border: var(--accent-color);
            --button-background: transparent;
            --button-hover-color: white;
            --button-hover-background: var(--accent-color);
        `;
        case Variant.MENU: return `
            text-transform: none;
            --button-color: var(--lightest-color);
            --button-hover-color: white;
            --button-hover-background: rgba(255, 255, 255, 0.05);

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
        passedRef, isHidden, className, variant,
        isDisabled, isSmall, fullWidth,
        icon, afterIcon, message, children,
    } = props;

    const onClick = Navigate.useClick(props);

    if (isHidden) {
        return <React.Fragment />;
    }

    const content  = children || NLS.get(message);
    const withIcon = Boolean((icon || afterIcon) && variant !== Variant.ICON && !!content);

    return <Btn
        ref={passedRef}
        className={`btn ${className}`}
        variant={variant}
        disabled={isDisabled}
        isSmall={isSmall}
        fullWidth={fullWidth}
        withIcon={withIcon}
        onClick={onClick}
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
    isHidden   : PropTypes.bool,
    passedRef  : PropTypes.any,
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
    propagate  : PropTypes.bool,
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
    isHidden   : false,
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
    propagate  : false,
};

export default Button;
