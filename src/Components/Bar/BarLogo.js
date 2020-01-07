import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                   from "../../Core/NLS";

// Components
import HyperLink            from "../Common/HyperLink";



// Styles
const H2 = Styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;
    
const Img = Styled.img`
    width: 32px;
`;



/**
 * The Bar Logo Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarLogo(props) {
    const { className, logo, withLink } = props;
    const image = <Img src={logo} alt={NLS.get("TITLE")} />;

    return <H2 className={className}>
        {withLink ? <HyperLink href="/" variant="none">
            {image}
        </HyperLink> : image}
    </H2>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarLogo.propTypes = {
    className : PropTypes.string,
    logo      : PropTypes.string.isRequired,
    withLink  : PropTypes.bool,
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
