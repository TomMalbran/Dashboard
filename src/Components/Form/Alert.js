import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Outcome }          from "../../Core/Variants";
import NLS                  from "../../Core/NLS";

// Components
import Html                 from "../Common/Html";



// Styles
const Div = Styled.div`
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    transition: all 0.2s linear;
`;

const Content = Styled.div.attrs(({ variant }) => ({ variant }))`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px 8px 16px;
    color: white;
    font-weight: 400;
    border-radius: var(--border-radius);
    transition: all 0.5s;

    & > div > .icon {
        margin-right: 8px;
    }
    & > .icon {
        margin-left: 8px;
        cursor: pointer;
    }

    ${(props) => props.variant === Outcome.SUCCESS && `
        background-color: var(--success-color);
    `}
    ${(props) => props.variant === Outcome.WARNING && `
        background-color: var(--warning-color);
    `}
    ${(props) => props.variant === Outcome.ERROR && `
        background-color: var(--error-color);
    `}
`;



/**
 * The Alert Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Alert(props) {
    const { isHidden, className, variant, message, children } = props;

    let content = children;
    if (message) {
        if (Array.isArray(message)) {
            content = NLS.format(message[0], ...message.slice(1));
        } else {
            content = NLS.get(message);
        }
    }


    // Do the Render
    if (isHidden || !content) {
        return <React.Fragment />;
    }
    return <Div className={`alert ${className}`}>
        <Content variant={variant}>
            {!!message  && <Html>{content}</Html>}
            {!!children && <div>{children}</div>}
        </Content>
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Alert.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    variant   : PropTypes.string.isRequired,
    message   : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Alert.defaultProps = {
    isHidden  : false,
    className : "",
};

export default Alert;
