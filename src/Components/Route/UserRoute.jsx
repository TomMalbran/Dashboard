import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";
import Store                from "../../Core/Store";

// Router
import {
    Navigate, useLocation,
} from "react-router-dom";



/**
 * The User Route Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function UserRoute(props) {
    const { isValid, type, withDetails, component : Component } = props;

    const location = useLocation();
    const { isAuthenticated } = Store.useState("auth");


    // Do the Render
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
 * @type {object} propTypes
 */
UserRoute.propTypes = {
    isHidden    : PropTypes.bool,
    isValid     : PropTypes.bool,
    url         : PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string) ]),
    component   : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    exact       : PropTypes.bool,
    type        : PropTypes.string,
    withDetails : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
UserRoute.defaultProps = {
    isHidden : false,
    isValid  : true,
};

export default UserRoute;
