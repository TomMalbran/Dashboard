// The initial State
const initialState = {
    loading     : false,
    section     : "",
    redirect    : "/",
    showMenu    : false,
    hasDetails  : false,
    showDetails : false,
    result      : {
        open    : false,
        variant : "",
        message : "",
    },
};



// The Actions
const actions = {
    /**
     * Starts the Loader
     * @param {Function} dispatch
     * @returns {Void}
     */
    startLoader(dispatch) {
        return dispatch({ type : "CORE_LOADING", loading : true });
    },

    /**
     * Ends the Loader
     * @param {Function} dispatch
     * @returns {Void}
     */
    endLoader(dispatch) {
        return dispatch({ type : "CORE_LOADING", loading : false });
    },

    /**
     * Sets the Section
     * @param {Function} dispatch
     * @param {String}   section
     * @returns {Void}
     */
    setSection(dispatch, section) {
        return dispatch({ type : "CORE_SECTION", section });
    },

    /**
     * Shows the Result
     * @param {Function} dispatch
     * @param {String}   variant
     * @param {String}   message
     * @returns {Void}
     */
    showResult(dispatch, variant, message) {
        const result = { open : true, variant, message };
        dispatch({ type : "CORE_RESULT", result });
    },

    /**
     * Hides the Result
     * @param {Function} dispatch
     * @returns {Void}
     */
    hideResult(dispatch) {
        const result = { open : false, variant : "", message : "" };
        return dispatch({ type : "CORE_RESULT", result });
    },

    /**
     * Opens the Menu
     * @param {Function} dispatch
     * @returns {Void}
     */
    openMenu(dispatch) {
        return dispatch({ type : "CORE_MENU_OPEN" });
    },

    /**
     * Closes the Menu
     * @param {Function} dispatch
     * @returns {Void}
     */
    closeMenu(dispatch) {
        return dispatch({ type : "CORE_MENU_CLOSE" });
    },

    /**
     * Sets the Details
     * @param {Function} dispatch
     * @param {Boolean}  hasDetails
     * @returns {Void}
     */
    setDetails(dispatch, hasDetails) {
        dispatch({ type : "CORE_DETAILS_SET", hasDetails });
    },

    /**
     * Opens the Details
     * @param {Function} dispatch
     * @returns {Void}
     */
    openDetails(dispatch) {
        return dispatch({ type : "CORE_DETAILS_OPEN" });
    },

    /**
     * Closes the Details
     * @param {Function} dispatch
     * @returns {Void}
     */
    closeDetails(dispatch) {
        return dispatch({ type : "CORE_DETAILS_CLOSE" });
    },
};



/**
 * The Reducer
 * @param {Object=} state
 * @param {Object=} action
 * @returns {Object}
 */
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case "CORE_REDIRECT":
        return {
            ...state,
            redirect    : action.redirect,
        };
    case "CORE_LOADING":
        return {
            ...state,
            loading     : action.loading,
        };
    case "CORE_SECTION":
        return {
            ...state,
            section     : action.section,
        };
    case "CORE_RESULT":
        return {
            ...state,
            result      : action.result,
        };


    // The Menu Actions
    case "CORE_MENU_OPEN":
        return {
            ...state,
            showMenu : true,
        };
    case "CORE_MENU_CLOSE":
        return {
            ...state,
            showMenu : false,
        };

    // The Details Actions
    case "CORE_DETAILS_SET":
        return {
            ...state,
            hasDetails : action.hasDetails,
        };
    case "CORE_DETAILS_OPEN":
        return {
            ...state,
            showDetails : true,
        };
    case "CORE_DETAILS_CLOSE":
        return {
            ...state,
            showDetails : false,
        };

    default:
        return state;
    }
};




// The public API
export default { initialState, actions, reducer };
