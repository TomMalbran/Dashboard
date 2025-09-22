import React                from "react";
import PropTypes            from "prop-types";

// Core
import Store                from "../../Core/Store";

// Components
import UserRoute            from "./UserRoute";



/**
 * Only Authenticated API can access the given Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function APIRoute(props) {
    const { isAPI } = Store.useState("auth");


    // Do the Render
    return <UserRoute
        {...props}
        isValid={isAPI}
    />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
APIRoute.propTypes = {
    isHidden  : PropTypes.bool,
    url       : PropTypes.string.isRequired,
    component : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    exact     : PropTypes.bool,
    type      : PropTypes.string,
    path      : PropTypes.string,
};

export default APIRoute;
