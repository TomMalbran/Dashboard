import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Href                 from "../../Utils/Href";

// Components
import Html                 from "../Common/Html";

// Variants
const Variant = {
    NONE      : "none",
    PRIMARY   : "primary",
    ACCENT    : "accent",
    BLACK     : "black",
    WHITE     : "white",
    GRAY      : "gray",
    RED       : "red",
    GREEN     : "green",
    IMAGE     : "image",
    OPACITY   : "opacity",
    UNDERLINE : "underline",
    OUTLINED  : "outlined",
};



// Styles
const Link = Styled.a.attrs(({ variant }) => ({ variant }))`
    position: relative;
    color: var(--link-color);
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover, &:focus {
        outline: none;
    }
`;

const ColoredLink = Styled(Link)`
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.2s ease-in-out;
        background-color: var(--link-color);
    }
    &:hover::before,
    &:focus::before {
        visibility: visible;
        transform: scaleX(1);
    }

    ${(props) => {
        switch (props.variant) {
        case Variant.PRIMARY: return `
            --link-color: var(--primary-color);
        `;
        case Variant.ACCENT: return `
            --link-color: var(--accent-color);
        `;
        case Variant.BLACK: return `
            --link-color: var(--black-color);
        `;
        case Variant.WHITE: return `
            --link-color: white;
            font-weight: 200;
        `;
        case Variant.GRAY: return `
            --link-color: var(--gray-color);
            font-weight: 400;
        `;
        case Variant.RED: return `
            --link-color: var(--red-color);
            font-weight: 600;
        `;
        case Variant.GREEN: return `
            --link-color: var(--green-color);
            font-weight: 600;
        `;
        default: return "";
        }
    }};
`;

const ImageLink = Styled(Link)`
    display: block;
    transition: all 0.2s ease-in-out;

    &:hover {
        filter: grayscale(1);
        color: #666;
    }
`;

const OpacityLink = Styled(Link)`
    display: block;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        opacity: 0.5;
    }
`;

const UnderlineLink = Styled(Link)`
    &:hover {
        text-decoration: underline;
    }
`;

// Components
const Components = {
    [Variant.NONE]      : Link,
    [Variant.PRIMARY]   : ColoredLink,
    [Variant.ACCENT]    : ColoredLink,
    [Variant.BLACK]     : ColoredLink,
    [Variant.WHITE]     : ColoredLink,
    [Variant.GRAY]      : ColoredLink,
    [Variant.RED]       : ColoredLink,
    [Variant.GREEN]     : ColoredLink,
    [Variant.IMAGE]     : ImageLink,
    [Variant.OPACITY]   : OpacityLink,
    [Variant.UNDERLINE] : UnderlineLink,
};



/**
 * The HyperLink Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function HyperLink(props) {
    const {
        passedRef, variant, className,
        target, message, html, children,
    } = props;

    const Component = Components[variant] || Link;
    const content   = children || NLS.get(message);
    
    return <Component
        ref={passedRef}
        className={`link ${className}`}
        variant={variant}
        href={Href.getUrl(props)}
        target={target}
        onClick={(e) => Href.handleClick(e, props)}
    >
        {html ? <Html className="link-content" variant="span">
            {html}
        </Html> : content}
    </Component>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
HyperLink.propTypes = {
    history   : PropTypes.object.isRequired,
    className : PropTypes.string,
    variant   : PropTypes.string,
    message   : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    html      : PropTypes.string,
    href      : PropTypes.string,
    url       : PropTypes.string,
    target    : PropTypes.string,
    tel       : PropTypes.bool,
    mail      : PropTypes.bool,
    whatsapp  : PropTypes.bool,
    onClick   : PropTypes.func,
    dontStop  : PropTypes.bool,
    passedRef : PropTypes.any,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
HyperLink.defaultProps = {
    className : "",
    variant   : Variant.PRIMARY,
    href      : "#",
    url       : "",
    target    : "_self",
    dontStop  : false,
};

export default withRouter(HyperLink);
