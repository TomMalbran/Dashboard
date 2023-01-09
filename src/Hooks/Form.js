import React                from "react";

// Core & Utils
import Store                from "../Core/Store";
import Utils                from "../Utils/Utils";



/**
 * Returns a Hook to use the Form Data and Errors
 * @param {Object}    initialData
 * @param {Function}  edit
 * @param {Function=} onSubmit
 * @param {Boolean=}  startLoading
 * @returns {Object}
 */
function useForm(initialData, edit, onSubmit = null, startLoading = true) {
    const { loading                } = Store.useState("core");
    const { startLoader, endLoader } = Store.useAction("core");

    const initialErrors = { form : "" };
    for (const key of Object.keys(initialData)) {
        initialErrors[key] = "";
    }

    const [ data,   setDataInt   ] = React.useState({ ...initialData });
    const [ errors, setErrorsInt ] = React.useState({ ...initialErrors });

    // Reset the Loader
    React.useEffect(() => {
        if (!startLoading) {
            endLoader();
        }
    }, []);


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
        endLoader();
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
        startLoader();
        resetErrors();
        try {
            const response = await edit(data);
            endLoader();
            if (onSubmit) {
                onSubmit(response);
            }
        } catch (errors) {
            endLoader();
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
