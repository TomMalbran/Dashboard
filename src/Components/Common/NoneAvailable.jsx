import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Variants
const Variant = {
    PRIMARY : "primary",
    WHITE   : "white",
    DIALOG  : "dialog",
};



// Styles
const H3 = Styled.h3.attrs(({ variant }) => ({ variant }))`
    margin: 0;
    padding: 16px;
    font-size: 15px;
    background-color: var(--none-background);
    border-radius: var(--border-radius);

    ${(props) => props.variant === Variant.PRIMARY && `
        color: var(--title-color);
    `}
    ${(props) => props.variant === Variant.WHITE && `
        color: rgba(255, 255, 255, 0.8);
    `}
    ${(props) => props.variant === Variant.DIALOG && `
        margin: 32px;
        text-align: center;
        color: var(--title-color);
    `}
`;



/**
 * The None Available Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NoneAvailable(props) {
    const { isHidden, className, variant, message } = props;


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <H3 className={className} variant={variant}>
        {NLS.get(message)}
    </H3>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NoneAvailable.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    message   : PropTypes.string.isRequired,
    variant   : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NoneAvailable.defaultProps = {
    isHidden  : false,
    className : "",
    variant   : Variant.PRIMARY,
};

export default NoneAvailable;
