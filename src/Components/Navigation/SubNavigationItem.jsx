import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import Navigate             from "../../Core/Navigate";

// Components
import MenuLink             from "../Link/MenuLink";



// Styles
const NavMenu = Styled(MenuLink)`
    --link-color: var(--navigation-color, var(--title-color));
    --link-background: var(--navigation-hover, rgba(0, 0, 0, 0.1));
    --link-selected-bg: var(--navigation-selected-bg, rgba(0, 0, 0, 0.1));
    --link-selected-color: var(--navigation-selected-color, var(--link-color));

    padding: 5px 8px;
    font-size: 13px;

    & > .link-preicon {
        margin-right: 4px;
    }
    & > .link-aftericon {
        margin-left: 0;
        margin-right: -4px;
    }
`;



/**
 * The Navigation Item Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function SubNavigationItem(props) {
    const {
        action, isSelected, message, url, href, emoji, icon, iconColor, afterIcon,
        amount, badge, onAction, onClick, onClose, children,
    } = props;


    // Variables
    const act     = Action.get(action);
    const icn     = icon    || act.icon;
    const cnt     = message || act.message;
    const menuUrl = Navigate.useMenuUrl(url || "");


    // Handles the Click
    const handleClick = (e) => {
        if (onAction) {
            onAction(act);
        } else if (onClick) {
            onClick(e);
        }
        if (onClose) {
            onClose(e);
        }
        e.preventDefault();
        e.stopPropagation();
    };


    // Do the Render
    return <li>
        <NavMenu
            variant="light"
            isSelected={isSelected}
            message={cnt}
            href={url ? menuUrl : href}
            emoji={emoji}
            icon={icn}
            iconColor={iconColor}
            afterIcon={afterIcon}
            onClick={handleClick}
            amount={amount}
            badge={badge}
        />
        {children}
    </li>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
SubNavigationItem.propTypes = {
    isHidden   : PropTypes.bool,
    action     : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    url        : PropTypes.string,
    href       : PropTypes.string,
    emoji      : PropTypes.string,
    icon       : PropTypes.string,
    iconColor  : PropTypes.string,
    afterIcon  : PropTypes.string,
    amount     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    badge      : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    onAction   : PropTypes.func,
    onClick    : PropTypes.func,
    onClose    : PropTypes.func,
    isSelected : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
SubNavigationItem.defaultProps = {
    isHidden   : false,
    isSelected : false,
};

export default SubNavigationItem;
