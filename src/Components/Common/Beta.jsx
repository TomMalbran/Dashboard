import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.span`
    padding: 4px 8px;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--white-color);
    background-color: var(--beta-color);
    border-radius: var(--border-radius-big);
`;



/**
 * The Beta Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Beta(props) {
    const { isHidden, className } = props;


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container
        className={`beta ${className}`}
    >Beta</Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Beta.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Beta.defaultProps = {
    isHidden  : false,
    className : "",
};

export default Beta;
