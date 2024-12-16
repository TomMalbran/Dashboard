import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";
import Store                from "../../Core/Store";

// Components
import Icon                 from "../Common/Icon";
import CircularLoader       from "../Loader/CircularLoader";

// Variants
const Variant = {
    NONE            : "none",
    PRIMARY         : "primary",
    CANCEL          : "cancel",
    SUCCESS         : "success",
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
const Btn = Styled.button.attrs(({ variant, isSmall, fullWidth, isLoading, withMark, withIcon, onlyIcon, smallRadius }) => ({ variant, isSmall, fullWidth, isLoading, withMark, withIcon, onlyIcon, smallRadius }))`
    --button-color: var(--black-color);
    --button-border: black;
    --button-background: black;
    --button-hover-color: var(--button-color);
    --button-hover-border: var(--button-border);
    --button-hover-background: white;

    position: relative;
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    border: none;
    line-height: 1;
    background: var(--button-background);
    border: 1px solid var(--button-border);
    color: var(--button-color);
    text-transform: uppercase;
    border-radius: ${(props) => props.smallRadius ? "var(--border-radius-small)" : "var(--border-radius)"};
    font-size: ${(props) => props.isSmall ? "10px" : "12px"};
    padding: ${(props) => props.isSmall ? "4px 8px" : "8px 16px"};
    width: ${(props) => props.fullWidth ? "100%" : "auto"};
    transition: box-shadow 0.5s, color 0.5s, background-color 0.5s, border-color 0.5s;
    cursor: pointer;

    ${(props) => (props.withIcon || props.isLoading) && `
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 12px 5px 8px;
        gap: 4px;
    `}
    ${(props) => props.onlyIcon && `
        padding: 4px 8px;
    `}

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

    &:hover .btn-loader,
    &:focus .btn-loader,
    &:active .btn-loader {
        --loader-border-color: var(--button-hover-color);
        --loader-font-color: var(--button-hover-color);
    }

    .btn-preicon {
        height: ${(props) => props.isSmall ? "14px" : "18px"};
        font-size: ${(props) => props.isSmall ? "14px" : "18px"};
    }
    .btn-aftericon {
        height: ${(props) => props.isSmall ? "14px" : "18px"};
        font-size: ${(props) => props.isSmall ? "14px" : "18px"};
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
            --button-border: var(--light-gray);
            --button-background: var(--light-gray);
            --button-hover-background: var(--lighter-gray);
        `;
        case Variant.SUCCESS: return `
            --button-color: white;
            --button-border: var(--success-color);
            --button-background: var(--success-color);
            --button-hover-color: var(--success-color);
        `;
        case Variant.ERROR: return `
            --button-color: white;
            --button-border: var(--error-color);
            --button-background: var(--error-color);
            --button-hover-color: var(--error-color);
        `;
        case Variant.ACCENT: return `
            --button-color: white;
            --button-border: var(--accent-color);
            --button-background: var(--accent-color);
            --button-hover-color: var(--accent-color);
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
            --button-border: var(--primary-border, var(--primary-color));
            --button-background: white;
            --button-hover-color: white;
            --button-hover-border: var(--primary-color);
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

    ${(props) => props.withMark && `
        &::after {
            content: "";
            position: absolute;
            top: -3px;
            right: -3px;
            width: 11px;
            height: 11px;
            border-radius: 100%;
            background-color: red;
        }
    `}
`;

const Badge = Styled.span`
    position: absolute;
    top: -5px;
    right: -5px;
    padding: 2px 4px;
    font-size: 11px;
    color: white;
    background-color: #ff0033;
    border-radius: 9999px;
`;



/**
 * The Button Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Button(props) {
    const {
        passedRef, isHidden, className, variant,
        isDisabled, isSmall, fullWidth, isLoading,
        icon, afterIcon, message, badge, withMark,
        tooltip, tooltipVariant, children,
    } = props;

    const defaultRef = React.useRef();
    const elementRef = passedRef || defaultRef;

    const onClick    = Navigate.useClick(props);
    const { showTooltip, hideTooltip } = Store.useAction("core");

    // Handles the Tooltip
    const handleTooltip = () => {
        if (tooltip) {
            showTooltip(elementRef, tooltipVariant, tooltip);
        }
    };


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }

    const content     = children || NLS.get(message);
    const withIcon    = Boolean((icon || afterIcon) && variant !== Variant.ICON && !!content);
    const onlyIcon    = Boolean((icon || afterIcon) && variant !== Variant.ICON && !content);
    const smallRadius = Boolean(isSmall && !icon && !afterIcon);

    return <Btn
        ref={passedRef}
        className={`btn ${className}`}
        variant={variant}
        disabled={isDisabled}
        isSmall={isSmall}
        fullWidth={fullWidth}
        isLoading={isLoading}
        withMark={withMark}
        withIcon={withIcon}
        onlyIcon={onlyIcon}
        smallRadius={smallRadius}
        onClick={onClick}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    >
        {!!icon && <Icon
            className="btn-preicon"
            icon={icon}
        />}
        {!!content && <span className="btn-content">
            {content}
        </span>}
        {!!afterIcon && <Icon
            className="btn-aftericon"
            icon={afterIcon}
        />}
        {isLoading && <CircularLoader
            className="btn-loader"
            isTiny
        />}
        {!!badge && <Badge className="btn-badge">
            {badge}
        </Badge>}
    </Btn>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Button.propTypes = {
    isHidden       : PropTypes.bool,
    passedRef      : PropTypes.any,
    className      : PropTypes.string,
    variant        : PropTypes.string.isRequired,
    message        : PropTypes.string,
    tooltip        : PropTypes.string,
    tooltipVariant : PropTypes.string,
    isDisabled     : PropTypes.bool,
    isSmall        : PropTypes.bool,
    fullWidth      : PropTypes.bool,
    isLoading      : PropTypes.bool,
    badge          : PropTypes.number,
    withMark       : PropTypes.bool,
    href           : PropTypes.string,
    url            : PropTypes.string,
    target         : PropTypes.string,
    isEmail        : PropTypes.bool,
    isPhone        : PropTypes.bool,
    isWhatsApp     : PropTypes.bool,
    propagate      : PropTypes.bool,
    icon           : PropTypes.string,
    afterIcon      : PropTypes.string,
    onClick        : PropTypes.func,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Button.defaultProps = {
    isHidden       : false,
    className      : "",
    tooltip        : "",
    tooltipVariant : "bottom",
    isDisabled     : false,
    isSmall        : false,
    fullWidth      : false,
    badge          : 0,
    withMark       : false,
    href           : "",
    url            : "",
    target         : "_self",
    isEmail        : false,
    isPhone        : false,
    isWhatsApp     : false,
    propagate      : false,
};

export default Button;
