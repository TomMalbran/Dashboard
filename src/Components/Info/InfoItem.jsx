import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.section`
    font-size: 13px;
    color: var(--font-light);
`;

const Title = Styled.h3`
    margin: 0;
    color: var(--title-color);
    font-size: 13px;
`;



/**
 * The Info Item Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function InfoItem(props) {
    const { label, message } = props;


    // Do the Render
    if (!message) {
        return <React.Fragment />;
    }
    return <Container>
        <Title>{NLS.get(label)}</Title>
        {NLS.get(message)}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
InfoItem.propTypes = {
    isHidden : PropTypes.bool,
    label    : PropTypes.string.isRequired,
    message  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
InfoItem.defaultProps = {
    isHidden : false,
};

export default InfoItem;
