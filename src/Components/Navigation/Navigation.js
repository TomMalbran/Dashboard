import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import Utils                from "../../Utils/Utils";
import Responsive           from "../../Core/Responsive";



// Styles
const Nav = Styled.nav.attrs(({ variant }) => ({ variant }))`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    width: var(--navigation-width);
    max-height: var(--main-height);
    border-right: var(--navigation-border);
    font-size: var(--navigation-font-size, var(--font-size));

    ${(props) => props.variant === Brightness.DARK && `
        background-color: var(--secondary-color);
        color: white;
    `}
    ${(props) => props.variant === Brightness.LIGHT && `
        background-color: var(--navigation-background);
        color: var(--font-light);
    `}

    @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
        display: none;
        position: fixed;
        top: 0;
        left: var(--sidebar-width);
        height: var(--full-height);
        max-height: none;
        max-width: calc(100vw - var(--sidebar-width));
        z-index: var(--z-navigation);
    }
`;



/**
 * The Navigation Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Navigation(props) {
    const {
        className, variant, none, add, isLoading,
        canAdd, canEdit, canManage, onAction, children,
    } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        variant, none, add, isLoading, canAdd, canEdit, canManage, onAction,
    }));


    // Do the Render
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
    onAction  : PropTypes.func,
    canAdd    : PropTypes.bool,
    canEdit   : PropTypes.bool,
    canManage : PropTypes.bool,
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
    canEdit   : false,
    canManage : false,
};

export default Navigation;
