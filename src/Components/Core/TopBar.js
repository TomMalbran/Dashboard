import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

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
        className, logo, logoWidth, logoHeight, onMenu,
        onDetails, showDetails, avatarUrl, avatarData, avatarEdition,
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
        </Div>
        <Div>
            {!!avatarUrl && <Avatar
                url={avatarUrl}
                data={avatarData}
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
    showDetails   : PropTypes.bool.isRequired,
    onMenu        : PropTypes.func.isRequired,
    onDetails     : PropTypes.func.isRequired,
    avatarUrl     : PropTypes.string,
    avatarData    : PropTypes.object,
    avatarEdition : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TopBar.defaultProps = {
    className : "",
};

export default TopBar;
