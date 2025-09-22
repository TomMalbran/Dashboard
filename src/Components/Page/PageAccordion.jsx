import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Dashboard
import AccordionList        from "../Accordion/AccordionList";



// Styles
const Container = Styled(AccordionList).attrs(({ withSpacing }) => ({ withSpacing }))`
    flex-grow: 2;
    overflow: auto;

    ${(props) => props.withSpacing && "padding: 16px;"}
`;



/**
 * The Page Accordion
 * @param {object} props
 * @returns {React.ReactElement}
 */
function PageAccordion(props) {
    const { initial, selected, onChange, noClose, withSpacing, children } = props;


    // Do the Render
    return <Container
        initial={initial}
        selected={selected}
        onChange={onChange}
        noClose={noClose}
        withSpacing={withSpacing}
    >
        {children}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
PageAccordion.propTypes = {
    initial     : PropTypes.string,
    selected    : PropTypes.string,
    onChange    : PropTypes.func,
    noClose     : PropTypes.bool,
    withSpacing : PropTypes.bool,
    children    : PropTypes.any,
};

export default PageAccordion;
