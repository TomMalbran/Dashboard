import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Variants
const Variant = {
    GREEN  : "green",
    YELLOW : "yellow",
    RED    : "red",
    GRAY   : "gray",
    BLUE   : "blue",
};



// Styles
const Span = Styled.span.attrs(({ variant }) => ({ variant }))`
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-top: -3px;
    margin-right: 8px;
    border: 1px solid var(--black-color);
    border-radius: 50%;
    vertical-align: middle;

    ${(props) => {
        switch (props.variant) {
        case Variant.GREEN:  return "background-color: green;";
        case Variant.YELLOW: return "background-color: yellow;";
        case Variant.RED:    return "background-color: red;";
        case Variant.GRAY:   return "background-color: red;";
        case Variant.BLUE:   return "background-color: red;";
        default: return "";
        }
    }}
`;



/**
 * The Circle Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Circle(props) {
    const { className, variant } = props;

    return <Span
        className={`circle ${className}`}
        variant={variant}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Circle.propTypes = {
    className : PropTypes.string,
    variant   : PropTypes.string.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Circle.defaultProps = {
    className : "",
};

export default Circle;
