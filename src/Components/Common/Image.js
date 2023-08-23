import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.img.attrs(({ size }) => ({ size }))`
    display: block;
    width: 100%;
    max-width: ${(props) => `${props.size}px`};
`;



/**
 * The Image
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Image(props) {
    const { source, message, size } = props;

    return <Container
        src={source}
        alt={NLS.get(message || "")}
        size={size || 24}
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Image.propTypes = {
    source  : PropTypes.string.isRequired,
    message : PropTypes.string,
    size    : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
};

export default Image;
