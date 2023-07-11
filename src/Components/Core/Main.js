import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Responsive           from "../../Core/Responsive";



// Styles
const Content = Styled.main.attrs(({ withNavigation, withDetails, wideDetails }) => ({ withNavigation, withDetails, wideDetails }))`
    --main-navigation: ${(props) => props.withNavigation ? "var(--navigation-width)" : "0px"};
    --main-details: ${(props) => props.withDetails ? (props.wideDetails ? "var(--details-width-wide)" : "var(--details-width)") : "0px"};

    display: flex;
    flex-grow: 2;
    flex-direction: column;
    height: var(--main-height, var(--full-height));
    width: calc(100vw - var(--sidebar-width) - var(--main-navigation) - var(--main-details));

    @media (max-width: ${Responsive.WIDTH_FOR_DETAILS}px) {
        width: calc(100vw - var(--sidebar-width) - var(--main-navigation));
    }

    @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
        width: 100vw !important;
        overflow: auto;
    }
`;



/**
 * The Main Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Main(props) {
    const { className, withNavigation, withDetails, wideDetails, children } = props;

    return <Content
        className={className}
        withNavigation={withNavigation}
        withDetails={withDetails}
        wideDetails={wideDetails}
    >
        {children}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Main.propTypes = {
    className      : PropTypes.string,
    withNavigation : PropTypes.bool,
    withDetails    : PropTypes.bool,
    wideDetails    : PropTypes.bool,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Main.defaultProps = {
    className      : "",
    withNavigation : true,
    withDetails    : false,
    wideDetails    : false,
};

export default Main;
