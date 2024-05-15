import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Dashboard
import AccordionList        from "../Accordion/AccordionList";



// Styles
const Container = Styled(AccordionList)`
    flex-grow: 2;
    padding: 16px;
    overflow: auto;
`;



/**
 * The Page Accordion
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PageAccordion(props) {
    const { initial, selected, onChange, noClose, children } = props;


    // Do the Render
    return <Container
        initial={initial}
        selected={selected}
        onChange={onChange}
        noClose={noClose}
    >
        {children}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PageAccordion.propTypes = {
    initial  : PropTypes.string,
    selected : PropTypes.string,
    onChange : PropTypes.func,
    noClose  : PropTypes.bool,
    children : PropTypes.any,
};

export default PageAccordion;
