import { jwtDecode }        from "jwt-decode";
import NLS                  from "../Core/NLS";

// Module Variables
let accessToken    = "";
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
    if (localStorage.accessToken) {
        accessToken = localStorage.accessToken;
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
    unsetAccessToken();
    unsetRefreshToken();
    unsetUser();
}



/**
 * Returns the Access Token
 * @returns {String}
 */
function getAccessToken() {
    return accessToken;
}

/**
 * Returns the Data of the Access Token
 * @returns {{exp: Number, data: Object}}
 */
function getAccessTokenData() {
    return jwtDecode(accessToken);
}

/**
 * Sets the Access Token
 * @param {String} newAccessToken
 * @returns {Void}
 */
function setAccessToken(newAccessToken) {
    if (accessToken !== newAccessToken) {
        accessToken = newAccessToken;
        language    = null;
        timezone    = null;
        localStorage.setItem("accessToken", accessToken);
        setUser();
    }
}

/**
 * Unsets the Access Token
 * @returns {Void}
 */
function unsetAccessToken() {
    accessToken = "";
    localStorage.removeItem("accessToken");
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
    if (accessToken) {
        const token = getAccessTokenData();
        return token.data;
    }
    return null;
}

/**
 * Sets the User
 * @returns {Boolean}
 */
function setUser() {
    try {
        const token = getAccessTokenData();
        const time  = Math.floor(Date.now() / 1000);
        if (token.exp < time) {
            unsetAccessToken();
            unsetUser();
            return false;
        }

        setCurrentUser(token.data);
        if (token.data.language) {
            NLS.setLang(token.data.language);
        }
        if (token.data.appearance) {
            setAppearance(token.data.appearance);
        }
        return true;

    } catch (e) {
        unsetAccessToken();
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


/**
 * Sets the Appearance
 * @param {String} appearance
 * @returns {Void}
 */
function setAppearance(appearance) {
    document.querySelector("#root").className = `${appearance}-mode`;
}



// The public API
export default {
    init,
    unsetAll,

    getAccessToken,
    setAccessToken,

    getRefreshToken,
    setRefreshToken,

    getUser,
    setUser,
    unsetUser,

    getLanguage,
    getTimezone,
    setAppearance,
};
