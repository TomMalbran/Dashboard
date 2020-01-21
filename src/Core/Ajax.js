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
 * @returns {Promise}
 */
async function ajax(url, options = {}, showLoader = true) {
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
        Store.showResult("success", result.success);
        result.data.success = result.success;
    } else if (result.warning) {
        Store.showResult("warning", result.warning);
        result.data.warning = result.warning;
    } else if (result.error) {
        Store.showResult("error", result.error);
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
 * Creates a new Url
 * @param {String}   path
 * @param {Object=}  params
 * @param {Boolean=} addToken
 * @returns {URL}
 */
function createUrl(path, params = {}, addToken = true) {
    const url   = new URL(process.env.REACT_APP_API + path);
    const token = Auth.getToken();

    for (const [ key, value ] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }
    if (addToken && token) {
        url.searchParams.append("jwt", token);
    }
    return url;
}

/**
 * Does a Get
 * @param {String}   path
 * @param {Object=}  params
 * @param {Boolean=} showLoader
 * @returns {Promise}
 */
async function get(path, params = {}, showLoader = true) {
    const url = createUrl(path, params);
    let result;

    try {
        result = await ajax(url, {}, showLoader);
    } catch(e) {
        result = { error : true };
    }
    return result;
}

/**
 * Does a Post
 * @param {String}   path
 * @param {Object=}  params
 * @param {Boolean=} showLoader
 * @returns {Promise}
 */
function post(path, params = {}, showLoader = true) {
    const url  = createUrl(path);
    const body = new FormData();
    for (const [ key, value ] of Object.entries(params)) {
        body.append(key, value);
    }
    return ajax(url, { method : "post", body }, showLoader);
}

/**
 * Returns the url
 * @param {String}   path
 * @param {Object=}  params
 * @param {Boolean=} addToken
 * @returns {String}
 */
function url(path, params = {}, addToken = true) {
    return createUrl(path, params, addToken).href;
}



// The public API
export default {
    get,
    post,
    url,
    abort,
};
