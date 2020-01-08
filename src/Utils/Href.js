import NLS                  from "../Core/NLS";



/**
 * Returns the Url
 * @param {Object} data
 * @returns {String}
 */
function getUrl(data) {
    const { href, url, message, tel, mail, whatsapp } = data;
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
function handle(url, target, history) {
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




// The public API
export default {
    getUrl,
    isInternal,
    getInternal,
    handleInternal,
    handle,
};
