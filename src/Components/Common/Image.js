import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.img.attrs(({ size, width }) => ({ size, width }))`
    display: block;
    ${(props) => props.width ? `
        width: 100%;
        max-width: ${props.width}px;
    ` : `
        width: ${props.size}px;
        height: ${props.size}px;
        object-fit: contain;
        object-position: center;
    `}

`;



/**
 * The Image
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Image(props) {
    const { source, message, size, width } = props;


    // Do the Render
    if (!source) {
        return <React.Fragment />;
    }
    return <Container
        src={source}
        alt={NLS.get(message || "")}
        size={size || 24}
        width={width}
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Image.propTypes = {
    source  : PropTypes.string,
    message : PropTypes.string,
    size    : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    width   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
};

export default Image;
