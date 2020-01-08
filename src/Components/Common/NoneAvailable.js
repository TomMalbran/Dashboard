import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Variants
const Variant = {
    PRIMARY : "primary",
    WHITE   : "white",
};



// Styles
const H3 = Styled.h3.attrs(({ variant }) => ({ variant }))`
    margin: 0;
    padding-top: 8px;
    
    ${(props) => props.variant === Variant.PRIMARY && `
        color: var(--title-color);
    `}
    ${(props) => props.variant === Variant.WHITE && `
        color: rgba(255, 255, 255, 0.8);
    `}
`;



/**
 * The None Available Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NoneAvailable(props) {
    const { className, variant, message } = props;

    return <H3 className={className} variant={variant}>
        {NLS.get(message)}
    </H3>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NoneAvailable.propTypes = {
    message   : PropTypes.string.isRequired,
    variant   : PropTypes.string,
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NoneAvailable.defaultProps = {
    variant   : Variant.PRIMARY,
    className : "",
};

export default NoneAvailable;
