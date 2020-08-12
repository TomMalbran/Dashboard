import React                from "react";
import PropTypes            from "prop-types";
import { Route, Redirect }  from "react-router-dom";



/**
 * The Guest Route Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function GuestRoute(props) {
    const { isAuthenticated, component : Component, ...rest } = props;
    
    return <Route {...rest} render={(props) => {
        if (!isAuthenticated) {
            return <Component {...props} />;
        }
        return <Redirect to={{ pathname : "/", state : { from : props.location } }} />;
    }} />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
GuestRoute.propTypes = {
    isHidden        : PropTypes.bool,
    isAuthenticated : PropTypes.bool.isRequired,
    component       : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    url             : PropTypes.string,
    path            : PropTypes.string,
    exact           : PropTypes.bool,
    location        : PropTypes.object,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
GuestRoute.defaultProps = {
    isHidden : false,
};

export default GuestRoute;
