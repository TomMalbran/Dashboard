import jwtDecode            from "jwt-decode";
import NLS                  from "../Core/NLS";

// Module Variables
let token          = "";
let timezone       = null;
let timeout        = null;
let setCurrentUser = null;



/**
 * Initialize the API
 * @param {Function} onUserChange
 * @returns {Void}
 */
function init(onUserChange) {
    setCurrentUser = onUserChange;
    if (localStorage.token) {
        token = localStorage.token;
        setUser();
    }
}



/**
 * Returns the Token
 * @returns {String}
 */
function getToken() {
    return token;
}

/**
 * Sets the JWT Token
 * @param {String} jwt
 * @returns {Void}
 */
function setToken(jwt) {
    if (token !== jwt) {
        token    = jwt;
        timezone = null;
        localStorage.setItem("token", token);
        setUser();
    }
}

/**
 * Unsets the Token
 * @returns {Void}
 */
function unsetToken() {
    token    = null;
    timezone = null;

    localStorage.removeItem("token");
    setCurrentUser({});
}



/**
 * Returns the User
 * @returns {?Object}
 */
function getUser() {
    if (token) {
        const jwt = jwtDecode(token);
        return jwt.data;
    }
    return null;
}

/**
 * Sets the User
 * @returns {Boolean}
 */
function setUser() {
    try {
        const jwt  = jwtDecode(token);
        const time = Math.floor(Date.now() / 1000);
        if (jwt.exp < time) {
            unsetToken();
            return false;
        }

        setCurrentUser(jwt.data);
        if (jwt.data.language) {
            NLS.setLang(jwt.data.language);
        }

        if (timeout) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(unsetToken, (jwt.exp - time) * 1000);
        return true;

    } catch (e) {
        unsetToken();
        return false;
    }
}

/**
 * Returns the Timezone
 * @returns {String}
 */
function getTimezone() {
    const newTimezone = new Date().getTimezoneOffset();
    let result = "";
    if (timezone !== newTimezone) {
        result   = String(-newTimezone);
        timezone = newTimezone;
    }
    return result;
}



// The public API
export default {
    init,
    getToken,
    setToken,
    unsetToken,
    getUser,
    setUser,
    getTimezone,
};
