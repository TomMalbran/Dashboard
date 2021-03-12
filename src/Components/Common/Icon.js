import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Span = Styled.span`
    &::before {
        display: inline-block;
        padding: 0;
        font-family: "icomoon";
        font-weight: 400;
        text-align: center;
    }
`;



/**
 * The Icon Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Icon(props) {
    const { isHidden, className, icon, onClick } = props;

    if (isHidden) {
        return <React.Fragment />;
    }
    return <Span
        className={`icon icon-${icon} ${className}`}
        onClick={onClick}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Icon.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    icon      : PropTypes.string.isRequired,
    onClick   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Icon.defaultProps = {
    isHidden  : false,
    className : "",
};

export default Icon;
