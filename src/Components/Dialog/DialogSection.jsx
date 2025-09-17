import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Dialog Section Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogSection(props) {
    const { isHidden, className, children } = props;

    if (isHidden) {
        return <React.Fragment />;
    }
    return <section className={className}>
        {children}
    </section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogSection.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogSection.defaultProps = {
    isHidden  : false,
    className : "",
};

export default DialogSection;
