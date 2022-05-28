import React                from "react";
import { Provider }         from "react-redux";
import { useNavigate }      from "react-router";
import PropTypes            from "prop-types";

import Store                from "./Core/Store";
import Action               from "./Core/Action";
import Params               from "./Core/Params";
import Access               from "./Core/Access";
import Status               from "./Core/Status";
import Href                 from "./Core/Href";
import Auth                 from "./Core/Auth";



/**
 * The Dashboard Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Dashboard(props) {
    const { store, actions, params, access, status, children } = props;
    const [ isMounted, setMounted ] = React.useState(false);
    const navigate = useNavigate();

    if (!isMounted) {
        Store.init(store);
        Action.init(actions);
        Params.init(params);
        Access.init(access.values, access.groups);
        Status.init(status.values, status.groups);
        Href.init(navigate);
        Auth.init();
        setMounted(true);
    }

    return <Provider store={store}>
        {children}
    </Provider>;
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
