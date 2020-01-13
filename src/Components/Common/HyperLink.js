import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Core/Utils
import NLS                  from "../../Core/NLS";
import Href                 from "../../Utils/Href";

// Components
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";

// Variants
const Variant = {
    NONE       : "none",
    PRIMARY    : "primary",
    ACCENT     : "accent",
    BLACK      : "black",
    WHITE      : "white",
    GRAY       : "gray",
    RED        : "red",
    GREEN      : "green",
    IMAGE      : "image",
    OPACITY    : "opacity",
    UNDERLINE  : "underline",
    MENU_LIGHT : "menu-light",
    MENU_DARK  : "menu-dark",
    OUTLINED   : "outlined",
    ICON_LIGHT : "icon-light",
    ICON_DARK  : "icon-dark",
};



// Styles
const Link = Styled.a.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
    position: relative;
    color: var(--link-color);
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover,
    &:focus {
        outline: none;
    }
`;

const ColoredLink = Styled(Link)`
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.2s ease-in-out;
        background-color: var(--link-color);
    }
    &:hover::before,
    &:focus::before {
        visibility: visible;
        transform: scaleX(1);
    }

    &.link-primary {
        --link-color: var(--primary-color);
    }
    &.link-accent {
        --link-color: var(--accent-color);
    }
    &.link-black {
        --link-color: var(--black-color);
    }
    &.link-white {
        --link-color: white;
        font-weight: 200;
    }
    &.link-gray {
        --link-color: var(--gray-color);
        font-weight: 400;
    }
    &.link-red {
        --link-color: var(--red-color);
        font-weight: 600;
    }
    &.link-green {
        --link-color: var(--green-color);
        font-weight: 600;
    }
`;

const ImageLink = Styled(Link)`
    display: block;
    transition: all 0.2s ease-in-out;

    &:hover {
        filter: grayscale(1);
        color: #666;
    }
`;

const OpacityLink = Styled(Link)`
    display: block;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        opacity: 0.5;
    }
`;

const UnderlineLink = Styled(Link)`
    &:hover {
        text-decoration: underline;
    }
`;


const OutlinedLink = Styled(Link)`
    display: flex;
    align-items: center;
    padding: 4px 16px;
    border: 1px solid transparent;
    border-radius: var(--border-radius);
    text-transform: uppercase;
    font-size: 12px;
    
    &:hover {
        border-color: white;
    }
    .link-preicon {
        font-size: 1.7em;
        margin-right: 12px;
    }
    .link-aftericon {
        font-size: 1.7em;
        margin-left: 12px;
    }

    ${(props) => props.isSelected && "border-color: white;"}
`;


const MenuLink = Styled(Link)`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: var(--border-radius);

    .link-preicon {
        font-size: 1.2em;
        margin-right: 12px;
    }
    .link-aftericon {
        font-size: 1.2em;
        margin-left: 12px;
    }
`;

const MenuLight = Styled(MenuLink)`
    color: var(--title-color);
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    ${(props) => props.isSelected && "background-color: rgba(0, 0, 0, 0.1);"}
`;

const MenuDark = Styled(MenuLink)`
    color: var(--lightest-color);
    &:hover {
        color: white;
        background-color: var(--primary-color);
    }
    ${(props) => props.isSelected && `
        color: white;
        background-color: var(--primary-color);
    `}
`;


const IconLink = Styled(Link)`
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 24px;
    text-align: center;
    border-radius: 50%;

    ${(props) => props.isDisabled && `
        color: var(--darker-gray);
        cursor: not-allowed;
        &:hover {
            background-color: transparent;
        }
    `}
`;

const IconLight = Styled(IconLink)`
    --link-color: var(--primary-color);
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const IconDark = Styled(IconLink)`
    --link-color: white;
    &:hover {
        background-color: var(--primary-color);;
    }
`;


const Badge = Styled.span`
    position: absolute;
    top: -2px;
    right: 2px;
    min-width: 14px;
    line-height: 14px;
    font-size: 10px;
    text-align: center;
    border-radius: 999px;
    background-color: var(--white-color);
    color: var(--primary-color);
`;



/**
 * Handles the Click
 * @param {Object}           props
 * @param {React.MouseEvent} e
 * @returns {Void}
 */
function handleClick(props, e) {
    const { isDisabled, onClick, tel, mail, whatsapp, dontStop, history } = props;
    const url     = Href.getUrl(props);
    let   handled = false;

    if (isDisabled) {
        handled = true;
    } else {
        if (onClick) {
            onClick(e);
            handled = true;
        }
        if (!tel && !mail && !whatsapp && Href.handleInternal(url, history)) {
            handled = true;
        }
    }
    if (handled && !dontStop) {
        e.stopPropagation();
        e.preventDefault();
    }
}

/**
 * Returns the Styled Component based on the Variant
 * @param {String} variant
 * @returns {Object}
 */
function getComponent(variant) {
    switch (variant) {
    case Variant.PRIMARY:
    case Variant.ACCENT:
    case Variant.BLACK:
    case Variant.WHITE:
    case Variant.GRAY:
    case Variant.RED:
    case Variant.GREEN:
        return ColoredLink;
    case Variant.IMAGE:
        return ImageLink;
    case Variant.OPACITY:
        return OpacityLink;
    case Variant.UNDERLINE:
        return UnderlineLink;
    case Variant.OUTLINED:
        return OutlinedLink;
    case Variant.MENU_LIGHT:
        return MenuLight;
    case Variant.MENU_DARK:
        return MenuDark;
    case Variant.ICON_LIGHT:
        return IconLight;
    case Variant.ICON_DARK:
        return IconDark;
    default:
        return Link;
    }
}



/**
 * The HyperLink Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function HyperLink(props) {
    const {
        passedRef, variant, className, isSelected, isDisabled,
        target, message, html, children, icon, afterIcon, badge,
        onMouseEnter, onMouseLeave,
    } = props;

    const url        = Href.getUrl(props);
    const Component  = getComponent(variant);
    const content    = children || NLS.get(message);
    const hasContent = Boolean(content && !html);
    
    return <Component
        ref={passedRef}
        className={`link link-${variant} ${className}`}
        isSelected={isSelected}
        isDisabled={isDisabled}
        href={url}
        target={target}
        onClick={(e) => handleClick(props, e)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {!!icon      && <Icon className="link-preicon" icon={icon} />}
        {!!html      && <Html className="link-content" variant="span">{html}</Html>}
        {hasContent  && <span className="link-content">{content}</span>}
        {!!afterIcon && <Icon className="link-aftericon" icon={afterIcon} />}
        {badge > 0   && <Badge>{badge}</Badge>}
    </Component>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
HyperLink.propTypes = {
    history      : PropTypes.object.isRequired,
    message      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    html         : PropTypes.string,
    variant      : PropTypes.string,
    href         : PropTypes.string,
    url          : PropTypes.string,
    target       : PropTypes.string,
    tel          : PropTypes.bool,
    mail         : PropTypes.bool,
    whatsapp     : PropTypes.bool,
    icon         : PropTypes.string,
    afterIcon    : PropTypes.string,
    badge        : PropTypes.number,
    className    : PropTypes.string,
    onClick      : PropTypes.func,
    onMouseEnter : PropTypes.func,
    onMouseLeave : PropTypes.func,
    isSelected   : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    dontStop     : PropTypes.bool,
    passedRef    : PropTypes.any,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
HyperLink.defaultProps = {
    variant    : Variant.PRIMARY,
    href       : "#",
    url        : "",
    target     : "_self",
    badge      : 0,
    className  : "",
    isSelected : false,
    isDisabled : false,
    dontStop   : false,
};

export default withRouter(HyperLink);
