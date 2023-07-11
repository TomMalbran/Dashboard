import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Brightness }       from "../../Core/Variants";
import NLS                  from "../../Core/NLS";
import Responsive           from "../../Core/Responsive";
import Store                from "../../Core/Store";

// Components
import BarLogo              from "../Core/BarLogo";
import BarIcon              from "../Core/BarIcon";
import Avatar               from "../Avatar/Avatar";
import IconLink             from "../Link/IconLink";



// Styles
const Nav = Styled.nav.attrs(({ variant, withBorder, expandMobile }) => ({ variant, withBorder, expandMobile }))`
    grid-area: sidebar;
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: var(--sidebar-width);
    padding: 16px 0;

    ${(props) => props.variant === Brightness.DARK && `
        background-color: var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.DARKER && `
        background-color: var(--secondary-color);
    `}
    ${(props) => props.withBorder && `
        border-right: 1px solid var(--border-color-dark);
    `}

    ${(props) => props.expandMobile && `
        .baricon-text {
            display: none;
        }
        @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
            & > div {
                align-items: flex-start;
            }
            h2 {
                width: 100%;
            }
            .baricon {
                width: 100%;
                justify-content: flex-start;
            }
            .baricon-text {
                display: block;
            }
        }
    `}

    @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: var(--z-sidebar);
    }
`;

const Div = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const Name = Styled.div`
    margin-bottom: 8px;
    white-space: nowrap;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.2);
    font-size: 20px;
    font-weight: 800;
    font-family: var(--title-font);
    transform: translate(50%) rotate(-90deg);
    transform-origin: left center;
`;

const SideLogo = Styled(BarLogo)`
    margin-bottom: 8px;
    margin-top: var(--sidebar-top);
    height: var(--sidebar-logo);
`;

const SideAvatar = Styled(Avatar)`
    margin-top: 6px;
`;

const CloseIcon = Styled(IconLink)`
    display: none;
    position: absolute;
    top: 8px;
    left: 8px;

    @media (max-width: ${Responsive.WIDTH_FOR_MENU}px) {
        display: block;
    }
`;



/**
 * The Side Bar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SideBar(props) {
    const {
        className, variant, withBorder, expandMobile,
        logo, logoWidth, logoHeight,
        hasSearch, onSearch, hasCreate, onCreate, onClose,
        onLogout, message, avatarUrl, avatarEmail, avatarAvatar, avatarEdition,
        children,
    } = props;

    const { closeMenu } = Store.useAction("core");

    // Handles the Search Click
    const handleSearch = (e) => {
        if (onClose) {
            onClose(e);
        }
        onSearch(e);
    };

    // Handles the Create Click
    const handleCreate = (e) => {
        if (onClose) {
            onClose(e);
        }
        onCreate(e);
    };


    const iconVariant = variant === Brightness.DARK ? Brightness.DARKER : Brightness.DARK;

    return <Nav
        className={`sidebar ${className}`}
        variant={variant}
        withBorder={withBorder}
        expandMobile={expandMobile}
    >
        {expandMobile && <CloseIcon
            variant="dark"
            icon="close"
            onClick={closeMenu}
            isSmall
        />}
        <Div>
            {!!logo && <SideLogo
                logo={logo}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
                withLink
            />}
            {hasSearch && <BarIcon
                variant={iconVariant}
                icon="search"
                onClick={handleSearch}
            />}
            {hasCreate && <BarIcon
                variant={iconVariant}
                icon="add"
                onClick={handleCreate}
            />}
            {children}
        </Div>
        <Div>
            {!!message && <Name>{NLS.get(message)}</Name>}
            {!!onLogout && <BarIcon
                variant={iconVariant}
                icon="logout"
                onClick={onLogout}
            />}
            {!!avatarUrl && <SideAvatar
                url={avatarUrl}
                email={avatarEmail}
                avatar={avatarAvatar}
                edition={avatarEdition}
                size={36}
                onClick={onClose}
            />}
        </Div>
    </Nav>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
SideBar.propTypes = {
    className     : PropTypes.string,
    variant       : PropTypes.string,
    logo          : PropTypes.string,
    logoWidth     : PropTypes.number,
    logoHeight    : PropTypes.number,
    hasSearch     : PropTypes.bool,
    hasCreate     : PropTypes.bool,
    onSearch      : PropTypes.func,
    onCreate      : PropTypes.func,
    onClose       : PropTypes.func,
    onLogout      : PropTypes.func,
    message       : PropTypes.string,
    avatarUrl     : PropTypes.string,
    avatarEmail   : PropTypes.string,
    avatarAvatar  : PropTypes.string,
    avatarEdition : PropTypes.number,
    withBorder    : PropTypes.bool,
    withTopBar    : PropTypes.bool,
    expandMobile  : PropTypes.bool,
    children      : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SideBar.defaultProps = {
    className    : "",
    variant      : Brightness.DARKER,
    hasSearch    : false,
    hasCreate    : false,
    withBorder   : false,
    withTopBar   : false,
    expandMobile : false,
};

export default SideBar;
