import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import CircularLoader       from "../Loader/CircularLoader";



// Styles
const Div = Styled.div`
    display: flex;
    height: var(--full-height);
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-color);
`;



/**
 * The Loader Component
 * @param {object} props
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
 * @type {object} propTypes
 */
Loader.propTypes = {
    variant   : PropTypes.string,
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Loader.defaultProps = {
    variant   : "white",
    className : "",
};

export default Loader;
