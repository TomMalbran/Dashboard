import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Navigate             from "../../Core/Navigate";

// Components
import Breadcrumb           from "../Header/Breadcrumb";
import Title                from "../Header/Title";
import Subtitle             from "../Header/Subtitle";



// Styles
const Container = Styled.header.attrs(({ showBreadcrumbs }) => ({ showBreadcrumbs }))`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: var(--header-height);
    padding: ${(props) => props.showBreadcrumbs ? "8px" : "calc(var(--main-padding) / 2)"} var(--main-padding);
    flex-shrink: 0;
`;

const Content = Styled.div`
    flex-grow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--main-padding);
    height: 100%;
`;

const Child = Styled.div`
    flex-grow: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    white-space: nowrap;

    .tab-item {
        margin-bottom: 0;
    }
`;



/**
 * The Header Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Header(props) {
    const {
        className, showBreadcrumbs,
        icon, message, fallback, href,
        subTitle, subCircle, children,
    } = props;

    const route = Navigate.usePath();


    // Do the Render
    return <Container className={className} showBreadcrumbs={showBreadcrumbs}>
        {showBreadcrumbs && <Breadcrumb route={route} />}
        <Content>
            <Title
                icon={icon}
                message={message}
                fallback={fallback}
                href={href}
            />
            <Subtitle
                message={subTitle}
                circle={subCircle}
            />
            <Child>
                {children}
            </Child>
        </Content>
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Header.propTypes = {
    className       : PropTypes.string,
    showBreadcrumbs : PropTypes.bool,
    icon            : PropTypes.string.isRequired,
    message         : PropTypes.string.isRequired,
    fallback        : PropTypes.string,
    href            : PropTypes.string,
    subTitle        : PropTypes.string,
    subCircle       : PropTypes.string,
    children        : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Header.defaultProps = {
    className       : "",
    showBreadcrumbs : false,
};

export default Header;
