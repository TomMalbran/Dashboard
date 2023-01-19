import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";



// Styles
const Li = Styled.li.attrs(({ topBorder, isLink }) => ({ topBorder, isLink }))`
    display: flex;
    align-items: center;
    padding: 8px;
    overflow: hidden;
    border-bottom: 1px solid var(--lighter-gray);
    transition: all 0.2s;
    ${(props) => props.topBorder ? "border-top: 16px solid var(--lighter-gray);" : ""};
    ${(props) => props.isLink ? "cursor: pointer;" : ""};

    &:hover {
        background-color: var(--light-gray);
    }
    .icon {
        padding: 0 8px 0 4px;
    }
`;



/**
 * The Detail Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DetailItem(props) {
    const {
        isHidden, className, message, icon, tooltip, prefix, withTip, showAlways, topBorder,
        href, url, onClick, isEmail, isPhone, isWhatsApp,
    } = props;

    const navigate = Navigate.useClick(props);

    // Handles the Click
    const handleClick = (e) => {
        if (!Utils.hasSelection()) {
            navigate(e);
        }
    };


    if (isHidden || (!message && !showAlways)) {
        return <React.Fragment />;
    }

    const isLink  = href || url || onClick || isEmail || isPhone || isWhatsApp;
    let   content = message ? NLS.get(String(message)) : "";
    const isHtml  = content.includes("\n") || content.includes("</b>") || content.includes("</span>");

    if (showAlways && !message) {
        content = String(message);
    }
    if (prefix) {
        content = `${NLS.get(prefix)}: ${content}`;
    } else if (withTip) {
        content = `${NLS.get(tooltip)}: ${content}`;
    }

    return <Li
        className={className}
        topBorder={topBorder}
        isLink={isLink}
        title={NLS.get(tooltip)}
        onClick={handleClick}
    >
        {!!icon && <Icon icon={icon} />}
        {isHtml ? <Html addBreaks>{content}</Html> : content}
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DetailItem.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    icon       : PropTypes.string,
    tooltip    : PropTypes.string,
    prefix     : PropTypes.string,
    href       : PropTypes.string,
    url        : PropTypes.string,
    target     : PropTypes.string,
    isEmail    : PropTypes.bool,
    isPhone    : PropTypes.bool,
    isWhatsApp : PropTypes.bool,
    onClick    : PropTypes.func,
    withTip    : PropTypes.bool,
    topBorder  : PropTypes.bool,
    showAlways : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
DetailItem.defaultProps = {
    isHidden   : false,
    className  : "",
    target     : "_self",
    isEmail    : false,
    isPhone    : false,
    isWhatsApp : false,
};

export default DetailItem;
