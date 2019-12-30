import React                from "react";
import PropTypes            from "prop-types";

// Styles
import "Styles/Icon.css";



/**
 * The Icon Component
 * @param {Object} props
 * @returns {Object}
 */
function Icon(props) {
    const { variant, className, onClick } = props;

    return <span
        className={`icon icon-${variant} ${className}`}
        onClick={onClick}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Icon.propTypes = {
    variant   : PropTypes.string.isRequired,
    className : PropTypes.string,
    onClick   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Icon.defaultProps = {
    className : "",
};

export default Icon;
