import React                from "react";
import PropTypes            from "prop-types";

// Variants
const Variant = {
    H2   : "h2",
    H3   : "h3",
    H4   : "h4",
    P    : "p",
    SPAN : "span",
    DIV  : "div",
};



// http://, https://, ftp://
const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim;
// www. sans http:// or https://
const pseudoUrlPattern = /(^|[^/])(www\.[\S]+(\b|$))/gim;
// Email addresses
const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

/**
 * The Html Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Html(props) {
    const { isHidden, variant, linkify, addBreaks, className, onClick, content, children } = props;
    let __html = String(content || children);

    if (isHidden || !__html) {
        return <React.Fragment />;
    }

    if (linkify) {
        __html = __html
            .replace(urlPattern, '<a href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    }
    if (addBreaks) {
        __html = __html.replace(/\n/g, "<br />");
    }

    switch (variant) {
    case Variant.H2:
        return <h2
            className={className}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.H3:
        return <h3
            className={className}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.H4:
        return <h4
            className={className}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.P:
        return <p
            className={className}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.SPAN:
        return <span
            className={className}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html }}
        />;
    default:
        return <div
            className={className}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html }}
        />;
    }
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Html.propTypes = {
    isHidden  : PropTypes.bool,
    variant   : PropTypes.string,
    className : PropTypes.string,
    onClick   : PropTypes.func,
    content   : PropTypes.string,
    children  : PropTypes.string,
    linkify   : PropTypes.bool,
    addBreaks : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Html.defaultProps = {
    isHidden  : false,
    variant   : Variant.DIV,
    className : "",
    linkify   : false,
    addBreaks : false,
};

export default Html;
