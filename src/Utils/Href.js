import NLS                  from "../Core/NLS";



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
 * Returns true if the given URL is Internal
 * @param {String} url
 * @returns {Boolean}
 */
function isInternal(url) {
    return url.startsWith(process.env.REACT_APP_URL);
}

/**
 * Returns the URL without the complete path
 * @param {String} url
 * @returns {String}
 */
function getInternal(url) {
    return url.replace(process.env.REACT_APP_URL, "");
}

/**
 * Handles an Internal URL
 * @param {String} url
 * @param {Object} history
 * @returns {Boolean}
 */
function handleInternal(url, history) {
    if (!url || url === "#") {
        return false;
    }
    if (isInternal(url)) {
        history.push(getInternal(url));
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
 * @param {Object} history
 * @returns {Boolean}
 */
function handleUrl(url, target, history) {
    if (!url || url === "#") {
        return false;
    }
    if (handleInternal(url, history)) {
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
    const { isDisabled, onClick, isPhone, isEmail, isWhatsapp, dontStop, history } = props;
    const url     = getUrl(props);
    let   handled = false;

    if (isDisabled) {
        handled = true;
    } else {
        if (onClick) {
            onClick(e);
            handled = true;
        }
        if (!isPhone && !isEmail && !isWhatsapp && handleInternal(url, history)) {
            handled = true;
        }
    }
    if (handled && !dontStop) {
        e.stopPropagation();
        e.preventDefault();
    }
}



// The public API
export default {
    getUrl,
    isInternal,
    getInternal,
    handleInternal,
    handleUrl,
    handleClick,
};
