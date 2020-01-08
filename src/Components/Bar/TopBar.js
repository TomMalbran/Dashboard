import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Avatar               from "../Common/Avatar";
import Icon                 from "../Common/Icon";
import BarLogo              from "../Bar/BarLogo";
// import BarIcon              from "../Bar/BarIcon";



// Styles
const Nav = Styled.nav`
    display: none;
    box-sizing: border-box;
    justify-content: space-between;
    height: var(--topbar-height);
    padding: 0 12px;
    background-color: var(--secondary-color);
`;

const Div = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Logo = Styled.div`
    margin-left: 12px;

    .link-content {
        display: block;
    }
`;



/**
 * The Top Bar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TopBar(props) {
    const { className, logo, onMenu, onDetails, showDetails, avatarUrl, avatarData } = props;

    return <Nav className={className}>
        <Div>
            {!!onMenu && <Icon
                className="topbar-icon"
                icon="menu"
                onClick={onMenu}
            />}
            <Logo>
                <BarLogo logo={logo} withLink />
            </Logo>
        </Div>
        <Div>
            {!!avatarUrl && <Avatar
                url={avatarUrl}
                data={avatarData}
            />}
            {showDetails && <Icon
                className="topbar-icon"
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
    className   : PropTypes.string,
    logo        : PropTypes.string.isRequired,
    showDetails : PropTypes.bool.isRequired,
    onMenu      : PropTypes.func.isRequired,
    onDetails   : PropTypes.func.isRequired,
    avatarUrl   : PropTypes.string.isRequired,
    avatarData  : PropTypes.object.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TopBar.defaultProps = {
    className : "",
};

export default TopBar;
