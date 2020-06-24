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
    const {
        location, saveRoute, baseUrl, initialUrl, path, type,
        withDetails, noFirst, children,
    } = props;
    
    const items    = [];
    let   firstUrl = initialUrl;
    let   hasPath  = false;

    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        const cpath = NLS.baseUrl(path, child.props.url);
        if (!firstUrl && !noFirst) {
            firstUrl = child.props.url;
        }
        if (cpath === location.pathname) {
            hasPath = true;
        }
        items.push(React.cloneElement(child, {
            key, type, path : cpath, withDetails,
        }));
    }
    if (!hasPath && saveRoute) {
        Store.setRedirect(location.pathname);
    }
    
    return <Switch>
        {items}
        {!!firstUrl && <Redirect from="*" to={NLS.baseUrl(baseUrl, firstUrl)} />}
    </Switch>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SwitchRoute.propTypes = {
    location    : PropTypes.object,
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
SwitchRoute.defaultProps = {
    location    : {},
    path        : "",
    baseUrl     : "",
    initialUrl  : "",
    type        : "",
    withDetails : false,
    noFirst     : false,
    saveRoute   : false,
};

export default SwitchRoute;
