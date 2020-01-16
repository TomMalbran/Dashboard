import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import MenuLink             from "../Link/MenuLink";



// Styles
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
    const { isSelected, message, icon, afterIcon, onClick, children } = props;

    return <li>
        <NavigationLink
            variant="menu-dark"
            isSelected={isSelected}
            message={message}
            icon={icon}
            afterIcon={afterIcon}
            onClick={onClick}
        />
        {children}
    </li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SubNavigationItem.propTypes = {
    variant    : PropTypes.string,
    className  : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    icon       : PropTypes.string,
    afterIcon  : PropTypes.string,
    onClick    : PropTypes.func,
    isSelected : PropTypes.bool,
    isHidden   : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SubNavigationItem.defaultProps = {
    className  : "",
    isSelected : false,
    isHidden   : false,
};

export default SubNavigationItem;
