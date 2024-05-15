import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Dashboard
import Columns              from "../Form/Columns";



// Styles
const Container = Styled.div`
    box-sizing: border-box;
    flex-grow: 2;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: var(--main-padding);
    overflow: auto;
`;



/**
 * The Page Columns
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PageColumns(props) {
    const { amount, children } = props;


    // Do the Render
    return <Container>
        <Columns amount={amount}>
            {children}
        </Columns>
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PageColumns.propTypes = {
    amount   : PropTypes.string,
    children : PropTypes.any,
};

export default PageColumns;
