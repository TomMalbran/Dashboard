import React                from "react";
import PropTypes            from "prop-types";

// Core
import Store                from "../../Core/Store";

// Router
import {
    Navigate, useLocation,
} from "react-router-dom";



/**
 * The Guest Route Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function GuestRoute(props) {
    const { component : Component } = props;

    const location = useLocation();
    const { isAuthenticated } = Store.useState("auth");


    // Do the Render
    if (isAuthenticated) {
        return <Navigate
            to="/"
            state={{ from : location }}
        />;
    }
    return <Component location={location} />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
GuestRoute.propTypes = {
    isHidden  : PropTypes.bool,
    url       : PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string) ]),
    component : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    exact     : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
GuestRoute.defaultProps = {
    isHidden : false,
};

export default GuestRoute;
