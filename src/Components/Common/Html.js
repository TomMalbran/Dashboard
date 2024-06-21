import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";

// Variants
const Variant = {
    H2   : "h2",
    H3   : "h3",
    H4   : "h4",
    P    : "p",
    LI   : "li",
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
    const {
        isHidden, className, variant,
        addLinks, addBreaks, formatText,
        onClick, onMouseDown,
        message, content, children,
    } = props;

    let __html = String(NLS.get(message) || content || children);

    // Nothing to Render
    if (isHidden || !__html) {
        return <React.Fragment />;
    }


    // Parse the Content
    if (addLinks) {
        __html = __html
            .replace(urlPattern, '<a href="$&" target="_blank">$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2" target="_blank">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&" target="_blank">$&</a>');
    }
    if (addBreaks) {
        __html = __html.replace(/\n/g, "<br />");
    }
    if (formatText) {
        __html = __html
            .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
            .replace(/__([^_]+)__/g, "<i>$1</i>")
            .replace(/~~([^~]+)~~/g, "<s>$1</s>")
            .replace(/```([^`]+)```/g, "<code>$1</code>");
    }


    // Do the Render
    switch (variant) {
    case Variant.H2:
        return <h2
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.H3:
        return <h3
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.H4:
        return <h4
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.P:
        return <p
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.LI:
        return <li
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={{ __html }}
        />;
    case Variant.SPAN:
        return <span
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={{ __html }}
        />;
    default:
        return <div
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={{ __html }}
        />;
    }
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Html.propTypes = {
    isHidden    : PropTypes.bool,
    variant     : PropTypes.string,
    className   : PropTypes.string,
    onClick     : PropTypes.func,
    onMouseDown : PropTypes.func,
    message     : PropTypes.string,
    content     : PropTypes.string,
    children    : PropTypes.string,
    addLinks    : PropTypes.bool,
    addBreaks   : PropTypes.bool,
    formatText  : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Html.defaultProps = {
    isHidden   : false,
    className  : "",
    variant    : Variant.DIV,
    addLinks   : false,
    addBreaks  : false,
    formatText : false,
};

export default Html;
