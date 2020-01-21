// Module variables
let store = null;



/**
 * Initialize the Store
 * @param {Object} theStore
 * @returns {Void}
 */
function init(theStore) {
    store = theStore;
    setLoading(false);
}



/**
 * Sets the Loading
 * @param {Boolean} loading
 * @returns {Void}
 */
function setLoading(loading) {
    store.dispatch({ type : "CORE_LOADING", loading });
}

/**
 * Shows the Result
 * @param {String} variant
 * @param {String} message
 * @returns {Void}
 */
function showResult(variant, message) {
    const result = { open : true, variant, message };
    store.dispatch({ type : "CORE_RESULT", result });
}

/**
 * Sets the Current Credential
 * @param {Object} credential
 * @returns {Void}
 */
function setCurrentUser(credential) {
    store.dispatch({ type : "AUTH_CURRENT_USER", credential });
}



/**
 * Sets the Redirect
 * @param {String} redirect
 * @returns {Void}
 */
function setRedirect(redirect) {
    store.dispatch({ type : "CORE_REDIRECT", redirect });
}

/**
 * Sets the Details
 * @param {Boolean} hasDetails
 * @returns {Void}
 */
function setDetails(hasDetails) {
    store.dispatch({ type : "CORE_DETAILS_SET", hasDetails });
}

/**
 * Closes the Details
 * @returns {Void}
 */
function closeDetails() {
    store.dispatch({ type : "CORE_DETAILS_CLOSE" });
}



// The public API
export default {
    init,
    
    setLoading,
    showResult,
    setCurrentUser,

    setRedirect,
    setDetails,
    closeDetails,
};
