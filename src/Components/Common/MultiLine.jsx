import React                from "react";
import PropTypes            from "prop-types";

// Variants
const Variant = {
    P   : "p",
    DIV : "div",
};



/**
 * The Multi Line Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function MultiLine(props) {
    const { variant, className, onClick, content, noWrapper, children } = props;

    const cnt   = String(content || children);
    const lines = cnt.split("\n");

    // Nothing to display
    if (!content && !children) {
        return <React.Fragment />;
    }

    // Dont add a wrapper around the lines
    if (noWrapper) {
        switch (variant) {
        case Variant.P:
            return <>{lines.map((elem, index) => <p key={index}>{elem}</p>)}</>;
        default:
            return <>{lines.map((elem, index) => <div key={index}>{elem}</div>)}</>;
        }
    }

    // Only 1 line
    if (lines.length < 2) {
        switch (variant) {
        case Variant.P:
            return <p className={className} onClick={onClick}>{cnt}</p>;
        default:
            return <div className={className} onClick={onClick}>{cnt}</div>;
        }
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
 * @type {object} propTypes
 */
MultiLine.propTypes = {
    variant   : PropTypes.string,
    className : PropTypes.string,
    onClick   : PropTypes.func,
    content   : PropTypes.string,
    noWrapper : PropTypes.bool,
    children  : PropTypes.string,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
MultiLine.defaultProps = {
    variant   : Variant.DIV,
    className : "",
    noWrapper : false,
};

export default MultiLine;
