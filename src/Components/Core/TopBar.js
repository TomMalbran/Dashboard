import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import NLS                  from "../../Core/NLS";
import Store                from "../../Core/Store";

// Components
import BarIcon              from "../Core/BarIcon";
import BarLogo              from "../Core/BarLogo";
import Avatar               from "../Avatar/Avatar";
import Menu                 from "../Menu/Menu";



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

    @media (max-width: 1000px) {
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
    @media (max-width: 1000px) {
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
    @media (max-width: 1000px) {
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
        onLogout, withTopBar, menuItems, children,
    } = props;

    const avatarRef = React.useRef(null);

    const { hasDetails            } = Store.useState("core");
    const { openMenu, openDetails } = Store.useAction("core");

    // The Current State
    const [ showMenu, setShowMenu ] = React.useState(false);

    // Handles the Profile Menu Open
    const openProfileMenu = (e) => {
        setShowMenu(!showMenu);
        e.stopPropagation();
        e.preventDefault();
    };

    // Handles the Profile Menu Close
    const closeProfileMenu = () => {
        setShowMenu(false);
    };


    // Render the Content
    const hasMenu    = Boolean(menuItems && menuItems.length);
    const showLogout = Boolean(!hasMenu && onLogout);
    const showAvatar = Boolean(avatarUrl);

    let iconVariant = Brightness.DARK;
    if (variant === Brightness.DARK) {
        iconVariant = Brightness.DARKER;
    } else if (variant === Brightness.LIGHT) {
        iconVariant = Brightness.LIGHT;
    }

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
                {showAvatar && <Avatar
                    passedRef={avatarRef}
                    url={!hasMenu ? avatarUrl : null}
                    email={avatarEmail}
                    avatar={avatarAvatar}
                    edition={avatarEdition}
                    size={36}
                    onClick={hasMenu ? openProfileMenu : null}
                />}
            </Div>
        </Nav>

        {hasMenu && <Menu
            open={showMenu}
            targetRef={avatarRef}
            direction="bottom left"
            gap={8}
            onClose={closeProfileMenu}
        >
            {menuItems}
        </Menu>}
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
    withTitle  : false,
    withTopBar : false,
};

export default TopBar;
