import React                from "react";
import PropTypes            from "prop-types";

// Core
import Store                from "./Core/Store";
import Initializer          from "./Core/Initializer";



/**
 * The Dashboard Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Dashboard(props) {
    const { store, children } = props;

    return <Store.Provider config={store}>
        <Initializer {...props} />
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
