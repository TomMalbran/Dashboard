// All the options
const OPTIONS = {
    name     : "",
    icon     : "",
    message  : "",

    isVCE    : false,
    isVE     : false,
    isCED    : false,
    isCE     : false,

    isView   : false,
    isAdd    : false,
    isCreate : false,
    isEdit   : false,
    isDelete : false,

    isImport : false,
    isExport : false,
    isTab    : false,
    isFilter : false,

    isLogin  : false,
    isSelect : false,
    isUpload : false,
    isManage : false,
};

// All the Actions
const ACTIONS = {
    "NULL" : { ...OPTIONS },

    "VIEW" : {
        ...OPTIONS,
        icon     : "view",
        message  : "GENERAL_VIEW",
        isView   : true,
        isVCE    : true,
        isVE     : true,
    },
    "ADD" : {
        ...OPTIONS,
        icon     : "create",
        message  : "GENERAL_ADD",
        isAdd    : true,
        isVCE    : true,
        isCED    : true,
        isCE     : true,
    },
    "CREATE" : {
        ...OPTIONS,
        icon     : "create",
        message  : "GENERAL_CREATE",
        isCreate : true,
        isVCE    : true,
        isCED    : true,
        isCE     : true,
    },
    "EDIT" : {
        ...OPTIONS,
        icon     : "edit",
        message  : "GENERAL_EDIT",
        isEdit   : true,
        isVCE    : true,
        isVE     : true,
        isCED    : true,
        isCE     : true,
    },
    "DELETE" : {
        ...OPTIONS,
        icon     : "delete",
        message  : "GENERAL_DELETE",
        isDelete : true,
        isCED    : true,
    },


    "IMPORT" : {
        ...OPTIONS,
        icon     : "import",
        message  : "GENERAL_IMPORT",
        isImport : true,
    },
    "EXPORT" : {
        ...OPTIONS,
        icon     : "export",
        message  : "GENERAL_EXPORT",
        isExport : true,
    },
    "TAB" : {
        ...OPTIONS,
        icon     : "tab",
        isTab    : true,
    },
    "FILTER" : {
        ...OPTIONS,
        icon     : "filter",
        message  : "GENERAL_FILTER",
        isFilter : true,
    },


    "LOGIN" : {
        ...OPTIONS,
        icon     : "login",
        message  : "GENERAL_LOGIN_AS",
        isLogin  : true,
    },
    "SELECT" : {
        ...OPTIONS,
        icon     : "select",
        message  : "GENERAL_SELECT",
        isSelect : true,
    },
    "UPLOAD" : {
        ...OPTIONS,
        icon     : "create",
        message  : "GENERAL_UPLOAD",
        isUpload : true,
    },
    "MANAGE" : {
        ...OPTIONS,
        icon     : "settings",
        message  : "GENERAL_MANAGE",
        isManage : true,
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
 * Returns the Action with the given name
 * @param {String=} name
 * @returns {Object}
 */
function get(name) {
    if (!name) {
        return ACTIONS.NULL;
    }
    if (ACTIONS[name]) {
        return ACTIONS[name];
    }
    return create(name);
}



// The public API
export default {
    init,
    create,
    get,
};
