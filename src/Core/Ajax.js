import Auth                 from "../Core/Auth";
import Utils                from "../Utils/Utils";

// Module variables
let controller = null;
let setResult  = null;



/**
 * Initialize the Ajax
 * @param {Function} onResult
 * @returns {Void}
 */
function init(onResult) {
    setResult = onResult;
}



/**
 * Fetch wrapper
 * @throws {Object|String} The errors
 * @param {URL}              url
 * @param {Object=}          options
 * @param {Boolean=}         showResult
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
    if (result.jwt) {
        Auth.setToken(result.jwt);
    }
    if (result.refreshToken) {
        Auth.setRefreshToken(result.refreshToken);
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
 * @returns {Void}
 */
function abort() {
    if (controller) {
        controller.abort();
    }
}



/**
 * Returns the Base URL
 * @param {String} route
 * @returns {URL}
 */
function baseUrl(route) {
    return new URL(process.env.REACT_APP_API + route);
}

/**
 * Creates a new Url
 * @param {String}   route
 * @param {Object=}  params
 * @param {Boolean=} addToken
 * @param {Boolean=} addAuth
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
 * @param {Object=}  params
 * @param {Boolean=} addToken
 * @param {Boolean=} addAuth
 * @returns {Void}
 */
function addUrlParams(url, params = {}, addToken = true, addAuth = false) {
    for (const [ key, value ] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }

    if (addToken) {
        const token = Auth.getToken();
        if (token) {
            url.searchParams.append("jwt", token);
        }
        const refreshToken = Auth.getRefreshToken();
        if (refreshToken) {
            url.searchParams.append("refreshToken", refreshToken);
        }
    }

    if (addAuth) {
        const langcode = Auth.getLanguage();
        if (langcode) {
            url.searchParams.append("langcode", langcode);
        }
        const timezone = Auth.getTimezone();
        if (timezone) {
            url.searchParams.append("timezone", timezone);
        }
    }
}



/**
 * Does a Get
 * @param {String}           route
 * @param {Object=}          params
 * @param {Boolean=}         showResult
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
 * @param {String}           route
 * @param {Object=}          params
 * @param {Boolean=}         showResult
 * @param {AbortController=} abortController
 * @returns {Promise}
 */
function post(route, params = {}, showResult = true, abortController = null) {
    const url          = baseUrl(route);
    const token        = Auth.getToken();
    const refreshToken = Auth.getRefreshToken();
    const langcode     = Auth.getLanguage();
    const timezone     = Auth.getTimezone();
    const body         = new FormData();

    for (const [ key, value ] of Object.entries(params)) {
        body.append(key, value);
    }
    if (token) {
        body.append("jwt", token);
    }
    if (refreshToken) {
        body.append("refreshToken", refreshToken);
    }
    if (langcode) {
        body.append("langcode", langcode);
    }
    if (timezone) {
        body.append("timezone", timezone);
    }
    return ajax(url, { method : "post", body }, showResult, abortController);
}

/**
 * Returns the url
 * @param {String}   route
 * @param {Object=}  params
 * @param {Boolean=} addToken
 * @param {Boolean=} addAuth
 * @returns {String}
 */
function url(route, params = {}, addToken = true, addAuth = false) {
    return createUrl(route, params, addToken, addAuth).href;
}

/**
 * Returns the route
 * @param {String}   route
 * @param {Object=}  params
 * @param {Boolean=} addToken
 * @param {Boolean=} addAuth
 * @returns {String}
 */
function route(route, params = {}, addToken = true, addAuth = false) {
    const url = new URL(process.env.REACT_APP_ROUTE);
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
