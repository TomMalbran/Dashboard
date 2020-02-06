import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import BarLogo              from "../Core/BarLogo";
import BarIcon              from "../Core/BarIcon";
import Avatar               from "../Common/Avatar";



// Styles
const Nav = Styled.nav.attrs(({ withBorder }) => ({ withBorder }))`
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: var(--sidebar-width);
    background-color: var(--secondary-color);
    padding: 16px 0;
    ${(props) => props.withBorder ? "border-right: 1px solid var(--border-color)" : ""};

    @media (max-width: 1000px) {
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
`;

const Name = Styled.div`
    margin-bottom: 8px;
    white-space: nowrap;
    letter-spacing: 2px;
    color: var(--border-color);
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



/**
 * The Side Bar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SideBar(props) {
    const {
        className, withBorder,
        logo, logoSize,
        hasSearch, onSearch, hasCreate, onCreate, onClose,
        onLogout, message, avatarData, avatarUrl,
    } = props;

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


    return <Nav className={`sidebar ${className}`} withBorder={withBorder}>
        <Div>
            <SideLogo
                logo={logo}
                size={logoSize}
                withLink
            />
            {hasSearch && <BarIcon
                variant="dark"
                icon="search"
                onClick={handleSearch}
            />}
            {hasCreate && <BarIcon
                variant="dark"
                icon="add"
                onClick={handleCreate}
            />}
        </Div>
        <Div>
            {!!message && <Name>{NLS.get(message)}</Name>}
            {!!onLogout && <BarIcon
                variant="dark"
                icon="logout"
                onClick={onLogout}
            />}
            {!!avatarUrl && <SideAvatar
                url={avatarUrl}
                data={avatarData}
                size={36}
            />}
        </Div>
    </Nav>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
SideBar.propTypes = {
    className  : PropTypes.string,
    logo       : PropTypes.string.isRequired,
    logoSize   : PropTypes.number,
    hasSearch  : PropTypes.bool,
    hasCreate  : PropTypes.bool,
    onSearch   : PropTypes.func,
    onCreate   : PropTypes.func,
    onClose    : PropTypes.func,
    onLogout   : PropTypes.func,
    message    : PropTypes.string,
    avatarUrl  : PropTypes.string,
    avatarData : PropTypes.object,
    withBorder : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SideBar.defaultProps = {
    className  : "",
    hasSearch  : false,
    hasCreate  : false,
    withBorder : false,
};

export default SideBar;
