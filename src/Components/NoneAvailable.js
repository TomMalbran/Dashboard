import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../Core/NLS";



// Styles
const NoneContent = Styled.h3`
    margin: 0;
    padding-top: 8px;
    color: var(--title-color);
`;



/**
 * The None Available Component
 * @param {Object} props
 * @returns {Object}
 */
function NoneAvailable(props) {
    const { className, message } = props;

    return <NoneContent className={className}>
        {NLS.get(message)}
    </NoneContent>;
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
