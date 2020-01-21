import React                from "react";
import PropTypes            from "prop-types";
import { Switch, Redirect } from "react-router-dom";

// Core & Utils
import Store                from "../../Core/Store";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



/**
 * The Switch Route Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SwitchRoute(props) {
    const { location, saveRoute, baseUrl, initialUrl, path, type, noFirst, children } = props;
    
    const items    = [];
    let   firstUrl = initialUrl ? NLS.url(initialUrl) : "";
    let   hasPath  = false;

    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        const cpath = NLS.url(child.props.url, path);
        if (!firstUrl && !noFirst) {
            firstUrl = child.props.url;
        }
        if (cpath === location.pathname) {
            hasPath = true;
        }
        items.push(React.cloneElement(child, {
            key, type, path : cpath,
        }));
    }
    if (!hasPath && saveRoute) {
        Store.setRedirect(location.pathname);
    }
    
    return <Switch>
        {items}
        {!!firstUrl && <Redirect from="*" to={NLS.url(firstUrl, baseUrl)} />}
    </Switch>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SwitchRoute.propTypes = {
    location   : PropTypes.object,
    path       : PropTypes.string,
    baseUrl    : PropTypes.string,
    initialUrl : PropTypes.string,
    type       : PropTypes.string,
    noFirst    : PropTypes.bool,
    saveRoute  : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
SwitchRoute.defaultProps = {
    location   : {},
    path       : "",
    baseUrl    : "",
    initialUrl : "",
    type       : "",
    noFirst    : false,
    saveRoute  : false,
};

export default SwitchRoute;
