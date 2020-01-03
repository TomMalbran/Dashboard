import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const H3 = Styled.h3`
    margin: 0;
    padding-top: 8px;
    color: var(--title-color);
`;



/**
 * The None Available Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NoneAvailable(props) {
    const { className, message } = props;

    return <H3 className={className}>
        {NLS.get(message)}
    </H3>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NoneAvailable.propTypes = {
    message   : PropTypes.string.isRequired,
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NoneAvailable.defaultProps = {
    className : "",
};

export default NoneAvailable;
