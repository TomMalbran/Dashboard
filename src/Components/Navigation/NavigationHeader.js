import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Header = Styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    min-height: var(--header-height);
    padding: 18px 12px 10px 8px;
`;

const Img = Styled.img`
    display: block;
`;

const H1 = Styled.h1`
    margin: 0 0 0 8px;
    font-size: 32px;
    font-weight: 200;
    color: white;
    font-family: var(--title-font);
`;



/**
 * The Navigation Header Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationHeader(props) {
    const { logo, className } = props;
    
    return <Header className={className}>
        {logo ?
            <Img src={logo} alt={NLS.get("TITLE")} /> :
            <H1>{NLS.get("TITLE")}</H1>
        }
    </Header>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
NavigationHeader.propTypes = {
    className : PropTypes.string,
    logo      : PropTypes.string,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
NavigationHeader.defaultProps = {
    className : "",
};

export default NavigationHeader;
