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
 * @returns {Object}
 */
function useDialog(slice, open, elemID = 0, data = null, setElem = null, getElem = null) {
    const { loaders                } = Store.useState("core");
    const { startLoader, endLoader } = Store.useAction("core");

    const { elem, edition, position  } = Store.useState(slice);
    const { fetchElem, fetchEditData } = Store.useAction(slice);

    const loading = loaders[slice] || false;


    // Dialog Opens
    React.useEffect(() => {
        if (!open) {
            startLoader(slice);
            return;
        }

        if (getElem && elemID) {
            getElem(elemID);
            startLoader(slice);
        } else if (elemID) {
            fetchElem(elemID);
            startLoader(slice);
        } else if (fetchEditData) {
            fetchEditData(...Object.values(data || {}));
            startLoader(slice);
        } else if (setElem) {
            if (data) {
                setElem({ ...data });
            } else {
                setElem();
            }
        } else {
            endLoader(slice);
        }
    }, [ open ]);


    // Data Updated
    React.useEffect(() => {
        if (!open) {
            return;
        }

        if (!setElem) {
            endLoader(slice);
            return;
        }

        if (elemID) {
            setElem(elem);
            endLoader(slice);
        } else {
            let fields = {};
            if (position) {
                fields.position = position;
            }
            if (data) {
                fields = { ...fields, ...data };
            }
            setElem({ ...fields });
            endLoader(slice);
        }
    }, [ edition ]);


    // The API
    return {
        loading, startLoader, endLoader, elem,
    };
}




// The public API
export default useDialog;
