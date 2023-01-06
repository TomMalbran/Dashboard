import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Content = Styled.main`
    grid-area: inside;
    display: flex;
`;



/**
 * The Inside Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Inside(props) {
    const { className, children } = props;

    return <Content className={className}>
        {children}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Inside.propTypes = {
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Inside.defaultProps = {
    className : "",
};

export default Inside;
