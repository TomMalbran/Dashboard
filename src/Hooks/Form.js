import React                from "react";

// Core & Utils
import Store                from "../Core/Store";
import Utils                from "../Utils/Utils";



/**
 * Returns a Hook to use the Form Data and Errors
 * @param {string}    slice
 * @param {object}    initialData
 * @param {Function=} edit
 * @param {Function=} onSubmit
 * @param {boolean=}  startInLoading
 * @param {boolean=}  open
 *
 * @typedef {object}    FormType
 * @property {boolean}  loading
 * @property {Function} startLoading
 * @property {Function} endLoading
 * @property {object}   data
 * @property {Function} setData
 * @property {Function} resetData
 * @property {object}   errors
 * @property {Function} setError
 * @property {Function} setErrors
 * @property {Function} resetErrors
 * @property {Function} setElem
 * @property {(...args: any[]) => any} handleChange
 * @property {(...args: any[]) => any} handleSubmit
 * @returns {FormType}
 */
function useForm(slice, initialData, edit = null, onSubmit = null, startInLoading = true, open = true) {
    const { loaders                } = Store.useState("core");
    const { startLoader, endLoader } = Store.useAction("core");

    const loading = loaders[slice] || false;

    const initialErrors = { form : "" };
    for (const key of Object.keys(initialData)) {
        initialErrors[key] = "";
    }

    const [ data,   setDataInt   ] = React.useState({ ...initialData });
    const [ errors, setErrorsInt ] = React.useState({ ...initialErrors });

    // Reset the Loader
    React.useEffect(() => {
        if (open && !startInLoading) {
            endLoading();
        }
    }, [ open ]);


    // Starts the Loading
    const startLoading = () => {
        startLoader(slice);
    };

    // Ends the Loading
    const endLoading = () => {
        endLoader(slice);
    };

    // Sets the Data
    const setData = (fields) => {
        setDataInt({ ...data, ...fields });
    };

    // Resets the Data
    const resetData = () => {
        setDataInt({ ...initialData });
    };


    // Sets an Error
    const setError = (field, error) => {
        setErrorsInt({ ...errors, [field] : error });
    };

    // Sets the Errors
    const setErrors = (fields) => {
        setErrorsInt({ ...errors, ...fields });
    };

    // Resets the Errors
    const resetErrors = () => {
        setErrorsInt({ ...initialErrors });
    };


    // Sets the Elem
    const setElem = (elem = {}) => {
        const fields = {};
        for (const [ key, value ] of Object.entries(initialData)) {
            if (elem[key] !== undefined) {
                fields[key] = Utils.isBoolean(elem[key]) ? Number(elem[key]) : elem[key];
            } else {
                fields[key] = value;
            }
        }
        setDataInt(fields);
        resetErrors();
        endLoading();
    };


    // Handles the Input Change
    const handleChange = (name, value, secondName, secondValue) => {
        const fields = { [name] : value };
        if (secondName) {
            fields[secondName] = secondValue;
        }

        setData(fields);
        const removeErrors = { [name] : "" };

        // Handle the Errors of a Field input
        try {
            const data = JSON.parse(value);
            for (const key of Object.keys(errors)) {
                if (!key.startsWith(name)) {
                    continue;
                }
                const parts = key.split("-");
                if (parts.length !== 3) {
                    continue;
                }
                if (data[parts[1]]?.[parts[2]]) {
                    removeErrors[key] = "";
                }
            }
        } catch {
            // Do Nothing
        }
        setErrors(removeErrors);
    };

    // Starts the Submit
    const handleSubmit = async (extraData = {}) => {
        if (!edit) {
            if (onSubmit) {
                onSubmit();
            }
            return;
        }

        if (loading) {
            return;
        }
        startLoading();
        resetErrors();
        try {
            const response = await edit({ ...data, ...extraData });
            endLoading();
            if (onSubmit) {
                onSubmit(response);
            }
        } catch (errors) {
            endLoading();
            setErrorsInt(errors);
        }
    };


    // The API
    return {
        loading, startLoading, endLoading,
        data, setData, resetData,
        errors, setError, setErrors, resetErrors,
        setElem, handleChange, handleSubmit,
    };
}




// The public API
export default useForm;
