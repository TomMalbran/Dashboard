import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Href                 from "../../Utils/Href";



// Styles
const H2 = Styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;
    
const Img = Styled.img.attrs(({ size }) => ({ size }))`
    width: ${(props) => props.size}px;
`;



/**
 * The Bar Logo Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarLogo(props) {
    const { history, className, logo, withLink, size } = props;

    // Handles the Click
    const handleClick = (e) => {
        if (withLink) {
            Href.handleUrl("/", "_self", history);
            e.stopPropagation();
            e.preventDefault();
        }
    };

    return <H2 className={className} onClick={handleClick}>
        <Img src={logo} alt={NLS.get("TITLE")} size={size} />
    </H2>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarLogo.propTypes = {
    history   : PropTypes.object.isRequired,
    className : PropTypes.string,
    logo      : PropTypes.string.isRequired,
    withLink  : PropTypes.bool,
    size      : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
BarLogo.defaultProps = {
    className : "",
    withLink  : false,
    size      : 32,
};

export default withRouter(BarLogo);
