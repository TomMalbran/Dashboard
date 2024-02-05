import React                from "react";



// All the options
const OPTIONS = {
    name       : "",
    icon       : "",
    message    : "",

    isVCE      : false,     // View, Create, Edit
    isVE       : false,     // View, Edit
    isCCED     : false,     // Create, Copy, Edit, Delete
    isCCE      : false,     // Create, Copy, Edit
    isCED      : false,     // Create, Edit, Delete
    isCE       : false,     // Create, Edit

    isView     : false,
    isAdd      : false,
    isCreate   : false,
    isCopy     : false,
    isEdit     : false,
    isMulti    : false,
    isDelete   : false,
    isRemove   : false,

    isImport   : false,
    isExport   : false,
    isTab      : false,
    isCollapse : false,
    isFilter   : false,

    isLogin    : false,
    isSelect   : false,
    isUpload   : false,
    isManage   : false,
    isResolve  : false,
};

// All the Actions
const ACTIONS = {
    "NULL" : { ...OPTIONS },

    "VIEW" : {
        ...OPTIONS,
        icon       : "view",
        message    : "GENERAL_VIEW",
        isView     : true,
        isVCE      : true,
        isVE       : true,
    },
    "ADD" : {
        ...OPTIONS,
        icon       : "create",
        message    : "GENERAL_ADD",
        isAdd      : true,
        isVCE      : true,
        isCCED     : true,
        isCCE      : true,
        isCED      : true,
        isCE       : true,
    },
    "CREATE" : {
        ...OPTIONS,
        icon       : "create",
        message    : "GENERAL_CREATE",
        isCreate   : true,
        isVCE      : true,
        isCCED     : true,
        isCCE      : true,
        isCED      : true,
        isCE       : true,
    },
    "COPY" : {
        ...OPTIONS,
        icon       : "copy",
        message    : "GENERAL_COPY",
        isCCED     : true,
        isCCE      : true,
        isCopy     : true,
    },
    "EDIT" : {
        ...OPTIONS,
        icon       : "edit",
        message    : "GENERAL_EDIT",
        isEdit     : true,
        isVCE      : true,
        isVE       : true,
        isCCED     : true,
        isCCE      : true,
        isCED      : true,
        isCE       : true,
    },
    "MULTI" : {
        ...OPTIONS,
        icon       : "edit",
        message    : "GENERAL_EDIT",
        isMulti    : true,
    },
    "DELETE" : {
        ...OPTIONS,
        icon       : "delete",
        message    : "GENERAL_DELETE",
        isDelete   : true,
        isCCED     : true,
        isCED      : true,
    },
    "REMOVE" : {
        ...OPTIONS,
        icon       : "delete",
        message    : "GENERAL_DELETE",
        isRemove   : true,
    },


    "IMPORT" : {
        ...OPTIONS,
        icon       : "import",
        message    : "GENERAL_IMPORT",
        isImport   : true,
    },
    "EXPORT" : {
        ...OPTIONS,
        icon       : "export",
        message    : "GENERAL_EXPORT",
        isExport   : true,
    },
    "TAB" : {
        ...OPTIONS,
        icon       : "tab",
        isTab      : true,
    },
    "COLLAPSE" : {
        ...OPTIONS,
        icon       : "open",
        isCollapse : true,
    },
    "FILTER" : {
        ...OPTIONS,
        icon       : "filter",
        message    : "GENERAL_FILTER",
        isFilter   : true,
    },


    "LOGIN" : {
        ...OPTIONS,
        icon       : "login",
        message    : "GENERAL_LOGIN_AS",
        isLogin    : true,
    },
    "SELECT" : {
        ...OPTIONS,
        icon       : "select",
        message    : "GENERAL_SELECT",
        isSelect   : true,
    },
    "UPLOAD" : {
        ...OPTIONS,
        icon       : "create",
        message    : "GENERAL_UPLOAD",
        isUpload   : true,
    },
    "MANAGE" : {
        ...OPTIONS,
        icon       : "settings",
        message    : "GENERAL_MANAGE",
        isManage   : true,
    },
    "RESOLVE" : {
        ...OPTIONS,
        icon        : "check",
        isResolve   : true,
    },
};



/**
 * Initializes the Actions
 * @param {Object[]} actions
 * @returns {Void}
 */
function init(actions) {
    for (const { name, icon, message } of actions) {
        const isName = `is${name[0]}${name.toLocaleLowerCase().substr(1)}`;
        for (const action of Object.values(ACTIONS)) {
            action[isName] = false;
        }
        ACTIONS[name]   = create(name, icon, message);
        OPTIONS[isName] = false;
    }
}

/**
 * Creates a New Action
 * @param {String}  name
 * @param {String=} icon
 * @param {String=} message
 * @returns {Object}
 */
function create(name, icon = "", message = "") {
    const isName = `is${name[0]}${name.toLocaleLowerCase().substr(1)}`;
    return {
        ...OPTIONS,
        name, icon, message,
        [isName] : true,
    };
}

/**
 * Returns the Action with the given action
 * @param {(String|Object)=} action
 * @returns {Object}
 */
function get(action) {
    if (!action) {
        return ACTIONS.NULL;
    }
    if (action instanceof Object) {
        return action;
    }
    if (ACTIONS[action]) {
        return ACTIONS[action];
    }
    return create(action);
}



/**
 * Returns a Hook to use the Action
 * @returns {Array}
 */
function useAction() {
    const [ action, setAction ] = React.useState(get());

    const updateAction = (newAction) => {
        if (!newAction) {
            setAction(get());
        } else {
            setAction(get(newAction));
        }
    };
    return [ action, updateAction ];
}

/**
 * Returns a Hook to use the Action and ID
 * @returns {Array}
 */
function useActionID() {
    const [ action, setAction ] = React.useState(get());
    const [ elemID, setElemID ] = React.useState(0);

    const startAction = (newAction, elemID) => {
        setAction(get(newAction));
        setElemID(elemID);
    };

    const endAction = () => {
        setAction(get());
        setElemID(0);
    };

    return [ action, elemID, startAction, endAction ];
}

/**
 * Returns a Hook to use the Action and Code
 * @returns {Array}
 */
function useActionCode() {
    const [ action,   setAction   ] = React.useState(get());
    const [ elemCode, setElemCode ] = React.useState("");

    const startAction = (newAction, elemCode) => {
        if (newAction instanceof Object) {
            setAction(newAction);
        } else {
            setAction(get(newAction));
        }
        setElemCode(elemCode);
    };

    const endAction = () => {
        setAction(get());
        setElemCode("");
    };

    return [ action, elemCode, startAction, endAction ];
}




// The public API
export default {
    init,
    create,
    get,

    useAction,
    useActionID,
    useActionCode,
};
