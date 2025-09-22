import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import PageHeader           from "./PageHeader";
import Alert                from "../Form/Alert";



// Styles
const Container = Styled.section.attrs(({ hasTabs, withBorder }) => ({ hasTabs, withBorder }))`
    box-sizing: border-box;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    height: ${(props) => props.hasTabs ? "var(--page-height-tabs)" : "var(--page-height)"};

    ${(props) => props.withBorder && `
        border: var(--border-width) solid var(--border-color-light);
        border-radius: var(--border-radius);
    `}
`;



/**
 * The Page Container
 * @param {object} props
 * @returns {React.ReactElement}
 */
function PageContainer(props) {
    const { className, hasTabs, withBorder, error, children } = props;


    // Do the Render
    return <Container
        className={className}
        hasTabs={hasTabs}
        withBorder={withBorder}
    >
        {!!error && <PageHeader>
            <Alert variant="error" message={error} />
        </PageHeader>}

        {children}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
PageContainer.propTypes = {
    className  : PropTypes.string,
    hasTabs    : PropTypes.bool,
    withBorder : PropTypes.bool,
    error      : PropTypes.string,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
PageContainer.defaultProps = {
    className  : "",
    hasTabs    : false,
    withBorder : false,
    error      : "",
};

export default PageContainer;
