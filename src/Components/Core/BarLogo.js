import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Href                 from "../../Core/Href";



// Styles
const H2 = Styled.h2.attrs(({ withLink }) => ({ withLink }))`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    ${(props) => props.withLink ? "cursor: pointer;" : ""}
`;

const Img = Styled.img.attrs(({ logoWidth, logoHeight }) => ({ logoWidth, logoHeight }))`
    ${(props) => props.logoWidth  ? `width: ${props.logoWidth}px`   : ""}
    ${(props) => props.logoHeight ? `height: ${props.logoHeight}px` : ""}
`;



/**
 * The Bar Logo Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarLogo(props) {
    const { className, logo, withLink, logoWidth, logoHeight } = props;

    // Handles the Click
    const handleClick = (e) => {
        if (withLink) {
            Href.handleUrl("/", "_self");
            e.stopPropagation();
            e.preventDefault();
        }
    };

    return <H2 className={className} onClick={handleClick} withLink>
        <Img
            src={logo}
            alt={NLS.get("TITLE")}
            logoWidth={logoWidth}
            logoHeight={logoHeight}
        />
    </H2>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarLogo.propTypes = {
    className  : PropTypes.string,
    logo       : PropTypes.string.isRequired,
    logoWidth  : PropTypes.number,
    logoHeight : PropTypes.number,
    withLink   : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
BarLogo.defaultProps = {
    className : "",
    withLink  : false,
};

export default BarLogo;
