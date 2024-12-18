import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Responsive           from "../../Core/Responsive";
import Store                from "../../Core/Store";

// Components
import TopAvatar            from "./TopAvatar";
import BarIcon              from "../Core/BarIcon";
import BarLogo              from "../Core/BarLogo";



// Styles
const Container = Styled.nav.attrs(({ withTopBar, showDev }) => ({ withTopBar, showDev }))`
    --bar-logo-width: var(--topbar-logo-width, auto);
    --bar-logo-height: var(--topbar-logo-height, auto);
    --bar-logo-max-width: var(--topbar-logo-max-width, none);
    --bar-logo-max-height: var(--topbar-logo-max-height, none);

    --bar-icon-size: var(--topbar-icon-size, 32px);
    --bar-icon-font: var(--topbar-icon-font, 16px);
    --bar-icon-color: var(--topbar-icon-color);
    --bar-icon-background: var(--topbar-icon-background);
    --bar-icon-hover-color: var(--topbar-icon-hover-color);
    --bar-icon-hover-bg: var(--topbar-icon-hover-bg);

    grid-area: topbar;
    flex-shrink: 0;
    position: relative;
    display: ${(props) => props.withTopBar ? "flex" : "none"};
    box-sizing: border-box;
    justify-content: space-between;
    height: var(--topbar-height, 56px);
    padding: var(--topbar-padding, 0 12px);
    background-color: var(--topbar-background, white);
    border-bottom: var(--topbar-border, none);
    gap: 8px;

    ${(props) => props.showDev && `h1::after {
        content: "DEV";
        display: block;
        margin-left: 16px;
        font-weight: 400;
        font-size: 18px;
    }`}

    @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
        display: flex;
    }
`;

const Div = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const MenuIcon = Styled(BarIcon)`
    display: none;

    @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
        display: flex;
    }
`;

const H1 = Styled.h1`
    margin: 0 0 0 8px;
    font-size: 28px;
    font-weight: 200;
    color: white;
    font-family: var(--title-font);
`;

const DetailIcon = Styled(BarIcon)`
    display: none;
    @media (max-width: 1200px) {
        display: flex;
    }
`;



/**
 * The Top Bar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TopBar(props) {
    const {
        className, withTopBar, withTitle, withDev, logo,
        avatarUrl, avatarEmail, avatarAvatar, avatarEdition,
        showParent, parentTitle, parentName,
        onLogout, menuItems, children,
    } = props;

    const { hasDetails            } = Store.useState("core");
    const { openMenu, openDetails } = Store.useAction("core");


    // Variables
    const showDev    = withDev && process.env.REACT_APP_ENV === "development";
    const hasMenu    = Boolean(menuItems && menuItems.length);
    const showLogout = Boolean(!hasMenu && onLogout);


    // Do the Render
    return <Container
        className={`topbar ${className}`}
        withTopBar={withTopBar}
        showDev={showDev}
    >
        <Div>
            <MenuIcon
                icon="menu"
                onClick={openMenu}
            />
            <BarLogo
                logo={logo}
                withLink
            />
            {withTitle && <H1>{NLS.get("TITLE")}</H1>}
        </Div>

        <Div>
            {children}
            {showLogout && <BarIcon
                icon="logout"
                onClick={onLogout}
            />}
            {hasDetails && <DetailIcon
                icon="details"
                onClick={openDetails}
            />}

            <TopAvatar
                avatarUrl={avatarUrl}
                avatarEmail={avatarEmail}
                avatarAvatar={avatarAvatar}
                avatarEdition={avatarEdition}
                showParent={showParent}
                parentTitle={parentTitle}
                parentName={parentName}
                menuItems={menuItems}
            />
        </Div>
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TopBar.propTypes = {
    className     : PropTypes.string,
    variant       : PropTypes.string,
    withTopBar    : PropTypes.bool,
    withTitle     : PropTypes.bool,
    withDev       : PropTypes.bool,
    logo          : PropTypes.string.isRequired,
    avatarUrl     : PropTypes.string,
    avatarEmail   : PropTypes.string,
    avatarAvatar  : PropTypes.string,
    avatarEdition : PropTypes.number,
    showParent    : PropTypes.bool,
    parentTitle   : PropTypes.string,
    parentName    : PropTypes.string,
    onLogout      : PropTypes.func,
    menuItems     : PropTypes.array,
    children      : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TopBar.defaultProps = {
    className  : "",
    showParent : false,
    withTopBar : false,
    withTitle  : false,
    withDev    : false,
};

export default TopBar;
