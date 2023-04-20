import React                from "react";

// Core & Utils
import Store                from "../Core/Store";
import Utils                from "../Utils/Utils";



/**
 * Returns a Hook to use the Form Data and Errors
 * @param {String}    slice
 * @param {Object}    initialData
 * @param {Function}  edit
 * @param {Function=} onSubmit
 * @param {Boolean=}  startLoading
 * @param {Boolean=}  open
 * @returns {Object}
 */
function useForm(slice, initialData, edit, onSubmit = null, startLoading = true, open = true) {
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
        if (open && !startLoading) {
            endLoader(slice);
        }
    }, [ open ]);


    // Sets the Data
    const setData = (fields) => {
        setDataInt({ ...data, ...fields });
    };

    // Resets the Data
    const resetData = () => {
        setDataInt({ ...initialData });
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
        endLoader(slice);
    };


    // Handles the Input Change
    const handleChange = (name, value) => {
        setData({ [name] : value });
        setErrors({ [name] : "" });
    };

    // Handles the Input Change
    const handleSearch = async (id, idValue, name, nameValue) => {
        setData({ [id] : idValue,  [name] : nameValue });
        setErrors({ [name] : "" });
    };

    // Starts the Submit
    const handleSubmit = async () => {
        if (loading) {
            return;
        }
        startLoader(slice);
        resetErrors();
        try {
            const response = await edit(data);
            endLoader(slice);
            if (onSubmit) {
                onSubmit(response);
            }
        } catch (errors) {
            endLoader(slice);
            setErrorsInt(errors);
        }
    };


    // The API
    return {
        loading, startLoader, endLoader,
        data, setData, resetData,
        errors, setErrors, resetErrors,
        setElem, handleChange, handleSearch, handleSubmit,
    };
}




// The public API
export default useForm;
