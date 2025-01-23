import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.h1.attrs(({ withLink }) => ({ withLink }))`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    ${(props) => props.withLink ? "cursor: pointer;" : ""}
`;

const Image = Styled.img`
    width: var(--bar-logo-width, auto);
    height: var(--bar-logo-height, auto);
    max-width: var(--bar-logo-max-width, none);
    max-height: var(--bar-logo-max-height, none);
    margin-bottom: var(--bar-logo-bottom, 0);
`;



/**
 * The Bar Logo Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarLogo(props) {
    const { className, logo, withLink } = props;

    const navigate = Navigate.useGotoUrl();


    // Handles the Click
    const handleClick = (e) => {
        if (withLink) {
            navigate("/", "_self");
            e.stopPropagation();
            e.preventDefault();
        }
    };


    // Do the Render
    if (!logo) {
        return <React.Fragment />;
    }
    return <Container
        className={className}
        onClick={handleClick}
        withLink
    >
        <Image
            src={logo}
            alt={NLS.get("TITLE")}
        />
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarLogo.propTypes = {
    className  : PropTypes.string,
    logo       : PropTypes.string,
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
