import React                from "react";

// Core
import Store                from "../Core/Store";



/**
 * Returns a Hook to use the Dialog Data
 * @param {String}    slice
 * @param {Boolean}   open
 * @param {Number=}   elemID
 * @param {Object=}   data
 * @param {Function=} setElem
 * @param {Function=} getElem
 * @returns {{
 *   loading      : Boolean,
 *   startLoading : Function,
 *   endLoading   : Function,
 *   elem         : Object,
 *   canEdit      : Boolean,
 * }}
 */
function useDialog(slice, open, elemID = 0, data = null, setElem = null, getElem = null) {
    const { loaders } = Store.useState("core");
    const { startLoader, endLoader } = Store.useAction("core");

    const { elem, canEdit, edition, position } = Store.useState(slice);
    const { fetchElem, fetchEditData } = Store.useAction(slice);

    const loading = loaders[slice] || false;

    // Starts the Loading
    const startLoading = () => {
        startLoader(slice);
    };

    // Ends the Loading
    const endLoading = () => {
        endLoader(slice);
    };


    // Dialog Opens
    React.useEffect(() => {
        if (!open) {
            startLoading();
            return;
        }

        if (getElem && elemID) {
            getElem(elemID);
            startLoading();
        } else if (getElem) {
            getElem(...Object.values(data || {}));
            startLoading();
        } else if (fetchElem && elemID) {
            fetchElem(elemID);
            startLoading();
        } else if (fetchEditData) {
            fetchEditData(...Object.values(data || {}));
            startLoading();
        } else if (setElem) {
            if (data) {
                setElem({ ...data });
            } else {
                setElem();
            }
        } else {
            endLoading();
        }
    }, [ open ]);


    // Data Updated
    React.useEffect(() => {
        if (!open) {
            return;
        }

        if (!setElem) {
            endLoading();
            return;
        }

        if (getElem && data) {
            setElem(data);
            endLoading();
        } else if (elemID) {
            setElem(elem);
            endLoading();
        } else {
            let fields = {};
            if (position) {
                fields.position = position;
            }
            if (data) {
                fields = { ...fields, ...data };
            }
            setElem({ ...fields });
            endLoading();
        }
    }, [ edition ]);


    // The API
    return {
        loading, startLoading, endLoading, elem, canEdit,
    };
}




// The public API
export default useDialog;
