import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Navigate             from "../../Core/Navigate";

// Components
import Breadcrumb           from "../Header/Breadcrumb";
import Title                from "../Header/Title";



// Styles
const Container = Styled.header.attrs(({ showBreadcrumbs }) => ({ showBreadcrumbs }))`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    height: var(--header-height);
    padding: ${(props) => props.showBreadcrumbs ? "8px 24px" : "12px 24px"};
    flex-shrink: 0;
    background-color: white;
`;
const Content = Styled.div`
    flex-grow: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Child = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

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
    const { className, icon, message, fallback, showBreadcrumbs, children } = props;

    const route = Navigate.usePath();

    return <Container className={className} showBreadcrumbs={showBreadcrumbs}>
        {showBreadcrumbs && <Breadcrumb route={route} />}
        <Content>
            <Title
                icon={icon}
                message={message}
                fallback={fallback}
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
    icon            : PropTypes.string.isRequired,
    message         : PropTypes.string.isRequired,
    fallback        : PropTypes.string,
    showBreadcrumbs : PropTypes.bool,
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
