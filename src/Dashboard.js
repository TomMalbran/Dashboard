import React                from "react";
import PropTypes            from "prop-types";

// Core
import Store                from "./Core/Store";
import Access               from "./Core/Access";
import Action               from "./Core/Action";
import Auth                 from "./Core/Auth";
import Status               from "./Core/Status";
import Navigate             from "./Core/Navigate";



/**
 * The Dashboard Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Dashboard(props) {
    const { store, actions, params, access, status, children } = props;
    const [ isMounted, setMounted ] = React.useState(false);

    if (!isMounted) {
        Action.init(actions);
        Navigate.init(params);
        Access.init(access.values, access.groups);
        Status.init(status.values, status.groups);
        Auth.init();
        setMounted(true);
    }

    return <Store.Provider config={store}>
        {children}
    </Store.Provider>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Dashboard.propTypes = {
    store    : PropTypes.object.isRequired,
    actions  : PropTypes.array.isRequired,
    params   : PropTypes.object.isRequired,
    access   : PropTypes.object.isRequired,
    status   : PropTypes.object.isRequired,
    children : PropTypes.any,
};

export default Dashboard;
