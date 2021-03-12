import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul.attrs(({ withSpacing }) => ({ withSpacing }))`
    margin: 0;
    padding: 0;
    list-style: none;

    ${(props) => props.withSpacing && `
        padding: 24px;
    `}
`;



/**
 * The History List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function History(props) {
    const { className, withSpacing, children } = props;

    return <Ul className={className} withSpacing={withSpacing}>
        {children}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
 History.propTypes = {
    className   : PropTypes.string,
    withSpacing : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
 History.defaultProps = {
    className   : "",
    withSpacing : false,
};

export default History;
