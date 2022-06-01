import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import Store                from "../../Core/Store";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Router
import {
    Routes, Route, Navigate, useLocation,
} from "react-router-dom";



/**
 * The Router Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Router(props) {
    const {
        saveRoute, baseUrl, initialUrl, path, type,
        withDetails, noFirst, children,
    } = props;

    const location    = useLocation();
    const items       = [];

    let   firstUrl    = initialUrl;
    let   hasPath     = false;
    let   canRedirect = true;

    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        let route = NLS.baseUrl(path, child.props.url);

        if (route === "/") {
            canRedirect = false;
        }
        if (route === location.pathname) {
            hasPath = true;
        }

        if (!child.props.exact) {
            if (route.endsWith("/")) {
                route += "*";
            } else {
                route += "/*";
            }
        }

        if (!firstUrl && !noFirst) {
            firstUrl = child.props.url;
        }

        items.push(<Route
            key={key}
            path={route}
            element={React.cloneElement(child, { route, type, withDetails })}
        />);
    }

    if (canRedirect && firstUrl) {
        items.push(<Route
            key="redirect"
            path="/*"
            element={<Navigate
                to={NLS.baseUrl(baseUrl, firstUrl)}
                replace
            />}
        />);
    }

    if (!hasPath && saveRoute) {
        Store.setRedirect(location.pathname);
    }

    return <Routes>
        {items}
    </Routes>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Router.propTypes = {
    path        : PropTypes.string,
    baseUrl     : PropTypes.string,
    initialUrl  : PropTypes.string,
    type        : PropTypes.string,
    withDetails : PropTypes.bool,
    noFirst     : PropTypes.bool,
    saveRoute   : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Router.defaultProps = {
    path        : "",
    baseUrl     : "",
    initialUrl  : "",
    type        : "",
    withDetails : false,
    noFirst     : false,
    saveRoute   : false,
};

export default Router;
