import React                from "react";
import PropTypes            from "prop-types";
import { BrowserRouter }    from "react-router-dom";

// Core
import Store                from "./Core/Store";
import Initializer          from "./Core/Initializer";

// Components
import Result               from "./Components/Core/Result";
import Tooltip              from "./Components/Core/Tooltip";



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
            <Result />
            <Tooltip />
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
    children : PropTypes.any,
};

export default Dashboard;
