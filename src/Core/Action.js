// All the options
const INITIAL = {
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


// The public API
const ACTIONS = {
    "NULL" : { ...INITIAL },

    // General Actions
    "VIEW" : {
        ...INITIAL,
        icon      : "view",
        message   : "GENERAL_VIEW",
        isView    : true,
        isVCE     : true,
        isVE      : true,
    },
    "ADD" : {
        ...INITIAL,
        icon      : "create",
        message   : "GENERAL_ADD",
        isAdd     : true,
    },
    "CREATE" : {
        ...INITIAL,
        icon      : "create",
        message   : "GENERAL_CREATE",
        isCreate  : true,
        isVCE     : true,
        isCED     : true,
        isCE      : true,
    },
    "EDIT" : {
        ...INITIAL,
        icon      : "edit",
        message   : "GENERAL_EDIT",
        isEdit    : true,
        isVCE     : true,
        isVE      : true,
        isCED     : true,
        isCE      : true,
    },
    "DELETE" : {
        ...INITIAL,
        icon      : "delete",
        message   : "GENERAL_DELETE",
        isDelete  : true,
        isCED     : true,
    },
    "IMPORT" : {
        ...INITIAL,
        icon      : "import",
        message   : "GENERAL_IMPORT",
        isImport  : true,
    },
    "EXPORT" : {
        ...INITIAL,
        icon      : "export",
        message   : "GENERAL_EXPORT",
        isExport  : true,
    },
    "TAB" : {
        ...INITIAL,
        icon      : "tab",
        isTab     : true,
    },
    "FILTER" : {
        ...INITIAL,
        icon      : "filter",
        message   : "GENERAL_FILTER",
        isFilter  : true,
    },
};



/**
 * Sets a New Action
 * @param {String}  name
 * @param {String=} icon
 * @param {String=} message
 * @returns {Void}
 */
function setAction(name, icon, message) {
    const is = `is${name[0]}${name.toLocaleLowerCase().substr(1)}`;
    ACTIONS[name] = {
        ...INITIAL,
        icon, message,
        [is] : true,
    };
}
ACTIONS.setAction = setAction;



// The public API
export default ACTIONS;
