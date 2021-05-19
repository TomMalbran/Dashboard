import React                from "react";
import PropTypes            from "prop-types";

// Variants
const Variant = {
    P   : "p",
    DIV : "div",
};



/**
 * The Multi Line Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MultiLine(props) {
    const { variant, className, onClick, content, children } = props;

    const cnt   = String(content || children);
    const lines = cnt.split("\n");

    // Nothing to display
    if (!content && !children) {
        return <React.Fragment />;
    }

    // Only 1 line
    if (lines.length < 1) {
        return <div className={className} onClick={onClick}>{cnt}</div>;
    }

    // Multiple lines
    switch (variant) {
    case Variant.P:
        return <div className={className} onClick={onClick}>
            {lines.map((elem, index) => <p key={index}>{elem}</p>)}
        </div>;
    default:
        return <div className={className} onClick={onClick}>
            {lines.map((elem, index) => <div key={index}>{elem}</div>)}
        </div>;
    }
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
MultiLine.propTypes = {
    variant   : PropTypes.string,
    className : PropTypes.string,
    onClick   : PropTypes.func,
    content   : PropTypes.string,
    children  : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MultiLine.defaultProps = {
    variant   : Variant.DIV,
    className : "",
};

export default MultiLine;
