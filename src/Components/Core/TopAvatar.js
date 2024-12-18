import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";

// Components
import Avatar               from "../Avatar/Avatar";
import Menu                 from "../Menu/Menu";



// Styles
const Container = Styled.div.attrs(({ hasMenu, hasContent }) => ({ hasMenu, hasContent }))`
    ${(props) => props.hasMenu && `
        cursor: pointer;
        transition: background .15s;
        :hover {
            background: hsla(0, 0%, 60%, .12);
        }
    `}

    ${(props) => props.hasContent ? `
        display: flex;
        gap: 8px;
        padding: var(--topbar-avatar-padding);
        background: var(--topbar-avatar-background);
        border: var(--topbar-avatar-border);
        border-radius: 9999px;
    ` : `
        border-radius: 9999px;
    `}
`;

const Content = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    max-width: 160px;

    b {
        font-size: 10px;
        white-space: nowrap;
        color: var(--font-lighter);
    }
    span {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;



/**
 * The Top Avatar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TopAvatar(props) {
    const {
        avatarUrl, avatarEmail, avatarAvatar, avatarEdition,
        showParent, parentTitle, parentName, menuItems,
    } = props;


    // The References
    const avatarRef = React.useRef(null);

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


    // Variables
    const hasMenu        = Boolean(menuItems && menuItems.length);
    const showAvatar     = Boolean(avatarUrl);
    const showCredential = Boolean(showParent && parentName);


    // Do the Render
    if (!showAvatar) {
        return <React.Fragment />;
    }
    return <>
        <Container
            ref={avatarRef}
            onClick={hasMenu ? openProfileMenu : null}
            hasMenu={hasMenu}
            hasContent={showCredential}
        >
            {showCredential && <Content>
                <b>{NLS.get(parentTitle)}</b>
                <span>{parentName}</span>
            </Content>}

            <Avatar
                url={!hasMenu ? avatarUrl : null}
                email={avatarEmail}
                avatar={avatarAvatar}
                edition={avatarEdition}
                size={showCredential ? 32 : 36}
            />
        </Container>

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
TopAvatar.propTypes = {
    avatarUrl     : PropTypes.string,
    avatarEmail   : PropTypes.string,
    avatarAvatar  : PropTypes.string,
    avatarEdition : PropTypes.number,
    showParent    : PropTypes.bool,
    parentTitle   : PropTypes.string,
    parentName    : PropTypes.string,
    menuItems     : PropTypes.array,
};

export default TopAvatar;
