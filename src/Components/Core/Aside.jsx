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
 * @param {object} props
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
 * @type {object} propTypes
 */
Aside.propTypes = {
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Aside.defaultProps = {
    className : "",
};

export default Aside;
