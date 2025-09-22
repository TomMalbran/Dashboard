import Auth                 from "../Core/Auth";
import Utils                from "../Utils/Utils";

// Module variables
let controller = null;
let setResult  = null;
let apiUrl     = "";
let routeUrl   = "";



/**
 * Initialize the Ajax
 * @param {string}   newApiUrl
 * @param {string}   newRouteUrl
 * @param {Function} onResult
 * @returns {void}
 */
function init(newApiUrl, newRouteUrl, onResult) {
    apiUrl    = newApiUrl;
    routeUrl  = newRouteUrl;
    setResult = onResult;
}



/**
 * Fetch wrapper
 * @throws {object|string} The errors
 * @param {URL}              url
 * @param {object=}          options
 * @param {boolean=}         showResult
 * @param {AbortController=} abortController
 * @returns {Promise}
 */
async function ajax(url, options = {}, showResult = true, abortController = null) {
    let response   = null;
    let result     = null;
    const defError = { "form" : "GENERAL_ERROR" };

    // To be able to Abort
    if (abortController) {
        options.signal = abortController.signal;
    } else if (window.AbortController) {
        controller     = new window.AbortController();
        options.signal = controller.signal;
    }


    // Do the Request
    try {
        // @ts-ignore
        response = await fetch(url, options);
    } catch (error) {
        throw defError;
    }

    // Bad Response
    if (!response.ok) {
        throw defError;
    }

    // Get the JSON Result
    try {
        result = await response.json();
    } catch (error) {
        throw defError;
    }
    if (!result) {
        result = {};
    }

    // The session ended
    if (result.userLoggedOut) {
        Auth.unsetAll();
        return { error : true };
    }

    // Update the Tokens
    if (result.xAccessToken) {
        Auth.setAccessToken(result.xAccessToken);
    }
    if (result.xRefreshToken) {
        Auth.setRefreshToken(result.xRefreshToken);
    }

    // There was an error
    if (result.errors && !Utils.isEmpty(result.errors)) {
        throw result.errors;
    }

    // Show the Result
    if (!result.data) {
        result.data = {};
    }
    if (result.success) {
        if (showResult) {
            setResult("success", result.success, result.param);
        }
        result.data.success = result.success;
    } else if (result.warning) {
        if (showResult) {
            setResult("warning", result.warning, result.param);
        }
        result.data.warning = result.warning;
    } else if (result.error) {
        if (showResult) {
            setResult("error", result.error, result.param);
        }
        result.data.error = result.error;
    }

    // Return just the data
    return result.data;
}

/**
 * Aborts a Fetch
 * @returns {void}
 */
function abort() {
    if (controller) {
        controller.abort();
    }
}



/**
 * Returns the Base URL
 * @param {string} route
 * @returns {URL}
 */
function baseUrl(route) {
    return new URL(apiUrl + route);
}

/**
 * Creates a new Url
 * @param {string}   route
 * @param {object=}  params
 * @param {boolean=} addToken
 * @param {boolean=} addAuth
 * @returns {URL}
 */
function createUrl(route, params = {}, addToken = true, addAuth = false) {
    const url = baseUrl(route);
    addUrlParams(url, params, addToken, addAuth);
    return url;
}

/**
 * Adds the params to the Url
 * @param {URL}      url
 * @param {object=}  params
 * @param {boolean=} addToken
 * @param {boolean=} addAuth
 * @returns {void}
 */
function addUrlParams(url, params = {}, addToken = true, addAuth = false) {
    for (const [ key, value ] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }

    if (addToken) {
        const accessToken = Auth.getAccessToken();
        if (accessToken) {
            url.searchParams.append("xAccessToken", accessToken);
        }
        const refreshToken = Auth.getRefreshToken();
        if (refreshToken) {
            url.searchParams.append("xRefreshToken", refreshToken);
        }
    }

    if (addAuth) {
        const langcode = Auth.getLanguage();
        if (langcode) {
            url.searchParams.append("xLangcode", langcode);
        }
        const timezone = Auth.getTimezone();
        if (timezone) {
            url.searchParams.append("xTimezone", timezone);
        }
    }
}



/**
 * Does a Get
 * @param {string}           route
 * @param {object=}          params
 * @param {boolean=}         showResult
 * @param {AbortController=} abortController
 * @returns {Promise}
 */
async function get(route, params = {}, showResult = true, abortController = null) {
    const url = createUrl(route, params, true, true);
    let result;

    try {
        result = await ajax(url, {}, showResult, abortController);
    } catch(e) {
        result = { error : true };
    }
    return result;
}

/**
 * Does a Post
 * @param {string}           route
 * @param {object=}          params
 * @param {boolean=}         showResult
 * @param {AbortController=} abortController
 * @returns {Promise}
 */
function post(route, params = {}, showResult = true, abortController = null) {
    const url          = baseUrl(route);
    const accessToken  = Auth.getAccessToken();
    const refreshToken = Auth.getRefreshToken();
    const langcode     = Auth.getLanguage();
    const timezone     = Auth.getTimezone();
    const body         = new FormData();

    for (const [ key, value ] of Object.entries(params)) {
        body.append(key, value);
    }
    if (accessToken) {
        body.append("xAccessToken", accessToken);
    }
    if (refreshToken) {
        body.append("xRefreshToken", refreshToken);
    }
    if (langcode) {
        body.append("xLangcode", langcode);
    }
    if (timezone) {
        body.append("xTimezone", timezone);
    }
    return ajax(url, { method : "post", body }, showResult, abortController);
}

/**
 * Returns the url
 * @param {string}   route
 * @param {object=}  params
 * @param {boolean=} addToken
 * @param {boolean=} addAuth
 * @returns {string}
 */
function url(route, params = {}, addToken = true, addAuth = false) {
    return createUrl(route, params, addToken, addAuth).href;
}

/**
 * Returns the route
 * @param {string}   route
 * @param {object=}  params
 * @param {boolean=} addToken
 * @param {boolean=} addAuth
 * @returns {string}
 */
function route(route, params = {}, addToken = true, addAuth = false) {
    const url = new URL(routeUrl);
    url.searchParams.append("route", route);
    addUrlParams(url, params, addToken, addAuth);
    return url.href;
}




// The public API
export default {
    init,
    get,
    post,
    url,
    route,
    abort,
};
