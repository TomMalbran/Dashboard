import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Ul = Styled.ul`
    display: flex;
    box-sizing: border-box;
    height: var(--app-ststs-height);
    margin: 0 0 8px 0;
    padding: 0;
    list-style: none;
    color: var(--darker-color);

    @media (max-width: 1000px) {
        margin: 0 0 24px 0;
    }
    @media (max-width: 550px) {
        flex-direction: column;
    }
`;



/**
 * The Stat List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function StatList(props) {
    const { className, children } = props;

    return <Ul className={className}>
        {children}
    </Ul>;
}
    
/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatList.propTypes = {
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
StatList.defaultProps = {
    className : "",
};

export default StatList;
