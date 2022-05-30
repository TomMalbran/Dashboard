import React                from "react";
import PropTypes            from "prop-types";
import { useLocation }      from "react-router-dom";


/**
 * The Any Route Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AnyRoute(props) {
    const { component : Component } = props;

    const location = useLocation();
    return <Component location={location} />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AnyRoute.propTypes = {
    isHidden  : PropTypes.bool,
    component : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    url       : PropTypes.string,
    exact     : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
AnyRoute.defaultProps = {
    isHidden : false,
};

export default AnyRoute;
