import React                from "react";
import PropTypes            from "prop-types";

// Core
import Store                from "../Core/Store";
import Ajax                 from "../Core/Ajax";
import Action               from "../Core/Action";
import Auth                 from "../Core/Auth";
import Navigate             from "../Core/Navigate";



/**
 * The Initializer
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Initializer(props) {
    const { actions, params } = props;

    const { showResult     } = Store.useAction("core");
    const { setCurrentUser } = Store.useAction("auth");

    // Show a Result
    const onResult = (variant, message) => {
        showResult(variant, message);
    };

    // Sets the Current User
    const onUserChange = (user) => {
        setCurrentUser(user);
    };

    // Initialize the Modules once
    React.useEffect(() => {
        Ajax.init(onResult);
        Action.init(actions);
        Navigate.init(params);
        Auth.init(onUserChange);
    }, []);

    return <React.Fragment />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Initializer.propTypes = {
    actions : PropTypes.array.isRequired,
    params  : PropTypes.object.isRequired,
};

export default Initializer;
