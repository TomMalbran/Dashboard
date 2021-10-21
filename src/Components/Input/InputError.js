import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Error = Styled.p.attrs(({ useBackground }) => ({ useBackground }))`
    ${(props) => props.useBackground ? `
        margin: 0;
        padding: 4px;
        font-size: 0.8em;
        color: white;
        text-align: center
        background-color: var(--error-color);
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    ` : `
        font-size: 12px;
        margin: 4px 0 0 4px;
        color: #ff0033;
    `}
`;



/**
 * The Input Error Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputError(props) {
    const { error, useBackground } = props;

    if (!error) {
        return <React.Fragment />;
    }
    return <Error useBackground={useBackground}>
        {NLS.get(error)}
    </Error>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputError.propTypes = {
    error         : PropTypes.string,
    useBackground : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputError.defaultProps = {
    useBackground : false,
};

export default InputError;
