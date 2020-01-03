import React                from "react";
import PropTypes            from "prop-types";



/**
 * Linkifies the Content
 * @param {String} content
 * @returns {String}
 */
function linkifyContent(content) {
    // http://, https://, ftp://
    const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim;
    // www. sans http:// or https://
    const pseudoUrlPattern = /(^|[^/])(www\.[\S]+(\b|$))/gim;
    // Email addresses
    const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return content
        .replace(urlPattern, '<a href="$&">$&</a>')
        .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
        .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
}



/**
 * The Html Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Html(props) {
    const { variant, linkify, className, children } = props;
    const __html = linkify ? linkifyContent(String(children)) : String(children);

    switch (variant) {
    case "h3":
        return <h3
            className={className}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case "p":
        return <p
            className={className}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case "span":
        return <span
            className={className}
            dangerouslySetInnerHTML={{ __html }}
        />;
    default:
        return <div
            className={className}
            dangerouslySetInnerHTML={{ __html }}
        />;
    }
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Html.propTypes = {
    variant   : PropTypes.string,
    className : PropTypes.string,
    children  : PropTypes.string,
    linkify   : PropTypes.bool,
};

export default Html;
