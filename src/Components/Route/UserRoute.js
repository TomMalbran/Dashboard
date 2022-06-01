import React                from "react";
import PropTypes            from "prop-types";

// Core
import Params               from "../../Core/Params";
import NLS                  from "../../Core/NLS";

// Router
import {
    Navigate, useLocation, useMatch, useParams,
} from "react-router-dom";



/**
 * The User Route Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function UserRoute(props) {
    const { isAuthenticated, isValid, route, type, withDetails, component : Component } = props;

    const location = useLocation();
    const match    = useMatch(route);
    const pathname = location.pathname;
    const from     = Params.getFrom(pathname);
    const parent   = Params.getParent(pathname);
    const params   = Params.getAll(useParams());
    const elemID   = Params.getOne(params, type);

    if (!isAuthenticated || !isValid) {
        return <Navigate
            to={NLS.baseUrl("LOGIN")}
            state={{ from : location }}
        />;
    }

    return <Component
        location={location}
        match={match}
        type={type}
        route={pathname}
        from={from}
        parent={parent}
        params={params}
        elemID={elemID}
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
    route           : PropTypes.string,
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
