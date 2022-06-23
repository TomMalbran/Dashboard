import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";

// Router
import {
    Navigate, useLocation,
} from "react-router-dom";



/**
 * The User Route Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function UserRoute(props) {
    const { isAuthenticated, isValid, type, withDetails, component : Component } = props;

    const location = useLocation();

    if (!isAuthenticated || !isValid) {
        return <Navigate
            to={NLS.baseUrl("LOGIN")}
            state={{ from : location }}
        />;
    }

    return <Component
        location={location}
        type={type}
        withDetails={Boolean(withDetails)}
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
UserRoute.propTypes = {
    isHidden        : PropTypes.bool,
    isAuthenticated : PropTypes.bool.isRequired,
    isValid         : PropTypes.bool,
    component       : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    type            : PropTypes.string,
    url             : PropTypes.string,
    exact           : PropTypes.bool,
    withDetails     : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
UserRoute.defaultProps = {
    isHidden : false,
    isValid  : true,
};

export default UserRoute;
