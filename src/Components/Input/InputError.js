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
        text-align: center;
        background-color: var(--error-color);
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    ` : `
        font-size: 12px;
        margin: 4px 0 0 4px;
        color: var(--error-text-color);
    `}
`;



/**
 * The Input Error Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputError(props) {
    const { className, error, useBackground } = props;

    // Nothing to Render
    if (!error) {
        return <React.Fragment />;
    }

    // Variables
    let errorText = NLS.get(error);
    if (Array.isArray(error)) {
        errorText = NLS.format(error[0], ...error.slice(1));
    }


    // Do the Render
    return <Error
        className={`inputfield-error ${className}`}
        useBackground={useBackground}
    >
        {errorText}
    </Error>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputError.propTypes = {
    className     : PropTypes.string,
    error         : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    useBackground : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputError.defaultProps = {
    className     : "",
    useBackground : false,
};

export default InputError;
