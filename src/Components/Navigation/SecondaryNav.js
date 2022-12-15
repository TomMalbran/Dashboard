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
    const { message, fallback, href, children } = props;


    return <Navigation variant="light">
        <NavigationTitle
            message={message}
            fallback={fallback}
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
    message  : PropTypes.string,
    fallback : PropTypes.string,
    href     : PropTypes.string,
    children : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
SecondaryNav.defaultProps = {
    href : "/",
};

export default SecondaryNav;
