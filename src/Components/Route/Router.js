import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import Store                from "../../Core/Store";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import Main                 from "../Core/Main";

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
        saveRoute, initialUrl, type,
        withMain, withDetails, noFirst, children,
    } = props;

    const { setRedirect } = Store.useAction("core");
    const location        = useLocation();
    const items           = [];

    let   firstUrl    = initialUrl;
    let   hasPath     = false;
    let   canRedirect = true;

    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        let path = NLS.url(child.props.url);

        if (path === "/") {
            canRedirect = false;
        }
        if (path === location.pathname) {
            hasPath = true;
        }

        if (!child.props.exact) {
            path += "/*";
        }
        if (!firstUrl && !noFirst) {
            firstUrl = child.props.url;
        }

        items.push(<Route
            key={key}
            path={path}
            element={React.cloneElement(child, { type, withDetails })}
        />);
    }

    if (canRedirect && firstUrl) {
        items.push(<Route
            key="redirect"
            path="*"
            element={<Navigate to={NLS.url(firstUrl)} replace />}
        />);
    }

    if (!hasPath && saveRoute) {
        setRedirect(location.pathname);
    }


    // Do the Render
    if (withMain) {
        return <Main withDetails={withDetails}>
            <Routes>
                {items}
            </Routes>
        </Main>;
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
    initialUrl  : PropTypes.string,
    type        : PropTypes.string,
    withMain    : PropTypes.bool,
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
    initialUrl  : "",
    type        : "",
    withMain    : false,
    withDetails : false,
    noFirst     : false,
    saveRoute   : false,
};

export default Router;
