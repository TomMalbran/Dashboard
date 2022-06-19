import React                from "react";
import { Provider }         from "react-redux";
import { configureStore }   from "@reduxjs/toolkit";
import PropTypes            from "prop-types";

import Store                from "./Core/Store";
import Access               from "./Core/Access";
import Action               from "./Core/Action";
import Auth                 from "./Core/Auth";
import Status               from "./Core/Status";
import Navigation           from "./Core/Navigation";



/**
 * The Dashboard Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Dashboard(props) {
    const { reducer, store, actions, params, access, status, children } = props;
    const [ isMounted, setMounted ] = React.useState(false);

    const dashStore = reducer ? configureStore({ reducer }) : store;

    if (!isMounted) {
        Store.init(dashStore);
        Action.init(actions);
        Navigation.init(params);
        Access.init(access.values, access.groups);
        Status.init(status.values, status.groups);
        Auth.init();
        setMounted(true);
    }

    return <Provider store={dashStore}>
        {children}
    </Provider>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Dashboard.propTypes = {
    reducer  : PropTypes.object,
    store    : PropTypes.object,
    actions  : PropTypes.array.isRequired,
    params   : PropTypes.object.isRequired,
    access   : PropTypes.object.isRequired,
    status   : PropTypes.object.isRequired,
    children : PropTypes.any,
};

export default Dashboard;
