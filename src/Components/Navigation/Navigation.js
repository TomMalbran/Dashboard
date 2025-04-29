import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Responsive           from "../../Core/Responsive";

// Components
import NavigationTitle      from "./NavigationTitle";
import NavigationBody       from "./NavigationBody";



// Styles
const Container = Styled.nav.attrs(({ isSmall }) => ({ isSmall }))`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    width: var(--navigation-width);
    max-height: var(--main-height);
    border-right: var(--navigation-border);
    font-size: var(--navigation-font-size, var(--font-size));
    color: var(--navigation-color, --font-light);
    background-color: var(--navigation-background);

    ${(props) => props.isSmall && "width: var(--navigation-width-small);"}

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
        className, message, fallback, icon, href, noBack,
        canAdd, canEdit, canManage, onAction, isSmall,
        none, add, isLoading, children,
    } = props;


    // Do the Render
    return <Container
        className={`navigation ${className}`}
        isSmall={isSmall}
    >
        <NavigationTitle
            message={message}
            fallback={fallback}
            icon={icon}
            href={href}
            noBack={noBack}
            canAdd={canAdd}
            canEdit={canEdit}
            canManage={canManage}
            onAction={onAction}
        />
        <NavigationBody
            isLoading={isLoading}
            canAdd={canAdd}
            add={add}
            none={none}
            onAction={onAction}
        >
            {children}
        </NavigationBody>
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Navigation.propTypes = {
    className : PropTypes.string,
    message   : PropTypes.string,
    icon      : PropTypes.string,
    fallback  : PropTypes.string,
    href      : PropTypes.string,
    none      : PropTypes.string,
    add       : PropTypes.string,
    isLoading : PropTypes.bool,
    onAction  : PropTypes.func,
    noBack    : PropTypes.bool,
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
    noBack    : false,
    isLoading : false,
    canAdd    : false,
    canEdit   : false,
    canManage : false,
};

export default Navigation;
