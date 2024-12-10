import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import NLS                  from "../../Core/NLS";
import Responsive           from "../../Core/Responsive";
import Store                from "../../Core/Store";

// Components
import TopAvatar            from "./TopAvatar";
import BarIcon              from "../Core/BarIcon";
import BarLogo              from "../Core/BarLogo";



// Styles
const Nav = Styled.nav.attrs(({ variant, withTopBar }) => ({ variant, withTopBar }))`
    grid-area: topbar;
    position: relative;
    display: ${(props) => props.withTopBar ? "flex" : "none"};
    box-sizing: border-box;
    justify-content: space-between;
    height: var(--topbar-height);
    padding: 0 12px;
    gap: 8px;

    ${(props) => props.variant === Brightness.LIGHT && `
        background-color: white;
        &::after {
            content: "";
            position: absolute;
            bottom: -2px;
            right: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(rgba(9, 30, 66, 0.13) 0px, rgba(9, 30, 66, 0.13) 1px, rgba(9, 30, 66, 0.08) 1px, rgba(9, 30, 66, 0) 4px);
        }
    `}
    ${(props) => props.variant === Brightness.DARK && `
        background-color: var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.DARKER && `
        background-color: var(--secondary-color);
    `}

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

const TopLogo = Styled(BarLogo)`
    .link-content {
        display: block;
    }
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
        className, variant, logo, logoWidth, logoHeight, withTitle,
        avatarUrl, avatarEmail, avatarAvatar, avatarEdition,
        showParent, parentTitle, parentName,
        onLogout, withTopBar, menuItems, children,
    } = props;

    const { hasDetails            } = Store.useState("core");
    const { openMenu, openDetails } = Store.useAction("core");


    // Variables
    const hasMenu    = Boolean(menuItems && menuItems.length);
    const showLogout = Boolean(!hasMenu && onLogout);

    let iconVariant = Brightness.DARK;
    if (variant === Brightness.DARK) {
        iconVariant = Brightness.DARKER;
    } else if (variant === Brightness.LIGHT) {
        iconVariant = Brightness.LIGHT;
    }


    // Do the Render
    return <>
        <Nav
            className={`topbar ${className}`}
            variant={variant}
            withTopBar={withTopBar}
        >
            <Div>
                <MenuIcon
                    variant={iconVariant}
                    icon="menu"
                    onClick={openMenu}
                />
                <TopLogo
                    logo={logo}
                    logoWidth={logoWidth}
                    logoHeight={logoHeight}
                    withLink
                />
                {withTitle && <H1>{NLS.get("TITLE")}</H1>}
            </Div>

            <Div>
                {children}
                {showLogout && <BarIcon
                    variant={iconVariant}
                    icon="logout"
                    onClick={onLogout}
                />}
                {hasDetails && <DetailIcon
                    variant={iconVariant}
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
        </Nav>
    </>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TopBar.propTypes = {
    className     : PropTypes.string,
    variant       : PropTypes.string,
    logo          : PropTypes.string.isRequired,
    logoWidth     : PropTypes.number,
    logoHeight    : PropTypes.number,
    withTitle     : PropTypes.bool,
    avatarUrl     : PropTypes.string,
    avatarEmail   : PropTypes.string,
    avatarAvatar  : PropTypes.string,
    avatarEdition : PropTypes.number,
    showParent    : PropTypes.bool,
    parentTitle   : PropTypes.string,
    parentName    : PropTypes.string,
    onLogout      : PropTypes.func,
    withTopBar    : PropTypes.bool,
    menuItems     : PropTypes.array,
    children      : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TopBar.defaultProps = {
    className  : "",
    variant    : Brightness.DARKER,
    showParent : false,
    withTitle  : false,
    withTopBar : false,
};

export default TopBar;
