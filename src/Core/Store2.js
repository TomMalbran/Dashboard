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



// The public API
export default {
    init,

    setLoading,
    showResult,
    setCurrentUser,
};
