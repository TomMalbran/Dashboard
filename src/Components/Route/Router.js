import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import Main                 from "../Core/Main";

// Router
import {
    Routes, Route, Navigate,
} from "react-router-dom";



/**
 * The Router Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Router(props) {
    const {
        initialUrl, type,
        withMain, withDetails, noFirst, children,
    } = props;


    // Create the Routes
    const routes      = [];
    let   firstUrl    = initialUrl;
    let   canRedirect = true;

    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        let path = NLS.url(child.props.url);

        if (path === "/") {
            canRedirect = false;
        }

        if (!child.props.exact) {
            path += "/*";
        }
        if (!firstUrl && !noFirst) {
            firstUrl = child.props.url;
        }

        routes.push(<Route
            key={key}
            path={path}
            element={React.cloneElement(child, { type, withDetails })}
        />);
    }

    if (canRedirect && firstUrl) {
        routes.push(<Route
            key="redirect"
            path="*"
            element={<Navigate to={NLS.url(firstUrl)} replace />}
        />);
    }


    // Do the Render
    if (withMain) {
        return <Main withDetails={withDetails}>
            <Routes>
                {routes}
            </Routes>
        </Main>;
    }
    return <Routes>
        {routes}
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
};

export default Router;
