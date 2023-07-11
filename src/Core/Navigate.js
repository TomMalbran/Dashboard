import NLS                  from "../Core/NLS";

// Utils
import Utils                from "../Utils/Utils";

// Router
import {
    useLocation,
    useParams as useRouterParams,
    useNavigate as useRouteNavigate,
} from "react-router-dom";

// All the params
const paramTypes = {};



/**
 * Initializes the Params
 * @param {Object} params
 * @returns {Void}
 */
function init(params) {
    for (const [ key, value ] of Object.entries(params)) {
        paramTypes[key] = value;
    }
}



/**
 * Returns all the params
 * @returns {Object}
 */
function useParams() {
    const params = useRouterParams();
    const result = {};
    for (const key of Object.values(paramTypes)) {
        if (!params[key]) {
            result[key] = key.endsWith("ID") ? 0 : "";
        } else if (Utils.isNumeric(params[key])) {
            result[key] = Number(params[key] || 0);
        } else {
            result[key] = params[key];
        }
    }
    return result;
}

/**
 * Returns a single param
 * @param {String} type
 * @returns {Number}
 */
function useOneParam(type) {
    const params = useParams();
    if (paramTypes[type]) {
        return params[paramTypes[type]] || 0;
    }
    return 0;
}

/**
 * Unsets the Params
 * @param {Object} params
 * @returns {Object}
 */
function unsetParams(params) {
    for (const key of Object.values(paramTypes)) {
        params[key] = 0;
    }
    return params;
}

/**
 * Returns the Child Path
 * @returns {Object}
 */
function useChildPath() {
    const params = useRouterParams();
    return params["*"] || "";
}



/**
 * Returns the Current Path
 * @returns {String}
 */
function usePath() {
    const location = useLocation();
    return location.pathname;
}

/**
 * Returns the URL Search Params
 * @returns {URLSearchParams}
 */
function useSearchParams() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

/**
 * Returns the Parent Path
 * @param {Number=} levels
 * @returns {String}
 */
function useParent(levels = 1) {
    const path = usePath();
    return path.split("/").slice(0, -1 * levels).join("/");
}

/**
 * Returns the From Path
 * @returns {String}
 */
function useFrom() {
    const path       = usePath();
    const childPath  = useChildPath();
    const basePath   = path.replace(childPath, "");
    const parentPath = basePath.split("/").slice(0, -2).join("/");
    return parentPath;
}

/**
 * Creates a Link from the current path and the given Url
 * @param {String} url
 * @returns {String}
 */
function useMenuUrl(url) {
    const route     = NLS.url(url);
    const path      = usePath();
    const parent    = useParent(1);
    const childPath = useChildPath();

    if (childPath) {
        return path.replace(childPath, route);
    }
    return `${parent}/${route}`;
}

/**
 * Returns true if the Url is Selected
 * @returns {Function}
 */
function useSelect() {
    const path      = usePath();
    const childPath = useChildPath();

    return (url, startsWith) => {
        const route = NLS.url(url);
        if (startsWith) {
            return path.startsWith(`/${route}`);
        }
        return childPath.startsWith(route);
    };
}



/**
 * Returns true if the Url is equal to the Test one
 * @param {String} urlKey
 * @param {String} testUrl
 * @returns {Boolean}
 */
function isUrl(urlKey, testUrl) {
    return NLS.url(urlKey) === testUrl;
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
 * Navigates to the Internal URL
 * @returns {Function}
 */
function useNavigate() {
    const navigate = useRouteNavigate();

    return (url) => {
        if (!url || url === "#") {
            return false;
        }

        if (url.startsWith(process.env.REACT_APP_URL)) {
            navigate(url.replace(process.env.REACT_APP_URL, "/"));
            return true;
        }
        if (!url.startsWith("http")) {
            navigate(url);
            return true;
        }
        return false;
    };
}

/**
 * Goes to the given URL
 * @returns {Function}
 */
function useGoto() {
    const navigate = useNavigate();

    return (...args) => {
        const url = NLS.baseUrl(...args);
        navigate(url);
    };
}

/**
 * Handles the given URL
 * @param {String} url
 * @param {String} target
 * @returns {Function}
 */
function useUrl(url, target) {
    const navigate = useNavigate();

    return () => {
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
    };
}

/**
 * Handles the Click
 * @param {Object} props
 * @returns {React.MouseEventHandler}
 */
function useClick(props) {
    const { target, onClick, isPhone, isEmail, isWhatsApp, propagate } = props;
    const url      = getUrl(props);
    const navigate = useUrl(url, target);

    return (e) => {
        if (onClick) {
            onClick(e);
        }
        if (isEmail || isPhone || isWhatsApp) {
            window.open(url);
        } else {
            navigate();
        }
        if (!propagate) {
            e.stopPropagation();
        }
        e.preventDefault();
    };
}

/**
 * Handles the Link
 * @param {Object} props
 * @returns {React.MouseEventHandler}
 */
function useLink(props) {
    const { isDisabled, onClick, isPhone, isEmail, isWhatsApp, target, dontStop } = props;
    const navigate = useNavigate();
    const url      = getUrl(props);

    return (e) => {
        let handled = false;
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
    };
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

/**
 * Reloads to the given URL reloading the tab
 * @param {...(String|Number)} args
 * @returns {Void}
 */
function reload(...args) {
    window.location.href = NLS.fullUrl(...args);
}




// The public API
export default {
    init,

    useParams,
    useOneParam,
    unsetParams,

    usePath,
    useSearchParams,
    useFrom,
    useParent,
    useMenuUrl,
    useSelect,

    isUrl,
    getUrl,
    getEmail,
    getPhone,
    getWhatsApp,

    useGoto,
    useUrl,
    useClick,
    useLink,

    gotoBlank,
    gotoUrl,
    reload,
};
