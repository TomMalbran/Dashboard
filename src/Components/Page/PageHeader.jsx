import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.header`
    display: flex;
    flex-direction: column;
    gap: var(--main-gap);
    padding: 12px 24px;
    border-bottom: 1px solid var(--border-color-light);

    :empty {
        display: none;
    }
`;



/**
 * The Page Header
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PageHeader(props) {
    const { children } = props;


    // Do the Render
    return <Container>
        {children}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PageHeader.propTypes = {
    children : PropTypes.any,
};

export default PageHeader;
