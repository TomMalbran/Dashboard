import NLS                  from "../Core/NLS";

// Module variables
let history = null;



/**
 * Initialize the Href
 * @param {Object} theHistory
 * @returns {Void}
 */
function init(theHistory) {
    history = theHistory;
}



/**
 * Returns the Url
 * @param {Object} data
 * @returns {String}
 */
function getUrl(data) {
    const { href, url, message, isLink, isPhone, isEmail, isWhatsapp } = data;
    let result = href;
    if (url) {
        result = NLS.url(url);
    } else if (isLink) {
        result = !message.startsWith("http") ? `http://${message}` : message;
    } else if (isPhone) {
        result = `tel:${href || message}`;
    } else if (isEmail) {
        result = `mailto:${href || message}`;
    } else if (isWhatsapp) {
        result = `https://api.whatsapp.com/send?phone=549${href || message}`;
    }
    return result;
}

/**
 * Handles an Internal URL
 * @param {String} url
 * @returns {Boolean}
 */
function handleInternal(url) {
    if (!url || url === "#") {
        return false;
    }
    if (url.startsWith(process.env.REACT_APP_URL)) {
        history.push(url.replace(process.env.REACT_APP_URL, "/"));
        return true;
    }
    if (!url.startsWith("http")) {
        history.push(url);
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
    if (handleInternal(url)) {
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
    const { isDisabled, onClick, isPhone, isEmail, isWhatsapp, dontStop } = props;
    const url     = getUrl(props);
    let   handled = false;

    if (isDisabled) {
        handled = true;
    } else {
        if (onClick) {
            onClick(e);
            handled = true;
        }
        if (!isPhone && !isEmail && !isWhatsapp && handleInternal(url)) {
            handled = true;
        }
    }
    if (handled && !dontStop) {
        e.stopPropagation();
        e.preventDefault();
    }
}

/**
 * Goes to the given internal URL
 * @param {...(String|Number)} args
 * @returns {Void}
 */
function goto(...args) {
    const url = NLS.baseUrl(...args);
    handleInternal(url);
}



// The public API
export default {
    init,
    getUrl,
    handleInternal,
    handleUrl,
    handleClick,
    goto,
};
