import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import Href                 from "../../Core/Href";

// Components
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";
import Badge                from "../Link/Badge";

// Variants
const Variant = {
    NONE     : "none",
    LIGHT    : "light",
    DARK     : "dark",
    OUTLINED : "outlined",
};



// Styles
const Link = Styled.a.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--link-color, black);
    cursor: pointer;

    &:hover, &:focus {
        outline: none;
    }
`;

const NavLink = Styled(Link)`
    padding: 8px 12px;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: var(--link-hover);
        background-color: var(--link-background, transparent);
    }

    .link-preicon {
        font-size: 1.2em;
        margin-right: 8px;
    }
    .link-aftericon {
        font-size: 1.2em;
        margin-left: 8px;
    }
`;

const LightLink = Styled(NavLink)`
    --link-color: var(--title-color);
    --link-hover: var(--title-color);
    --link-background: rgba(0, 0, 0, 0.1);
    ${(props) => props.isSelected && `
        background-color: rgba(0, 0, 0, 0.1);
    `}
    ${(props) => props.isDisabled && `
        cursor: not-allowed;
        --link-color: rgba(63, 87, 100, 0.7);
        --link-hover: rgba(63, 87, 100, 0.7);
        --link-background: transparent;
    `}
`;

const DarkLink = Styled(NavLink)`
    --link-color: var(--lightest-color);
    --link-hover: white;
    --link-background: var(--primary-color);
    ${(props) => props.isSelected && `
        color: white;
        background-color: var(--primary-color);
    `}
    ${(props) => props.isDisabled && `
        cursor: not-allowed;
        --link-color: rgba(255, 255, 255, 0.3);
        --link-hover: rgba(255, 255, 255, 0.3);
        --link-background: transparent;
    `}
`;

const OutlinedLink = Styled(Link)`
    --link-color: white;
    padding: 4px 16px;
    border: 1px solid transparent;
    text-transform: uppercase;
    font-size: 12px;

    &:hover {
        border-color: white;
    }
    .link-preicon {
        font-size: 1.7em;
        margin-right: 8px;
    }
    .link-aftericon {
        font-size: 1.7em;
        margin-left: 8px;
    }

    ${(props) => props.isSelected && "border-color: white;"}
`;

// Components
const Components = {
    [Variant.NONE]     : Link,
    [Variant.LIGHT]    : LightLink,
    [Variant.DARK]     : DarkLink,
    [Variant.OUTLINED] : OutlinedLink,
};



/**
 * The MenuLink Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MenuLink(props) {
    const {
        passedRef, variant, className, isSelected, isDisabled,
        target, message, html, children, icon, afterIcon, badge,
        onMouseEnter, onMouseLeave,
    } = props;

    const Component  = Components[variant] || Link;
    const content    = children || NLS.get(message);
    const hasContent = Boolean(content && !html);

    return <Component
        ref={passedRef}
        className={`link ${className}`}
        isSelected={isSelected}
        isDisabled={isDisabled}
        href={Href.getUrl(props)}
        target={target}
        onClick={Href.useLink(props)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {!!icon      && <Icon className="link-preicon" icon={icon} />}
        {!!html      && <Html className="link-content" variant="span">{html}</Html>}
        {hasContent  && <span className="link-content">{content}</span>}
        {!!afterIcon && <Icon className="link-aftericon" icon={afterIcon} />}
        <Badge value={badge} />
    </Component>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MenuLink.propTypes = {
    className    : PropTypes.string,
    variant      : PropTypes.string,
    message      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    icon         : PropTypes.string,
    afterIcon    : PropTypes.string,
    badge        : PropTypes.number,
    html         : PropTypes.string,
    href         : PropTypes.string,
    url          : PropTypes.string,
    target       : PropTypes.string,
    useBase      : PropTypes.bool,
    isEmail      : PropTypes.bool,
    isPhone      : PropTypes.bool,
    isWhatsApp   : PropTypes.bool,
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
MenuLink.defaultProps = {
    className  : "",
    variant    : Variant.NONE,
    href       : "#",
    url        : "",
    target     : "_self",
    useBase    : false,
    isEmail    : false,
    isPhone    : false,
    isWhatsApp : false,
    badge      : 0,
    isSelected : false,
    isDisabled : false,
    dontStop   : false,
};

export default MenuLink;
