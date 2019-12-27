import React from 'react';
import PropTypes from 'prop-types';

/**
 * Linkifies the Content
 * @param {String} content
 * @returns {String}
 */
function linkifyContent(content) {
    // http://, https://, ftp://
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim;
    // www. sans http:// or https://
    var pseudoUrlPattern = /(^|[^/])(www\.[\S]+(\b|$))/gim;
    // Email addresses
    var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return content.replace(urlPattern, '<a href="$&">$&</a>').replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>').replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
}

/**
 * The Html
 * @param {Object} props
 * @returns {Object}
 */
function Html(props) {
    var variant = props.variant,
        linkify = props.linkify,
        className = props.className,
        children = props.children;

    var __html = linkify ? linkifyContent(String(children)) : String(children);

    switch (variant) {
        case "h3":
            return React.createElement("h3", {
                className: className,
                dangerouslySetInnerHTML: { __html: __html }
            });
        case "p":
            return React.createElement("p", {
                className: className,
                dangerouslySetInnerHTML: { __html: __html }
            });
        case "span":
            return React.createElement("span", {
                className: className,
                dangerouslySetInnerHTML: { __html: __html }
            });
        default:
            return React.createElement("div", {
                className: className,
                dangerouslySetInnerHTML: { __html: __html }
            });
    }
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Html.propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.string,
    linkify: PropTypes.bool
};

export default Html;
