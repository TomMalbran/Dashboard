import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Avatar               from "../Common/Avatar";
import BarLogo              from "../Bar/BarLogo";
import BarIcon              from "../Bar/BarIcon";



// Styles
const Nav = Styled.nav`
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: var(--sidebar-width);
    padding: 16px 8px 8px;
    background-color: var(--secondary-color);
    border-right: 1px solid var(--border-color);
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

const Image = Styled.div`
    margin-top: 6px;
`;



/**
 * The Side Bar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SideBar(props) {
    const { className, logo, onSearch, onCreate, onLogout, name, avatarData, avatarUrl } = props;

    return <Nav className={className}>
        <Div>
            <BarLogo logo={logo} withLink />
            {!!onSearch && <BarIcon
                variant="dark"
                icon="search"
                onClick={onSearch}
            />}
            {!!onCreate && <BarIcon
                variant="dark"
                icon="add"
                onClick={onCreate}
            />}
        </Div>
        <Div>
            {!!name && <Name>{name}</Name>}
            {!!onLogout && <BarIcon
                variant="dark"
                icon="logout"
                onClick={onLogout}
            />}
            {!!avatarUrl && <Image>
                <Avatar
                    size="36"
                    url={avatarUrl}
                    data={avatarData}
                />
            </Image>}
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
    onSearch   : PropTypes.func,
    onCreate   : PropTypes.func,
    onLogout   : PropTypes.func,
    name       : PropTypes.string,
    avatarUrl  : PropTypes.string,
    avatarData : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SideBar.defaultProps = {
    className : "",
};

export default SideBar;
