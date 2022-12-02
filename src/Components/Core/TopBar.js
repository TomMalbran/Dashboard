import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import BarIcon              from "../Core/BarIcon";
import BarLogo              from "../Core/BarLogo";
import Avatar               from "../Avatar/Avatar";



// Styles
const Nav = Styled.nav`
    display: none;
    box-sizing: border-box;
    justify-content: space-between;
    height: var(--topbar-height);
    padding: 0 12px;
    background-color: var(--secondary-color);

    @media (max-width: 1000px) {
        display: flex;
    }
`;
const Div = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TopLogo = Styled(BarLogo)`
    margin-left: 12px;
    .link-content {
        display: block;
    }
`;
const TopIcon = Styled(BarIcon)`
    font-size: 24px;
    color: white;
    cursor: pointer;
    margin-bottom: 0;
`;
const H1 = Styled.h1`
    margin: 0 0 0 8px;
    font-size: 28px;
    font-weight: 200;
    color: white;
    font-family: var(--title-font);
`;
const DetailIcon = Styled(BarIcon)`
    font-size: 24px;
    color: white;
    cursor: pointer;
    margin-bottom: 0;
    margin-left: 12px;
`;



/**
 * The Top Bar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TopBar(props) {
    const {
        className, logo, logoWidth, logoHeight, withTitle,
        onMenu, onDetails, showDetails,
        avatarUrl, avatarEmail, avatarAvatar, avatarEdition,
    } = props;

    return <Nav className={`topbar ${className}`}>
        <Div>
            {!!onMenu && <TopIcon
                variant="dark"
                icon="menu"
                onClick={onMenu}
            />}
            <TopLogo
                logo={logo}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
                withLink
            />
            {withTitle && <H1>{NLS.get("TITLE")}</H1>}
        </Div>
        <Div>
            {!!avatarUrl && <Avatar
                url={avatarUrl}
                email={avatarEmail}
                avatar={avatarAvatar}
                edition={avatarEdition}
                size={36}
            />}
            {showDetails && <DetailIcon
                variant="dark"
                icon="details"
                onClick={onDetails}
            />}
        </Div>
    </Nav>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TopBar.propTypes = {
    className     : PropTypes.string,
    logo          : PropTypes.string.isRequired,
    logoWidth     : PropTypes.number,
    logoHeight    : PropTypes.number,
    withTitle     : PropTypes.bool,
    showDetails   : PropTypes.bool.isRequired,
    onMenu        : PropTypes.func.isRequired,
    onDetails     : PropTypes.func.isRequired,
    avatarUrl     : PropTypes.string,
    avatarEmail   : PropTypes.string,
    avatarAvatar  : PropTypes.string,
    avatarEdition : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TopBar.defaultProps = {
    className : "",
    withTitle : false,
};

export default TopBar;
