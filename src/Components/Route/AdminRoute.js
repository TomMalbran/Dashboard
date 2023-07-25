import React                from "react";
import PropTypes            from "prop-types";

// Core
import Store                from "../../Core/Store";

// Components
import UserRoute            from "./UserRoute";



/**
 * Only Authenticated Admins can access the given Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AdminRoute(props) {
    const { isAdmin } = Store.useState("auth");


    // Do the Render
    return <UserRoute
        {...props}
        isValid={isAdmin}
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AdminRoute.propTypes = {
    isHidden  : PropTypes.bool,
    url       : PropTypes.string.isRequired,
    component : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    exact     : PropTypes.bool,
    type      : PropTypes.string,
    path      : PropTypes.string,
};

export default AdminRoute;
