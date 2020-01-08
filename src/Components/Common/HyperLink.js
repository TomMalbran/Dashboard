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



// Styles
const Link = Styled.a`
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

const LightMenuLink = Styled(MenuLink)`
    color: var(--title-color);
    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;
const LightMenuSelected = Styled(LightMenuLink)`
    background-color: rgba(0, 0, 0, 0.08);
`;

const DarkMenuLink = Styled(MenuLink)`
    color: var(--lightest-color);
    &:hover {
        color: white;
        background-color: var(--primary-color);
    }
`;
const DarkMenuSelected = Styled(DarkMenuLink)`
    color: white;
    background-color: var(--primary-color);
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
`;
const OutlinedSelected = Styled(OutlinedLink)`
    border-color: white;
`;


const UnderlineLink = Styled(Link)`
    &:hover {
        text-decoration: underline;
    }
`;


const IconLink = Styled(Link)`
    --link-color: var(--primary-color);
    display: block;
    width: 32px;
    height: 32px;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
const IconDisabled = Styled(IconLink)`
    color: var(--darker-gray);
    cursor: not-allowed;
    &:hover {
        background-color: transparent;
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
 * @param {String}  variant
 * @param {Boolean} isSelected
 * @param {Boolean} isDisabled
 * @returns {Object}
 */
function getComponent(variant, isSelected, isDisabled) {
    switch (variant) {
    case "primary":
    case "accent":
    case "black":
    case "white":
    case "gray":
    case "red":
    case "green":
        return ColoredLink;
    case "menu-light":
        return isSelected ? LightMenuSelected : LightMenuLink;
    case "menu-dark":
        return isSelected ? DarkMenuSelected : DarkMenuLink;
    case "image":
        return ImageLink;
    case "opacity":
        return OpacityLink;
    case "underline":
        return UnderlineLink;
    case "outlined":
        return isSelected ? OutlinedSelected : OutlinedLink;
    case "icon":
        return isDisabled ? IconDisabled : IconLink;
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
        passedRef, variant, className, path, isSelected, isDisabled,
        target, message, html, children, icon, afterIcon, badge,
        onMouseEnter, onMouseLeave,
    } = props;

    const url        = Href.getUrl(props);
    const selected   = isSelected || (path && url === path);
    const Component  = getComponent(variant, selected, isDisabled);
    const content    = children || NLS.get(message);
    const hasContent = Boolean(content && !html);
    
    return <Component
        ref={passedRef}
        className={`link link-${variant} ${className}`}
        href={url}
        target={target}
        onClick={(e) => handleClick(props, e)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {!!icon      && <Icon className="link-preicon" variant={icon} />}
        {!!html      && <Html className="link-content" variant="span">{html}</Html>}
        {hasContent  && <span className="link-content">{content}</span>}
        {!!afterIcon && <Icon className="link-aftericon" variant={afterIcon} />}
        {badge > 0   && <Badge>{badge}</Badge>}
    </Component>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
HyperLink.propTypes = {
    history      : PropTypes.object.isRequired,
    message      : PropTypes.string,
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
    path         : PropTypes.string,
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
    variant    : "primary",
    href       : "#",
    url        : "",
    target     : "_self",
    badge      : 0,
    path       : "",
    className  : "",
    isSelected : false,
    isDisabled : false,
    dontStop   : false,
};

export default withRouter(HyperLink);
