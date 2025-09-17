import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Content = Styled.aside`
    order: 2;
    display: flex;
`;



/**
 * The Aside Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Aside(props) {
    const { className, children } = props;

    return <Content className={className}>
        {children}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Aside.propTypes = {
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Aside.defaultProps = {
    className : "",
};

export default Aside;
