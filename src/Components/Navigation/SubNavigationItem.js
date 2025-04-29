import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";

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
        position: absolute;
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
    }
`;



/**
 * The Navigation Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SubNavigationItem(props) {
    const {
        action, isSelected, message, icon, iconColor, afterIcon,
        amount, badge, onAction, onClick, onClose, children,
    } = props;


    // Variables
    const act = Action.get(action);
    const icn = icon    || act.icon;
    const cnt = message || act.message;


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
 * @type {Object} propTypes
 */
SubNavigationItem.propTypes = {
    isHidden   : PropTypes.bool,
    action     : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
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
 * @type {Object} defaultProps
 */
SubNavigationItem.defaultProps = {
    isHidden   : false,
    isSelected : false,
};

export default SubNavigationItem;
