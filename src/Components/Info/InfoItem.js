import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Section = Styled.section`
    font-size: 13px;
`;

const H3 = Styled.h3`
    margin: 0;
    color: var(--title-color);
    font-size: 13px;
`;



/**
 * The Info Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InfoItem(props) {
    const { label, message } = props;

    if (!message) {
        return <React.Fragment />;
    }
    return <Section>
        <H3>{NLS.get(label)}</H3>
        {NLS.get(message)}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InfoItem.propTypes = {
    isHidden : PropTypes.bool,
    label    : PropTypes.string.isRequired,
    message  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InfoItem.defaultProps = {
    isHidden : false,
};

export default InfoItem;
