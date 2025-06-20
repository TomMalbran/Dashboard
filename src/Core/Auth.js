import { jwtDecode }        from "jwt-decode";
import NLS                  from "../Core/NLS";

// Module Variables
let setCurrentUser = null;



/**
 * Initialize the API
 * @param {Function} onUserChange
 * @returns {Void}
 */
function init(onUserChange) {
    setCurrentUser = onUserChange;
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
    return localStorage.getItem("accessToken");
}

/**
 * Returns the Data of the Access Token
 * @returns {{exp: Number, data: Object}}
 */
function getAccessTokenData() {
    return jwtDecode(getAccessToken());
}

/**
 * Sets the Access Token
 * @param {String} accessToken
 * @returns {Void}
 */
function setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
    setUser();
}

/**
 * Unsets the Access Token
 * @returns {Void}
 */
function unsetAccessToken() {
    localStorage.removeItem("accessToken");
}



/**
 * Returns the Refresh Token
 * @returns {String}
 */
function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

/**
 * Sets the Refresh Token
 * @param {String} refreshToken
 * @returns {Void}
 */
function setRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
}

/**
 * Unsets the Refresh Token
 * @returns {Void}
 */
function unsetRefreshToken() {
    localStorage.removeItem("refreshToken");
}



/**
 * Returns the User
 * @returns {?Object}
 */
function getUser() {
    if (getAccessToken()) {
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
    setCurrentUser({});
}



/**
 * Returns the Language
 * @returns {String}
 */
function getLanguage() {
    const language = NLS.getLang();
    return String(language);
}

/**
 * Returns the Timezone
 * @returns {String}
 */
function getTimezone() {
    const timezone = new Date().getTimezoneOffset();
    return String(-timezone);
}

/**
 * Sets the Appearance
 * @param {String} appearance
 * @returns {Void}
 */
function setAppearance(appearance) {
    document.querySelector("body").className = `${appearance}-mode`;
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
