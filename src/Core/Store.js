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
 *   config   : Object,
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
 * @typedef {Object} propTypes
 */
Provider.propTypes = {
    config   : PropTypes.object.isRequired,
    children : PropTypes.any,
};



/**
 * Creates a Slice
 * @param {Object}   initialState
 * @param {Object}   actions
 * @param {Function} reducer
 * @returns {Object}
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
 * @param {Object} slices
 * @returns {Object}
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
 * @param {Object} slices
 * @returns {Function}
 */
function combineReducers(slices) {
    return (state, action) => {
        const result = { ...state };
        for (const [ prop, slice ] of Object.entries(slices)) {
            result[prop] = slice(result[prop], action);
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
 * @param {String} slice
 * @returns {Object}
 */
function useState(slice) {
    const [ state ] = React.useContext(Context);
    return state[slice] || {};
}

/**
 * Returns the Store Action Hook
 * @param {String} slice
 * @returns {Object}
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
