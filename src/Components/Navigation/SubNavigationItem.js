import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";

// Components
import MenuLink             from "../Link/MenuLink";



// Styles
const Li = Styled.li.attrs(({ topBorder }) => ({ topBorder }))`
    ${(props) => props.topBorder && `
        border-top: 1px solid var(--border-color);
        padding-top: 4px;
        margin-top: 4px;
    `}
`;

const NavigationLink = Styled(MenuLink)`
    padding: 4px;
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
    const { variant, action, isSelected, message, icon, afterIcon, topBorder, onAction, onClick, onClose, children } = props;
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

    return <Li topBorder={topBorder}>
        <NavigationLink
            variant={variant}
            isSelected={isSelected}
            message={cnt}
            icon={icn}
            afterIcon={afterIcon}
            onClick={handleClick}
        />
        {children}
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SubNavigationItem.propTypes = {
    isHidden   : PropTypes.bool,
    variant    : PropTypes.string,
    action     : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    icon       : PropTypes.string,
    afterIcon  : PropTypes.string,
    topBorder  : PropTypes.bool,
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
    topBorder  : false,
    isSelected : false,
};

export default SubNavigationItem;
