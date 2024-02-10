import { jwtDecode }        from "jwt-decode";
import NLS                  from "../Core/NLS";

// Module Variables
let token          = "";
let refreshToken   = "";
let timezone       = null;
let language       = null;
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
    }
    if (localStorage.refreshToken) {
        refreshToken = localStorage.refreshToken;
    }
    setUser();
}

/**
 * Unsets all the Data
 * @returns {Void}
 */
function unsetAll() {
    unsetToken();
    unsetRefreshToken();
    unsetUser();
}



/**
 * Returns the Token
 * @returns {String}
 */
function getToken() {
    return token;
}

/**
 * Returns the Decoded Token
 * @returns {{exp: Number, data: Object}}
 */
function getDecodeToken() {
    return jwtDecode(token);
}

/**
 * Sets the JWT Token
 * @param {String} newToken
 * @returns {Void}
 */
function setToken(newToken) {
    if (token !== newToken) {
        token    = newToken;
        language = null;
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
    token = "";
    localStorage.removeItem("token");
}



/**
 * Returns the Refresh Token
 * @returns {String}
 */
function getRefreshToken() {
    return refreshToken;
}

/**
 * Sets the Refresh Token
 * @param {String} newRefreshToken
 * @returns {Void}
 */
function setRefreshToken(newRefreshToken) {
    if (refreshToken !== newRefreshToken) {
        refreshToken = newRefreshToken;
        localStorage.setItem("refreshToken", refreshToken);
    }
}

/**
 * Unsets the Refresh Token
 * @returns {Void}
 */
function unsetRefreshToken() {
    refreshToken = "";
    localStorage.removeItem("refreshToken");
}



/**
 * Returns the User
 * @returns {?Object}
 */
function getUser() {
    if (token) {
        const jwt = getDecodeToken();
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
        const jwt  = getDecodeToken();
        const time = Math.floor(Date.now() / 1000);
        if (jwt.exp < time) {
            unsetToken();
            unsetUser();
            return false;
        }

        setCurrentUser(jwt.data);
        if (jwt.data.language) {
            NLS.setLang(jwt.data.language);
        }
        return true;

    } catch (e) {
        unsetToken();
        unsetUser();
        return false;
    }
}

/**
 * Unsets the User
 * @returns {Void}
 */
function unsetUser() {
    language = null;
    timezone = null;
    setCurrentUser({});
}



/**
 * Returns the Language
 * @returns {String}
 */
function getLanguage() {
    const newLanguage = NLS.getLang();
    let result = "";
    if (language !== newLanguage) {
        result   = String(newLanguage);
        language = newLanguage;
    }
    return result;
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
    unsetAll,

    getToken,
    setToken,
    unsetToken,

    getRefreshToken,
    setRefreshToken,
    unsetRefreshToken,

    getUser,
    setUser,
    unsetUser,

    getLanguage,
    getTimezone,
};
