import React                from "react";
import PropTypes            from "prop-types";

// Core
import Store                from "../Core/Store";
import Ajax                 from "../Core/Ajax";
import Action               from "../Core/Action";
import Auth                 from "../Core/Auth";
import Navigate             from "../Core/Navigate";
import NLS                  from "../Core/NLS";



/**
 * The Initializer
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Initializer(props) {
    const { url, apiUrl, routeUrl, actions, params } = props;

    const { showResult     } = Store.useAction("core");
    const { setCurrentUser } = Store.useAction("auth");

    // Show a Result
    const onResult = (variant, message, param) => {
        showResult(variant, message, param);
    };

    // Sets the Current User
    const onUserChange = (user) => {
        if (setCurrentUser) {
            setCurrentUser(user);
        }
    };

    // Initialize the Modules once
    React.useEffect(() => {
        Ajax.init(apiUrl, routeUrl, onResult);
        Action.init(actions);
        Navigate.init(url, params);
        Auth.init(onUserChange);
        NLS.init(url);
    }, []);

    return <React.Fragment />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Initializer.propTypes = {
    url      : PropTypes.string,
    apiUrl   : PropTypes.string,
    routeUrl : PropTypes.string,
    actions  : PropTypes.array,
    params   : PropTypes.object,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Initializer.defaultProps = {
    url      : "",
    apiUrl   : "",
    routeUrl : "",
    actions  : [],
    params   : {},
};

export default Initializer;
