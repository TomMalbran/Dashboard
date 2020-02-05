import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Content = Styled.main`
    display: flex;
    flex-grow: 2;
    flex-direction: column;
    height: 100vh;

    @media (max-width: 1000px) {
        width: 100vw !important;
        height: calc(100vh - var(--topbar-height)) !important;
        overflow: auto;
    }
`;



/**
 * The Main Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Main(props) {
    const { className, children } = props;

    return <Content className={className}>
        {children}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Main.propTypes = {
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Main.defaultProps = {
    className : "",
};

export default Main;
