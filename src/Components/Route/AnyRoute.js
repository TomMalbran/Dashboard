import React                from "react";
import PropTypes            from "prop-types";
import { Route }            from "react-router-dom";



/**
 * The Any Route Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AnyRoute(props) {
    const { component : Component, ...rest } = props;

    return <Route {...rest} render={(props) => {
        return <Component {...props} />;
    }} />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AnyRoute.propTypes = {
    isHidden  : PropTypes.bool,
    component : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    url       : PropTypes.string,
    path      : PropTypes.string,
    exact     : PropTypes.bool,
    location  : PropTypes.object,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
AnyRoute.defaultProps = {
    isHidden : false,
};

export default AnyRoute;
