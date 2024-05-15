import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import PageHeader           from "./PageHeader";
import Alert                from "../Form/Alert";



// Styles
const Container = Styled.section.attrs(({ hasTabs }) => ({ hasTabs }))`
    box-sizing: border-box;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    height: ${(props) => props.hasTabs ? "var(--page-height-tabs)" : "var(--page-height)"};
    border: var(--border-width) solid var(--border-color-light);
    border-radius: var(--border-radius);
`;



/**
 * The Page Container
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PageContainer(props) {
    const { className, hasTabs, error, children } = props;


    // Do the Render
    return <Container className={className} hasTabs={hasTabs}>
        {!!error && <PageHeader>
            <Alert variant="error" message={error} />
        </PageHeader>}

        {children}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PageContainer.propTypes = {
    className : PropTypes.string,
    hasTabs   : PropTypes.bool,
    error     : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
PageContainer.defaultProps = {
    className : "",
};

export default PageContainer;
