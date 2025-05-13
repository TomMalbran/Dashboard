import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";
import Badge                from "../Common/Badge";

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
    padding: 9px 12px;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: var(--link-hover);
        background-color: var(--link-background, transparent);
    }

    .link-preicon {
        font-size: 1.4em;
        height: 1em;
        margin-right: 8px;
    }
    .link-aftericon {
        font-size: 1.4em;
        height: 1em;
        margin-left: 8px;
    }
`;

const LightLink = Styled(NavLink)`
    --link-color: var(--title-color);
    --link-hover: var(--title-color);
    --link-background: rgba(0, 0, 0, 0.07);
    --link-selected-bg: rgba(0, 0, 0, 0.07);
    --link-selected-color: var(--link-color);

    ${(props) => props.isSelected && `
        color: var(--link-selected-color);
        background-color: var(--link-selected-bg);
    `}
    ${(props) => props.isDisabled && `
        cursor: not-allowed;
        --link-color: rgba(63, 87, 100, 0.7);
        --link-hover: rgba(63, 87, 100, 0.7);
        --link-background: transparent;
    `}
`;

const DarkLink = Styled(NavLink)`
    --link-color: var(--darker-gray);
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

const Content = Styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const Amount = Styled.span`
    box-sizing: border-box;
    min-width: 14px;
    margin-left: 8px;
    padding: 0 4px;
    font-size: 10px;
    line-height: 14px;
    border-radius: var(--border-radius-small);
    background-color: rgba(0, 0, 0, 0.07);
`;

const MenuBadge = Styled(Badge)`
    top: 0;
    right: 0;
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
        target, message, html, icon, iconColor, afterIcon, amount, badge,
        onMouseEnter, onMouseLeave, children,
    } = props;


    // Variables
    const Component  = Components[variant] || Link;
    const content    = children || NLS.get(message);
    const hasContent = Boolean(content && !html);
    const hasAmount  = amount !== undefined;


    // Do the Render
    return <Component
        ref={passedRef}
        className={`link ${className}`}
        isSelected={isSelected}
        isDisabled={isDisabled}
        href={Navigate.getUrl(props)}
        target={target}
        onClick={Navigate.useLink(props)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <Content>
            {!!icon && <Icon
                className="link-preicon"
                icon={icon}
                color={iconColor}
            />}
            {!!html && <Html
                className="link-content"
                variant="span"
                content={html}
            />}
            {hasContent && <span className="link-content">
                {content}
            </span>}
            {hasAmount && <Amount className="link-amount">
                {amount}
            </Amount>}
        </Content>

        {!!afterIcon && <Icon
            className="link-aftericon"
            icon={afterIcon}
        />}
        <MenuBadge value={badge} />
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
    iconColor    : PropTypes.string,
    afterIcon    : PropTypes.string,
    amount       : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    badge        : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
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
