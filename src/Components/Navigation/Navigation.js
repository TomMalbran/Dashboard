import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import { Brightness }       from "../../Core/Variants";
import Utils                from "../../Utils/Utils";



// Styles
const Nav = Styled.nav.attrs(({ variant }) => ({ variant }))`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    width: var(--navigation-width);

    ${(props) => props.variant === Brightness.DARK && `
        background-color: var(--secondary-color);
        color: white;
    `}
    ${(props) => props.variant === Brightness.LIGHT && `
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
    const { className, variant, none, add, isLoading, canAdd, onAction, onClose, children } = props;

    const items = Utils.cloneChildren(children, () => ({
        variant, none, add, isLoading, canAdd, onAction, onClose,
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
    add       : PropTypes.string,
    isLoading : PropTypes.bool,
    canAdd    : PropTypes.bool,
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
    add       : "",
    isLoading : false,
    canAdd    : false,
};

export default Navigation;
