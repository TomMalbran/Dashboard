import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import CircularLoader       from "../Loader/CircularLoader";



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
    const { className, isLoading, passedRef, children } = props;

    return <Section className={className} ref={passedRef}>
        {isLoading  && <CircularLoader top={40} />}
        {!isLoading && children}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Content.propTypes = {
    className : PropTypes.string,
    isLoading : PropTypes.bool,
    passedRef : PropTypes.any,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Content.defaultProps = {
    className : "",
    isLoading : false,
};

export default Content;
