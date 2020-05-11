import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Html                 from "../Common/Html";



// Styles
const Div = Styled.div`
    margin: 0 0 32px 0;
    color: var(--black-color);
    font-weight: 400;
`;

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
    const { isHidden, className, variant, html, message, children } = props;
    const content = message ? NLS.get(message) : html;

    if (isHidden || (!content && !children)) {
        return <React.Fragment />;
    }
    if (children) {
        return <Div className={className}>{children}</Div>;
    }
    return <Content variant={variant} className={className}>
        {content}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogMessage.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    variant   : PropTypes.string,
    message   : PropTypes.string,
    html      : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogMessage.defaultProps = {
    isHidden  : false,
    className : "",
    variant   : "div",
};

export default DialogMessage;
