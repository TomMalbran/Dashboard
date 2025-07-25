import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Responsive           from "../../Core/Responsive";

// Components
import NavigationTitle      from "./NavigationTitle";
import NavigationBody       from "./NavigationBody";



// Styles
const Container = Styled.nav.attrs(({ hasScroll }) => ({ hasScroll }))`
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
    overflow: auto;

    ${(props) => props.hasScroll && `
        .navigation-title,
        .navigation-body {
            padding-right: 0;
        }
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
        className, message, fallback, icon, href, noBack,
        smallNav, canAdd, canEdit, canManage, onAction,
        none, add, isLoading, children,
    } = props;

    // The References
    const navigationRef = React.useRef(null);

    // The Current State
    const [ hasScroll, setHasScroll ] = React.useState(false);


    // Check if the Container should scroll
    React.useEffect(() => {
        const container = navigationRef.current;
        setHasScroll(container.scrollHeight > container.clientHeight);

        const observer = new ResizeObserver(([ entry ]) => {
            if (container && entry.target.classList.contains("navigation")) {
                setHasScroll(container.scrollHeight > container.clientHeight);
            }
        });

        observer.observe(navigationRef.current);
        return () => {
            observer.disconnect();
        };
    }, [ navigationRef.current ]);


    // Do the Render
    return <Container
        ref={navigationRef}
        className={`navigation ${className}`}
        hasScroll={hasScroll}
    >
        <NavigationTitle
            message={message}
            fallback={fallback}
            icon={icon}
            href={href}
            noBack={noBack}
            smallNav={smallNav}
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
    fallback  : PropTypes.string,
    icon      : PropTypes.string,
    href      : PropTypes.string,
    none      : PropTypes.string,
    add       : PropTypes.string,
    isLoading : PropTypes.bool,
    noBack    : PropTypes.bool,
    smallNav  : PropTypes.bool,
    canAdd    : PropTypes.bool,
    canEdit   : PropTypes.bool,
    canManage : PropTypes.bool,
    onAction  : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Navigation.defaultProps = {
    className : "",
    href      : "/",
    none      : "",
    add       : "",
    isLoading : false,
    noBack    : false,
    smallNav  : false,
    canAdd    : false,
    canEdit   : false,
    canManage : false,
};

export default Navigation;
