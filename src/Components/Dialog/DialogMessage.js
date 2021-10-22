import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Html                 from "../Common/Html";



// Styles
const Div = Styled.div.attrs(({ smallSpace, noSpace, centered }) => ({ smallSpace, noSpace, centered }))`
    color: var(--black-color);
    font-weight: 400;
    ${(props) => props.centered ? "text-align: center;" : ""}
    ${(props) => props.noSpace ? "margin: 0;" : (
        props.smallSpace ? "margin: 0 0 16px 0;" : "margin: 0 0 32px 0;"
    )}
`;

const Content = Styled(Html).attrs(({ smallSpace, noSpace, centered }) => ({ smallSpace, noSpace, centered }))`
    color: var(--black-color);
    font-weight: 400;
    ${(props) => props.centered ? "text-align: center;" : ""}
    ${(props) => props.noSpace ? "margin: 0;" : (
        props.smallSpace ? "margin: 0 0 16px 0;" : "margin: 0 0 32px 0;"
    )}

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
    const {
        isHidden, className, variant, smallSpace, noSpace, centered,
        html, message, children,
    } = props;

    const content = message ? NLS.get(message) : html;

    if (isHidden || (!content && !children)) {
        return <React.Fragment />;
    }

    if (children) {
        return <Div
            className={className}
            smallSpace={smallSpace}
            noSpace={noSpace}
            centered={centered}
        >
            {children}
        </Div>;
    }

    return <Content
        variant={variant}
        className={className}
        smallSpace={smallSpace}
        noSpace={noSpace}
        centered={centered}
    >
        {content}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogMessage.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    variant    : PropTypes.string,
    smallSpace : PropTypes.bool,
    noSpace    : PropTypes.bool,
    centered   : PropTypes.bool,
    message    : PropTypes.string,
    html       : PropTypes.string,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogMessage.defaultProps = {
    isHidden   : false,
    className  : "",
    variant    : "div",
    smallSpace : false,
    noSpace    : false,
    centered   : false,
};

export default DialogMessage;
