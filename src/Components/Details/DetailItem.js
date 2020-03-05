import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Href                 from "../../Core/Href";
import Utils                from "../../Utils/Utils";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Li = Styled.li.attrs(({ topBorder }) => ({ topBorder }))`
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid var(--lighter-gray);
    transition: all 0.2s;
    ${(props) => props.topBorder ? "border-top: 16px solid var(--lighter-gray)" : ""};

    &:hover {
        background-color: var(--light-gray);
    }
    .icon {
        padding: 0 8px 0 4px;
    }
`;



/**
 * Handles the Click
 * @param {React.MouseEvent} e
 * @param {Object} props
 * @returns {Void}
 */
function handleClick(e, props) {
    e.preventDefault();
    if (Utils.hasSelection()) {
        return;
    }

    const { href, url, target, onClick, isLink, isEmail, isPhone, message } = props;
    let uri     = url ? NLS.url(url) : href;
    let handled = false;
    
    if (onClick) {
        onClick(e);
        handled = true;
    }
    if (Href.handleUrl(uri, target)) {
        handled = true;
    }

    if (!handled) {
        if (isLink) {
            uri = !message.startsWith("http") ? `http://${message}` : message;
        } else if (isEmail) {
            uri = `mailto: ${message}`;
        } else if (isPhone) {
            uri = `tel: ${message}`;
        }
        if (uri) {
            window.open(uri);
        }
    }
}



/**
 * The Detail Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DetailItem(props) {
    const { className, isHidden, message, icon, tooltip, prefix, withTip, showAlways, topBorder } = props;
    
    if (isHidden || (!message && !showAlways)) {
        return <React.Fragment />;
    }
    
    let content = message;
    if (prefix) {
        content = `${NLS.get(prefix)}: ${message}`;
    } else if (withTip) {
        content = `${NLS.get(tooltip)}: ${message}`;
    }

    return <Li
        className={className}
        topBorder={topBorder}
        title={NLS.get(tooltip)}
        onClick={(e) => handleClick(e, props)}
    >
        <Icon icon={icon} />
        {content}
    </Li>;
}
    
/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DetailItem.propTypes = {
    className  : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    icon       : PropTypes.string.isRequired,
    tooltip    : PropTypes.string,
    prefix     : PropTypes.string,
    href       : PropTypes.string,
    url        : PropTypes.string,
    target     : PropTypes.string,
    onClick    : PropTypes.func,
    withTip    : PropTypes.bool,
    topBorder  : PropTypes.bool,
    showAlways : PropTypes.bool,
    isLink     : PropTypes.bool,
    isEmail    : PropTypes.bool,
    isPhone    : PropTypes.bool,
    isHidden   : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
DetailItem.defaultProps = {
    className : "",
    target    : "_self",
    isHidden  : false,
};

export default DetailItem;
