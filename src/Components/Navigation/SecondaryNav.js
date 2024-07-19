import React                from "react";
import PropTypes            from "prop-types";

// Components
import Navigation           from "../Navigation/Navigation";
import NavigationTitle      from "../Navigation/NavigationTitle";
import NavigationBody       from "../Navigation/NavigationBody";



/**
 * The Secondary Navigation
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SecondaryNav(props) {
    const {
        message, fallback, icon, href,
        canAdd, canEdit, canManage, onAction, children,
    } = props;


    // Do the Render
    return <Navigation
        variant="light"
        canAdd={canAdd}
        canEdit={canEdit}
        canManage={canManage}
        onAction={onAction}
    >
        <NavigationTitle
            message={message}
            fallback={fallback}
            icon={icon}
            href={href}
        />
        <NavigationBody>
            {children}
        </NavigationBody>
    </Navigation>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SecondaryNav.propTypes = {
    message   : PropTypes.string,
    fallback  : PropTypes.string,
    icon      : PropTypes.string,
    href      : PropTypes.string,
    canAdd    : PropTypes.bool,
    canEdit   : PropTypes.bool,
    canManage : PropTypes.bool,
    onAction  : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
SecondaryNav.defaultProps = {
    href      : "/",
    canAdd    : false,
    canEdit   : false,
    canManage : false,
};

export default SecondaryNav;
