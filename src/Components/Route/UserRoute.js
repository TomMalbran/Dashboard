import React                from "react";
import PropTypes            from "prop-types";
import { Route, Redirect }  from "react-router-dom";

// Core
import Params               from "../../Core/Params";
import NLS                  from "../../Core/NLS";



/**
 * The User Route Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function UserRoute(props) {
    const { isAuthenticated, isValid, type, withDetails, component : Component, ...rest } = props;
    
    return <Route {...rest} render={(props) => {
        const route  = props.location.pathname;
        const from   = Params.getFrom(route);
        const parent = Params.getParent(route);
        const params = Params.getAll(props.match.params);
        const elemID = Params.getOne(params, type);

        if (!isAuthenticated || !isValid) {
            return <Redirect to={{
                pathname : NLS.baseUrl("LOGIN"),
                state    : { from : props.location },
            }} />;
        }

        return <Component
            {...props}
            type={type}
            route={route}
            from={from}
            parent={parent}
            params={params}
            elemID={elemID}
            withDetails={Boolean(withDetails)}
        />;
    }} />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
UserRoute.propTypes = {
    isAuthenticated : PropTypes.bool.isRequired,
    isValid         : PropTypes.bool,
    isHidden        : PropTypes.bool,
    component       : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    type            : PropTypes.string,
    url             : PropTypes.string,
    exact           : PropTypes.bool,
    path            : PropTypes.string,
    location        : PropTypes.object,
    match           : PropTypes.object,
    withDetails     : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
UserRoute.defaultProps = {
    isValid : true,
};

export default UserRoute;
