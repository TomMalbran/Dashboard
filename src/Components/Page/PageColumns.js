import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Dashboard
import Columns              from "../Form/Columns";



// Styles
const Container = Styled.div.attrs(({ withSpacing }) => ({ withSpacing }))`
    box-sizing: border-box;
    flex-grow: 2;
    width: 100%;
    padding: var(--main-padding);
    overflow: auto;

    ${(props) => props.withSpacing ? "padding: var(--main-padding);" : "padding: 8px 0 var(--main-padding) 0;"}
`;



/**
 * The Page Columns
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PageColumns(props) {
    const { withSpacing, amount, children } = props;


    // Do the Render
    return <Container withSpacing={withSpacing}>
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
    withSpacing : PropTypes.bool,
    amount      : PropTypes.string,
    children    : PropTypes.any,
};

export default PageColumns;
