import React                from "react";
import PropTypes            from "prop-types";

// Core
import CoreStore             from "./Stores/CoreStore";



// Variables
const Context = React.createContext(null);
let   actions = {};



/**
 * Creates the Store Provider
 * @param {{
 *   config   : object,
 *   children : Array,
 * }} props
 * @returns {React.ReactElement}
 */
function Provider({ config, children }) {
    actions = config.actions;

    const [ state, dispatch ] = React.useReducer(config.rootReducer, config.initialState);
    const store = React.useMemo(() => [ state, dispatch ], [ state ]);

    return <Context.Provider value={store}>
        {children}
    </Context.Provider>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Provider.propTypes = {
    config   : PropTypes.object.isRequired,
    children : PropTypes.any,
};



/**
 * Creates a Slice
 * @param {object}   initialState
 * @param {object}   actions
 * @param {Function} reducer
 * @returns {object}
 */
function createSlice(initialState, actions, reducer) {
    return {
        initialState,
        actions,
        reducer,
    };
}

/**
 * Configures the Store
 * @param {object} slices
 * @returns {object}
 */
function configureStore(slices = {}) {
    const initialState = {};
    const actions      = {};
    const reducers     = {};

    slices.core = CoreStore;

    for (const [ prop, slice ] of Object.entries(slices)) {
        initialState[prop] = slice.initialState;
        actions[prop]      = slice.actions;
        reducers[prop]     = slice.reducer;
    }
    const rootReducer = combineReducers(reducers);

    return { initialState, actions, rootReducer };
}

/**
 * Combines the Reducers
 * @param {object} reducers
 * @returns {Function}
 */
function combineReducers(reducers) {
    return (state, action) => {
        const result = { ...state };

        // If the action was aborted, do not process it
        if (action.aborted || action.data?.aborted) {
            return result;
        }

        // Process each reducer
        for (const [ slice, reducer ] of Object.entries(reducers)) {
            result[slice] = reducer(result[slice], action);
        }
        return result;
    };
}



/**
 * Returns the Store Hook
 * @returns {Array}
 */
function useStore() {
    return React.useContext(Context);
}

/**
 * Returns the Store State Hook
 * @param {string} slice
 * @returns {object}
 */
function useState(slice) {
    const [ state ] = React.useContext(Context);
    return state[slice] || {};
}

/**
 * Returns the Store Action Hook
 * @param {string} slice
 * @returns {object}
 */
function useAction(slice) {
    const context  = React.useContext(Context);
    const dispatch = context[1];

    return React.useMemo(() => {
        if (!actions[slice]) {
            return {};
        }

        const result = {};
        for (const [ name, action ] of Object.entries(actions[slice])) {
            result[name] = (...params) => action(dispatch, ...params);
        }
        return result;
    }, [ dispatch ]);
}




// The public API
export default {
    Provider,
    createSlice,
    configureStore,
    useStore,
    useState,
    useAction,
};
