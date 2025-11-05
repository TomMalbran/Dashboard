import React                from "react";
import PropTypes            from "prop-types";
import { useLocation }      from "react-router-dom";


/**
 * The Any Route Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function AnyRoute(props) {
    const { component : Component } = props;

    const location = useLocation();
    return <Component location={location} />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
AnyRoute.propTypes = {
    isHidden  : PropTypes.bool,
    url       : PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string) ]).isRequired,
    component : PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
    exact     : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
AnyRoute.defaultProps = {
    isHidden : false,
};

export default AnyRoute;
