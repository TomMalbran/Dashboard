// All the options
const OPTIONS = {
    icon      : "",
    message   : "",

    isView    : false,
    isAdd     : false,
    isCreate  : false,
    isEdit    : false,
    isDelete  : false,
    isImport  : false,
    isExport  : false,
    isTab     : false,
    isFilter  : false,
    
    isVCE     : false,
    isVE      : false,
    isCED     : false,
    isCE      : false,
};

// All the Actions
const ACTIONS = {
    "NULL" : { ...OPTIONS },

    // General Actions
    "VIEW" : {
        ...OPTIONS,
        icon      : "view",
        message   : "GENERAL_VIEW",
        isView    : true,
        isVCE     : true,
        isVE      : true,
    },
    "ADD" : {
        ...OPTIONS,
        icon      : "create",
        message   : "GENERAL_ADD",
        isAdd     : true,
    },
    "CREATE" : {
        ...OPTIONS,
        icon      : "create",
        message   : "GENERAL_CREATE",
        isCreate  : true,
        isVCE     : true,
        isCED     : true,
        isCE      : true,
    },
    "EDIT" : {
        ...OPTIONS,
        icon      : "edit",
        message   : "GENERAL_EDIT",
        isEdit    : true,
        isVCE     : true,
        isVE      : true,
        isCED     : true,
        isCE      : true,
    },
    "DELETE" : {
        ...OPTIONS,
        icon      : "delete",
        message   : "GENERAL_DELETE",
        isDelete  : true,
        isCED     : true,
    },
    "IMPORT" : {
        ...OPTIONS,
        icon      : "import",
        message   : "GENERAL_IMPORT",
        isImport  : true,
    },
    "EXPORT" : {
        ...OPTIONS,
        icon      : "export",
        message   : "GENERAL_EXPORT",
        isExport  : true,
    },
    "TAB" : {
        ...OPTIONS,
        icon      : "tab",
        isTab     : true,
    },
    "FILTER" : {
        ...OPTIONS,
        icon      : "filter",
        message   : "GENERAL_FILTER",
        isFilter  : true,
    },
};




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

/**
 * Sets a New Action
 * @param {String}  name
 * @param {String=} icon
 * @param {String=} message
 * @returns {Object}
 */
function add(name, icon = "", message = "") {
    ACTIONS[name] = create(name, icon, message);
    return ACTIONS[name];
}

/**
 * Sets a New Action
 * @param {String}  name
 * @param {String=} icon
 * @param {String=} message
 * @returns {Object}
 */
function create(name, icon = "", message = "") {
    const is = `is${name[0]}${name.toLocaleLowerCase().substr(1)}`;
    return {
        ...OPTIONS,
        icon, message,
        [is] : true,
    };
}



// The public API
export default {
    get,
    add,
    create,
};
