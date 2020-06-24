import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Content = Styled.main.attrs(({ withDetails }) => ({ withDetails }))`
    display: flex;
    flex-grow: 2;
    flex-direction: column;
    height: var(--full-height);

    ${(props) => props.withDetails ? `
        width: calc(100vw - var(--sidebar-width) - var(--navigation-width) - var(--details-width));
    ` : `
        width: calc(100vw - var(--sidebar-width) - var(--navigation-width));
    `};

    @media (max-width: 1000px) {
        width: 100vw !important;
        height: calc(var(--full-height) - var(--topbar-height)) !important;
        overflow: auto;
    }
`;



/**
 * The Main Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Main(props) {
    const { className, withDetails, children } = props;

    return <Content className={className} withDetails={withDetails}>
        {children}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Main.propTypes = {
    className   : PropTypes.string,
    withDetails : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Main.defaultProps = {
    className   : "",
    withDetails : false,
};

export default Main;
