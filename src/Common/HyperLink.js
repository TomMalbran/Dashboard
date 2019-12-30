import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import NLS                  from "Core/NLS";
import ClassList            from "Utils/ClassList";
import Href                 from "Utils/Href";

// Components
import Icon                 from "./Icon";
import Html                 from "./Html";

// Styles
import "Styles/HyperLink.css";



/**
 * Handles the Click
 * @param {Object}           props
 * @param {React.MouseEvent} e
 * @returns {Void}
 */
function handleClick(props, e) {
    const { isDisabled, onClick, href, url, tel, mail, whatsapp, dontStop, history } = props;
    const uri     = url ? NLS.url(url) : href;
    let   handled = false;

    if (isDisabled) {
        handled = true;
    } else {
        if (onClick) {
            onClick(e);
            handled = true;
        }
        if (!tel && !mail && !whatsapp && Href.handleInternal(uri, history)) {
            handled = true;
        }
    }
    if (handled && !dontStop) {
        e.stopPropagation();
        e.preventDefault();
    }
}

/**
 * Returns the Url
 * @param {Object} props
 * @returns {String}
 */
function getUrl(props) {
    const { href, url, message, tel, mail, whatsapp } = props;
    let result = href;
    if (url) {
        result = NLS.url(url);
    } else if (tel) {
        result = `tel:${href || message}`;
    } else if (mail) {
        result = `mailto:${href || message}`;
    } else if (whatsapp) {
        result = `https://api.whatsapp.com/send?phone=549${href || message}`;
    }
    return result;
}

/**
 * Returns the ClassName
 * @param {Object}  props
 * @param {String}  url
 * @param {Boolean} hasContent
 * @returns {String}
 */
function getClassName(props, url, hasContent) {
    const { variant, icon, path, isDisabled, className } = props;
    const result  = new ClassList("link", `link-${variant}`);
    const colored = [ "primary", "accent", "black", "white", "gray", "red", "green" ];

    result.addIf("link-colored",  colored.includes(variant));
    result.addIf("link-with",     icon && variant !== "icon" && hasContent);
    result.addIf("link-selected", path && url === path);
    result.addIf("link-disabled", isDisabled);
    result.add(className);

    return result.get();
}



/**
 * The HyperLink Component
 * @param {Object} props
 * @returns {Object}
 */
function HyperLink(props) {
    const {
        passedRef, target, message, html, children, icon, afterIcon, badge,
        onMouseEnter, onMouseLeave,
    } = props;

    const content    = children || NLS.get(message);
    const hasContent = Boolean(content && !html);
    const url        = getUrl(props);
    const className  = getClassName(props, url, hasContent);
    
    return <a
        ref={passedRef}
        className={className}
        href={url}
        target={target}
        onClick={(e) => handleClick(props, e)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {!!icon      && <Icon className="link-preicon" variant={icon} />}
        {!!html      && <Html className="link-content" variant="span">{html}</Html>}
        {hasContent  && <span className="link-content">{content}</span>}
        {!!afterIcon && <Icon className="link-aftericon" variant={afterIcon} />}
        {badge > 0   && <span className="badge">{badge}</span>}
    </a>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
HyperLink.propTypes = {
    history      : PropTypes.object.isRequired,
    message      : PropTypes.string,
    html         : PropTypes.string,
    variant      : PropTypes.string,
    href         : PropTypes.string,
    url          : PropTypes.string,
    target       : PropTypes.string,
    tel          : PropTypes.bool,
    mail         : PropTypes.bool,
    whatsapp     : PropTypes.bool,
    icon         : PropTypes.string,
    afterIcon    : PropTypes.string,
    badge        : PropTypes.number,
    path         : PropTypes.string,
    className    : PropTypes.string,
    onClick      : PropTypes.func,
    onMouseEnter : PropTypes.func,
    onMouseLeave : PropTypes.func,
    isDisabled   : PropTypes.bool,
    dontStop     : PropTypes.bool,
    passedRef    : PropTypes.any,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
HyperLink.defaultProps = {
    variant    : "primary",
    href       : "#",
    url        : "",
    target     : "_self",
    badge      : 0,
    path       : "",
    className  : "",
    isDisabled : false,
    dontStop   : false,
};

export default withRouter(HyperLink);
