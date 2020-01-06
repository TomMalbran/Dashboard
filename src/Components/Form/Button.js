import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Href                 from "../../Utils/Href";

// Components
import Icon                 from "../Common/Icon";




// Styles
const Btn = Styled.button.attrs(({ isSmall, fullWidth, withIcon }) => ({ isSmall, fullWidth, withIcon }))`
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

    & + & {
        ${(props) => props.fullWidth ? "margin-top: 8px;" : "margin-left: 8px;"}
    }
`;

const PrimaryBtn = Styled(Btn)`
    --button-font: white;
    --button-border: var(--primary-color);
    --button-background: var(--primary-color);
`;

const CancelBtn = Styled(Btn)`
    --button-font: var(--black-color);
    --button-border: rgb(225, 225, 225);
    --button-background: rgb(225, 225, 225);
    --button-shadow: #ededed;
`;

const ErrorBtn = Styled(Btn)`
    --button-font: white;
    --button-border: var(--red-color);
    --button-background: var(--red-color);
`;

const AccentBtn = Styled(Btn)`
    --button-font: white;
    --button-border: var(--accent-color);
    --button-background: var(--accent-color);
`;

const WhiteBtn = Styled(Btn)`
    --button-font: black;
    --button-border: var(--primary-color);
    --button-background: white;
    --button-color: white;
    --button-shadow: var(--primary-color);
`;

const MenuBtn = Styled(Btn)`
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

const OutlinedBtn = Styled(Btn)`
    --button-background: transparent;
    --button-font: var(--primary-color);
    --button-border: var(--primary-color);
    --button-color: white;
    --button-shadow: var(--primary-color);
`;

const OutlinedWhiteBtn = Styled(Btn)`
    --button-background: transparent;
    --button-font: white;
    --button-border: white;
    --button-color: var(--font-dark);
    --button-shadow: white;
`;



/**
 * Handles the Click
 * @param {Object} props
 * @param {React.MouseEvent} e
 * @returns {Void}
 */
function handleClick(props, e) {
    const { onClick, href, url, target, history } = props;
    const uri = url ? NLS.url(url) : href;
    
    if (onClick) {
        onClick(e);
    }
    Href.handle(uri, target, history);
    e.stopPropagation();
    e.preventDefault();
}

/**
 * Returns the Styled Component based on the Variant
 * @param {String} variant
 * @returns {Object}
 */
function getComponent(variant) {
    switch (variant) {
    case "primary":
        return PrimaryBtn;
    case "cancel":
        return CancelBtn;
    case "error":
        return ErrorBtn;
    case "accent":
        return AccentBtn;
    case "white":
        return WhiteBtn;
    case "menu":
        return MenuBtn;
    case "outlined":
        return OutlinedBtn;
    case "outlinedWhite":
        return OutlinedWhiteBtn;
    default:
        return Btn;
    }
}



/**
 * The Button Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Button(props) {
    const { className, message, variant, isDisabled, isSmall, fullWidth, icon, children } = props;

    const Component = getComponent(variant);
    const content   = children || NLS.get(message);
    const withIcon  = Boolean(icon && variant !== "icon" && !!content);

    return <Component
        className={`btn btn-${variant} ${className}`}
        disabled={isDisabled}
        isSmall={isSmall}
        fullWidth={fullWidth}
        withIcon={withIcon}
        onClick={(e) => handleClick(props, e)}
    >
        {!!icon    && <Icon variant={icon} className="btn-preicon" />}
        {!!content && <span className="btn-content">{content}</span>}
    </Component>;
}
    
/**
 * The Property Types
 * @type {Object} propTypes
 */
Button.propTypes = {
    history    : PropTypes.object.isRequired,
    className  : PropTypes.string,
    message    : PropTypes.string,
    variant    : PropTypes.string.isRequired,
    isDisabled : PropTypes.bool,
    isSmall    : PropTypes.bool,
    fullWidth  : PropTypes.bool,
    href       : PropTypes.string,
    url        : PropTypes.string,
    target     : PropTypes.string,
    icon       : PropTypes.string,
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
};

export default withRouter(Button);
