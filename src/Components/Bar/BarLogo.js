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
    margin-bottom: 8px;

    img {
        width: 32px;
    }
`;



/**
 * The Bar Logo Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarLogo(props) {
    const { logo, withLink } = props;
    const image = <img src={logo} alt={NLS.get("TITLE")} />;

    return <H2>
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
    logo     : PropTypes.string,
    withLink : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
BarLogo.defaultProps = {
    withLink : false,
};

export default BarLogo;
