import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const IconContent = Styled.span`
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
 * @returns {Object}
 */
function Icon(props) {
    const { variant, className, onClick } = props;

    return <IconContent
        className={`icon-${variant} ${className}`}
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
