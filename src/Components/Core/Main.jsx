import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Responsive           from "../../Core/Responsive";



// Styles
const Content = Styled.main.attrs(({ withNavigation, withDetails, wideDetails, largeDetails }) => ({ withNavigation, withDetails, wideDetails, largeDetails }))`
    --main-navigation: ${(props) => props.withNavigation ? "var(--navigation-width)" : "0px"};
    --main-details: calc(${(props) => props.withDetails ? (props.wideDetails ? "var(--details-width-wide)" : (props.largeDetails ? "var(--details-width-large)" : "var(--details-width)")) : "0px"} + var(--main-margin));

    display: flex;
    flex-grow: 2;
    flex-direction: column;
    height: var(--main-height, var(--full-height));
    width: calc(100vw - var(--sidebar-width) - var(--main-navigation) - var(--main-details) - var(--main-margin));
    margin-right: var(--main-margin);
    margin-bottom: var(--main-margin);
    border-radius: var(--main-radius);
    background-color: var(--content-color);

    @media (max-width: ${Responsive.WIDTH_FOR_DETAILS}px) {
        width: calc(100vw - var(--sidebar-width) - var(--main-navigation) - var(--main-margin));
    }

    @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
        width: 100vw !important;
        overflow: auto;
    }
`;



/**
 * The Main Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Main(props) {
    const { className, withNavigation, withDetails, wideDetails, largeDetails, children } = props;

    return <Content
        className={className}
        withNavigation={withNavigation}
        withDetails={withDetails}
        largeDetails={largeDetails}
        wideDetails={wideDetails}
    >
        {children}
    </Content>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Main.propTypes = {
    className      : PropTypes.string,
    withNavigation : PropTypes.bool,
    withDetails    : PropTypes.bool,
    wideDetails    : PropTypes.bool,
    largeDetails   : PropTypes.bool,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Main.defaultProps = {
    className      : "",
    withNavigation : true,
    withDetails    : false,
    wideDetails    : false,
    largeDetails   : false,
};

export default Main;
