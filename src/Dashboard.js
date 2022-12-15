import React                from "react";
import PropTypes            from "prop-types";
import { BrowserRouter }    from "react-router-dom";

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

    return <BrowserRouter basename={process.env.REACT_APP_BASEURL}>
        <Store.Provider config={store}>
            <Initializer {...props} />
            {children}
        </Store.Provider>
    </BrowserRouter>;
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
