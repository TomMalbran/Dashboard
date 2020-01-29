import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Html                 from "../Common/Html";



// Styles
const Content = Styled(Html)`
    margin: 0 0 32px 0;
    color: var(--black-color);
    font-weight: 400;

    & + & {
        margin-top: -16px;
    }
`;



/**
 * The Dialog Message Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogMessage(props) {
    const { variant, html, message } = props;
    const content = message ? NLS.get(message) : html;

    if (!content) {
        return <React.Fragment />;
    }
    return <Content variant={variant}>
        {content}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogMessage.propTypes = {
    variant : PropTypes.string,
    message : PropTypes.string,
    html    : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogMessage.defaultProps = {
    variant : "p",
};

export default DialogMessage;
