import Store                from "../Core/Store";
import Auth                 from "../Core/Auth";
import Utils                from "../Utils/Utils";

// Module variables
let controller = null;



/**
 * Fetch wrapper
 * @throws {Object|String} The errors
 * @param {URL}      url
 * @param {Object=}  options
 * @param {Boolean=} showLoader
 * @param {Boolean=} showResult
 * @returns {Promise}
 */
async function ajax(url, options = {}, showLoader = true, showResult = true) {
    let response   = null;
    let result     = null;
    const defError = { "form" : "GENERAL_ERROR" };
    
    // To be able to Abort
    if (window.AbortController) {
        controller     = new window.AbortController();
        options.signal = controller.signal;
    }
    
    // Show the Loader
    if (showLoader) {
        Store.setLoading(true);
    }

    // Do the Request
    try {
        // @ts-ignore
        response = await fetch(url, options);
        if (showLoader) {
            Store.setLoading(false);
        }
    } catch (error) {
        if (showLoader) {
            Store.setLoading(false);
        }
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
        Auth.unsetToken();
        return {};
    }
    
    // Update the Token
    if (result.jwt) {
        Auth.setToken(result.jwt);
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
            Store.showResult("success", result.success);
        }
        result.data.success = result.success;
    } else if (result.warning) {
        if (showResult) {
            Store.showResult("warning", result.warning);
        }
        result.data.warning = result.warning;
    } else if (result.error) {
        if (showResult) {
            Store.showResult("error", result.error);
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
 * @param {Boolean=} addTimezone
 * @returns {URL}
 */
function createUrl(route, params = {}, addToken = true, addTimezone = false) {
    const url = baseUrl(route);
    
    for (const [ key, value ] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }
    if (addToken) {
        const token = Auth.getToken();
        if (token) {
            url.searchParams.append("jwt", token);
        }
    }
    if (addTimezone) {
        const timezone = Auth.getTimezone();
        if (timezone) {
            url.searchParams.append("timezone", timezone);
        }
    }
    return url;
}

/**
 * Does a Get
 * @param {String}   route
 * @param {Object=}  params
 * @param {Boolean=} showLoader
 * @param {Boolean=} showResult
 * @returns {Promise}
 */
async function get(route, params = {}, showLoader = true, showResult = true) {
    const url = createUrl(route, params, true, true);
    let result;

    try {
        result = await ajax(url, {}, showLoader, showResult);
    } catch(e) {
        result = { error : true };
    }
    return result;
}

/**
 * Does a Post
 * @param {String}   route
 * @param {Object=}  params
 * @param {Boolean=} showLoader
 * @param {Boolean=} showResult
 * @returns {Promise}
 */
function post(route, params = {}, showLoader = true, showResult = true) {
    const url      = baseUrl(route);
    const token    = Auth.getToken();
    const timezone = Auth.getTimezone();
    const body     = new FormData();

    for (const [ key, value ] of Object.entries(params)) {
        body.append(key, value);
    }
    if (token) {
        body.append("jwt", token);
    }
    if (timezone) {
        body.append("timezone", timezone);
    }
    return ajax(url, { method : "post", body }, showLoader, showResult);
}

/**
 * Returns the url
 * @param {String}   route
 * @param {Object=}  params
 * @param {Boolean=} addToken
 * @returns {String}
 */
function url(route, params = {}, addToken = true) {
    return createUrl(route, params, addToken, false).href;
}

/**
 * Returns the route
 * @param {String}  route
 * @param {Object=} params
 * @returns {String}
 */
function route(route, params = {}) {
    const url = new URL(process.env.REACT_APP_ROUTE);
    url.searchParams.append("route", route);
    for (const [ key, value ] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }
    return url.href;
}



// The public API
export default {
    get,
    post,
    url,
    route,
    abort,
};
