import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Container = Styled.main`
    display: flex;
    gap: var(--main-gap);
`;



/**
 * The Page Main
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PageMain(props) {
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
PageMain.propTypes = {
    children : PropTypes.any,
};

export default PageMain;
