import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Section = Styled.section`
    flex-grow: 1;
    padding: 0 24px 24px;
    overflow: auto;
`;



/**
 * The Content Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Content(props) {
    const { className, children } = props;

    return <Section className={className}>
        {children}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Content.propTypes = {
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Content.defaultProps = {
    className : "",
};

export default Content;
