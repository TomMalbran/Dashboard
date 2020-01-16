import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Span = Styled.span`
    position: absolute;
    top: -2px;
    right: 2px;
    min-width: 14px;
    line-height: 14px;
    font-size: 10px;
    text-align: center;
    border-radius: 999px;
    background-color: var(--white-color);
    color: var(--primary-color);
`;



/**
 * The Badge Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Badge(props) {
    const { className, value } = props;

    if (!value) {
        return <React.Fragment />;
    }
    return <Span className={`badge ${className}`}>
        {value}
    </Span>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Badge.propTypes = {
    value     : PropTypes.number,
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Badge.defaultProps = {
    className : "",
};

export default Badge;
