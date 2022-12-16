import React                from "react";

// Core
import Store                from "../Core/Store";



/**
 * Returns a Hook to use the Dialog Data
 * @param {String}    slice
 * @param {Boolean}   open
 * @param {Number}    elemID
 * @param {Object=}   data
 * @param {Function=} setElem
 * @returns {Object}
 */
function useDialog(slice, open, elemID, data = null, setElem = null) {
    const { loading                } = Store.useAction("core");
    const { startLoader, endLoader } = Store.useAction("core");

    const { elem, edition, position  } = Store.useState(slice);
    const { fetchElem, fetchEditData } = Store.useAction(slice);


    // Dialog Opens
    React.useEffect(() => {
        if (!open) {
            startLoader();
            return;
        }

        if (elemID) {
            fetchElem(elemID);
            startLoader();
        } else if (fetchEditData) {
            fetchEditData(...Object.values(data || {}));
            startLoader();
        } else if (setElem) {
            if (data) {
                setElem({ ...data });
            } else {
                setElem();
            }
        }
    }, [ open ]);


    // Data Updated
    React.useEffect(() => {
        if (!open) {
            return;
        }

        if (!setElem) {
            endLoader();
            return;
        }

        if (elemID) {
            setElem(elem);
            endLoader();
        } else {
            let fields = {};
            if (position) {
                fields.position = position;
            }
            if (data) {
                fields = { ...fields, ...data };
            }
            setElem({ ...fields });
            endLoader();
        }
    }, [ edition ]);


    // The API
    return {
        loading, startLoader, endLoader, elem,
    };
}




// The public API
export default useDialog;
