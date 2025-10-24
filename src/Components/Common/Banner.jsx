import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Outcome }          from "../../Core/Variants";
import NLS                  from "../../Core/NLS";

// Dashboard
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";



// Styles
const Container = Styled.div.attrs(({ variant, topSpace, bottomSpace }) => ({ variant, topSpace, bottomSpace }))`
    position: relative;
    gap: 8px;
    padding: 12px 16px;
    line-height: 1.4;
    border: 1px solid;
    border-radius: var(--border-radius);

    ${(props) => props.variant === Outcome.SUCCESS && `
        background-color: hsl(170, 61%, 96%);
        border-color: var(--success-color);
        .icon {
            color: var(--success-color);
        }
    `}
    ${(props) => props.variant === Outcome.WARNING && `
        background-color: hsl(43, 100%, 96%);
        border-color: var(--warning-color);
        .icon {
            color: var(--warning-color);
        }
    `}
    ${(props) => props.variant === Outcome.ERROR && `
        background-color: hsl(0, 62%, 97%);
        border-color: var(--error-color);
        .icon {
            color: var(--error-color);
        }
    `}

    ${(props) => props.topSpace && `margin-top: ${props.topSpace}px;`}
    ${(props) => props.bottomSpace && `margin-bottom: ${props.bottomSpace}px;`}
`;

const Content = Styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Children = Styled.div`
    padding: 12px 0 0 28px;
    :empty {
        display: none;
    }
`;



/**
 * The Banner
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Banner(props) {
    const {
        isHidden, className, variant, message,
        topSpace, bottomSpace, children,
    } = props;


    // The Icon
    const icon = React.useMemo(() => {
        switch (variant) {
        case Outcome.SUCCESS:
            return "check-circle";
        case Outcome.WARNING:
            return "warning";
        case Outcome.ERROR:
            return "error";
        default:
            return "";
        }
    }, [ variant ]);


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container
        className={className}
        variant={variant}
        topSpace={topSpace}
        bottomSpace={bottomSpace}
    >
        <Content>
            <Icon icon={icon} size="20" />
            <Html>{NLS.get(message)}</Html>
        </Content>
        <Children>
            {children}
        </Children>
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Banner.propTypes = {
    isHidden    : PropTypes.bool,
    className   : PropTypes.string,
    variant     : PropTypes.string.isRequired,
    message     : PropTypes.string.isRequired,
    topSpace    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    bottomSpace : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Banner.defaultProps = {
    isHidden  : false,
    className : "",
};

export default Banner;
