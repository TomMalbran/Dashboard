import React                from "react";
import PropTypes            from "prop-types";

// Components
import Navigation           from "../Navigation/Navigation";
import NavigationHeader     from "../Navigation/NavigationHeader";
import NavigationBody       from "../Navigation/NavigationBody";



/**
 * The Primary Navigation
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PrimaryNav(props) {
    const { logo, children } = props;

    return <Navigation variant="dark">
        <NavigationHeader className="navigation-header" logo={logo} />
        <NavigationBody>
            {children}
        </NavigationBody>
    </Navigation>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
PrimaryNav.propTypes = {
    logo     : PropTypes.string,
    children : PropTypes.any,
};

export default PrimaryNav;
