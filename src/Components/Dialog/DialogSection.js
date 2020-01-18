import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Dialog Section Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogSection(props) {
    const { className, children } = props;

    return <section className={className}>
        {children}
    </section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogSection.propTypes = {
    className : PropTypes.string,
    isHidden  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogSection.defaultProps = {
    className : "",
    isHidden  : false,
};

export default DialogSection;
