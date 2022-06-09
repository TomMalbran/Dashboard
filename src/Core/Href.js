import NLS                  from "../Core/NLS";

// Router
import {
    useLocation, useNavigate,
} from "react-router-dom";



/**
 * Returns the Current Path
 * @returns {String}
 */
function getPath() {
    const location = useLocation();
    return location.pathname;
}

/**
 * Returns the From Path
 * @returns {String}
 */
function getFrom() {
    const path = getPath();
    return path.split("/").slice(0, -2).join("/");
}

/**
 * Returns the Parent Path
 * @returns {String}
 */
function getParent() {
    const path   = getPath();
    const parent = path.split("/").slice(0, -1).join("/");
    return parent || "/";
}

/**
 * Creates a Link from the current path and the given Url
 * @param {String} url
 * @returns {String}
 */
function createLink(url) {
    const route = NLS.url(url);
    const path  = getPath();

    if (/[0-9]+$/.test(path)) {
        return `${path}/${route}`;
    }
    const parent = getParent();
    return `${parent}/${route}`;
}

/**
 * Returns true if the Url is Selected
 * @param {String} url
 * @returns {Boolean}
 */
function isSelected(url) {
    const path  = getPath();
    const route = NLS.url(url);
    return path.endsWith(route);
}



/**
 * Returns the Email Url
 * @param {String} email
 * @returns {String}
 */
function getEmail(email) {
    return `mailto:${email}`;
}

/**
 * Returns the Phone Url
 * @param {String} phone
 * @returns {String}
 */
function getPhone(phone) {
    return `tel:${phone}`;
}

/**
 * Returns the WhatsApp Url
 * @param {String} whatsapp
 * @returns {String}
 */
function getWhatsApp(whatsapp) {
    return `https://api.whatsapp.com/send?phone=${whatsapp}`;
}

/**
 * Returns the Url
 * @param {Object} data
 * @returns {String}
 */
function getUrl(data) {
    const { href, url, message, useBase, isLink, isEmail, isPhone, isWhatsApp } = data;
    let result = href;
    if (url) {
        result = useBase ? NLS.baseUrl(url) : NLS.url(url);
    } else if (isLink) {
        result = !message.startsWith("http") ? `http://${message}` : message;
    } else if (isEmail) {
        result = getEmail(href || message);
    } else if (isPhone) {
        result = getPhone(href || message);
    } else if (isWhatsApp) {
        result = getWhatsApp(href || message);
    }
    return result;
}



/**
 * Navigates to the Internal URL
 * @param {String} url
 * @returns {Boolean}
 */
function navigate(url) {
    if (!url || url === "#") {
        return false;
    }

    const navigate = useNavigate();
    if (url.startsWith(process.env.REACT_APP_URL)) {
        navigate(url.replace(process.env.REACT_APP_URL, "/"));
        return true;
    }
    if (!url.startsWith("http")) {
        navigate(url);
        return true;
    }
    return false;
}

/**
 * Handles the given URL
 * @param {String} url
 * @param {String} target
 * @returns {Boolean}
 */
function handleUrl(url, target) {
    if (!url || url === "#") {
        return false;
    }
    if (target !== "_blank" && navigate(url)) {
        return true;
    }
    if (target === "_self") {
        window.location.href = url;
        return true;
    }
    if (target === "_blank") {
        window.open(url);
        return true;
    }
    return false;
}

/**
 * Handles the Click
 * @param {Object} e
 * @param {Object} props
 * @returns {Void}
 */
function handleClick(e, props) {
    const { target, onClick, isPhone, isEmail, isWhatsApp } = props;
    const url = getUrl(props);

    if (onClick) {
        onClick(e);
    }
    if (isEmail || isPhone || isWhatsApp) {
        window.open(url);
    } else {
        handleUrl(url, target);
    }

    e.stopPropagation();
    e.preventDefault();
}

/**
 * Handles the Link
 * @param {Object} e
 * @param {Object} props
 * @returns {Void}
 */
function handleLink(e, props) {
    const { isDisabled, onClick, isPhone, isEmail, isWhatsApp, target, dontStop } = props;
    const url     = getUrl(props);
    let   handled = false;

    if (isDisabled) {
        handled = true;
    } else {
        if (onClick) {
            onClick(e);
            handled = true;
        }
        if (!isPhone && !isEmail && !isWhatsApp && target !== "_blank" && navigate(url)) {
            handled = true;
        }
    }
    if (handled && !dontStop) {
        e.stopPropagation();
        e.preventDefault();
    }
}



/**
 * Goes to the given URL
 * @param {...(String|Number)} args
 * @returns {Void}
 */
function goto(...args) {
    const url = NLS.baseUrl(...args);
    navigate(url);
}

/**
 * Goes to the given URL on a new tab
 * @param {...(String|Number)} args
 * @returns {Void}
 */
function gotoBlank(...args) {
    const url = NLS.baseUrl(...args);
    window.open(url);
}

/**
 * Reloads to the given URL reloading the tab
 * @param {...(String|Number)} args
 * @returns {Void}
 */
function reload(...args) {
    window.location.href = NLS.fullUrl(...args);
}

/**
 * Goes to the given external URL
 * @param {String}  url
 * @param {Boolean} isBlank
 * @returns {Void}
 */
function gotoUrl(url, isBlank) {
    if (isBlank) {
        window.open(url);
    } else {
        window.location.href = url;
    }
}



// The public API
export default {
    getPath,
    getFrom,
    getParent,
    createLink,
    isSelected,

    getUrl,
    getEmail,
    getPhone,
    getWhatsApp,

    navigate,
    handleUrl,
    handleClick,
    handleLink,

    goto,
    gotoBlank,
    reload,
    gotoUrl,
};
