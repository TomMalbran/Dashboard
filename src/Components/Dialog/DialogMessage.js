import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Html                 from "../Common/Html";



// Styles
const Div = Styled.div.attrs(({ centered }) => ({ centered }))`
    color: var(--black-color);
    font-weight: 400;
    ${(props) => props.centered ? "text-align: center;" : ""}
`;

const Content = Styled(Html).attrs(({ centered, noSpace }) => ({ centered, noSpace }))`
    color: var(--black-color);
    font-weight: 400;
    ${(props) => props.centered && "text-align: center;"}
    ${(props) => props.noSpace && "margin: 0;"}
`;



/**
 * The Dialog Message Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogMessage(props) {
    const {
        isHidden, className, variant, centered, noSpace,
        html, message, children,
    } = props;

    const content = message ? NLS.get(message) : html;

    if (isHidden || (!content && !children)) {
        return <React.Fragment />;
    }

    if (children) {
        return <Div
            className={className}
            centered={centered}
        >
            {children}
        </Div>;
    }

    return <Content
        variant={variant}
        className={className}
        centered={centered}
        noSpace={noSpace}
    >
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
    centered  : PropTypes.bool,
    noSpace   : PropTypes.bool,
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
    centered  : false,
    noSpace   : false,
};

export default DialogMessage;
