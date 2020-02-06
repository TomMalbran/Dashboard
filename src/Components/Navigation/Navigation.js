import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Variants
const Variant = {
    DARK  : "dark",
    LIGHT : "light",
};



// Styles
const Nav = Styled.nav.attrs(({ variant }) => ({ variant }))`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    width: var(--navigation-width);

    ${(props) => props.variant === Variant.DARK && `
        background-color: var(--secondary-color);
        color: white;
    `}
    ${(props) => props.variant === Variant.LIGHT && `
        background-color: var(--lighter-gray);
        color: var(--font-light);
    `}

    @media (max-width: 1000px) {
        display: none;
        position: fixed;
        top: 0;
        left: var(--sidebar-width);
        bottom: 0;
        z-index: var(--z-navigation);
    }
`;



/**
 * The Navigation Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Navigation(props) {
    const { className, variant, none, isLoading, onAction, onClose, children } = props;

    const items = Utils.cloneChildren(children, () => ({
        variant, none, isLoading, onAction, onClose,
    }));

    return <Nav className={`navigation ${className}`} variant={variant}>
        {items}
    </Nav>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Navigation.propTypes = {
    variant   : PropTypes.string.isRequired,
    className : PropTypes.string,
    none      : PropTypes.string,
    isLoading : PropTypes.bool,
    onAction  : PropTypes.func,
    onClose   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Navigation.defaultProps = {
    className : "",
    none      : "",
    isLoading : false,
};

export default Navigation;
