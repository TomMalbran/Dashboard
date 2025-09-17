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
 * @param {Object} props
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
 * @typedef {Object} propTypes
 */
GuestRoute.propTypes = {
    isHidden  : PropTypes.bool,
    component : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    url       : PropTypes.string,
    exact     : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
GuestRoute.defaultProps = {
    isHidden : false,
};

export default GuestRoute;
