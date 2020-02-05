import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import CircularLoader       from "../Loader/CircularLoader";



// Styles
const Div = Styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-color);
`;



/**
 * The Loader Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Loader(props) {
    const { className, variant } = props;

    return <Div className={className}>
        <CircularLoader variant={variant} />
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Loader.propTypes = {
    variant   : PropTypes.string,
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Loader.defaultProps = {
    variant   : "white",
    className : "",
};

export default Loader;
