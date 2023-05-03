// The initial State
const initialState = {
    loaders     : {},
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
    tooltip     : {
        open      : false,
        targetRef : null,
        variant   : "",
        message   : "",
    },
};



// The Actions
const actions = {
    /**
     * Starts the Loader
     * @param {Function} dispatch
     * @param {String}   slice
     * @returns {Void}
     */
    startLoader(dispatch, slice) {
        return dispatch({ type : "CORE_LOADING", slice, loading : true });
    },

    /**
     * Ends the Loader
     * @param {Function} dispatch
     * @param {String}   slice
     * @returns {Void}
     */
    endLoader(dispatch, slice) {
        return dispatch({ type : "CORE_LOADING", slice, loading : false });
    },

    /**
     * Sets the Redirect
     * @param {Function} dispatch
     * @param {String}   redirect
     * @returns {Void}
     */
    setRedirect(dispatch, redirect) {
        return dispatch({ type : "CORE_REDIRECT", redirect });
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
        const result = { ...initialState.result };
        return dispatch({ type : "CORE_RESULT", result });
    },

    /**
     * Shows the Tooltip
     * @param {Function} dispatch
     * @param {Object}   targetRef
     * @param {String}   variant
     * @param {String}   message
     * @returns {Void}
     */
    showTooltip(dispatch, targetRef, variant, message) {
        const tooltip = { open : true, targetRef, variant, message };
        return dispatch({ type : "CORE_TOOLTIP", tooltip });
    },

    /**
     * Hide the Tooltip
     * @param {Function} dispatch
     * @returns {Void}
     */
    hideTooltip(dispatch) {
        const tooltip = { ...initialState.tooltip };
        return dispatch({ type : "CORE_TOOLTIP", tooltip });
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
    case "CORE_LOADING":
        return {
            ...state,
            loaders  : {
                ...state.loaders,
                [action.slice] : action.loading,
            },
        };
    case "CORE_REDIRECT":
        return {
            ...state,
            redirect : action.redirect,
        };
    case "CORE_SECTION":
        return {
            ...state,
            section  : action.section,
        };
    case "CORE_RESULT":
        return {
            ...state,
            result   : action.result,
        };
    case "CORE_TOOLTIP":
        return {
            ...state,
            tooltip  : action.tooltip,
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
