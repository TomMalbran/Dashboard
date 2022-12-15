import React                from "react";

// Core
import Store                from "../Core/Store";



/**
 * Returns a Hook to use the Form Data and Errors
 * @param {Object}    initialData
 * @param {Function}  edit
 * @param {Function=} onSubmit
 * @param {Boolean=}  startLoading
 * @returns {Object}
 */
function useForm(initialData, edit, onSubmit = null, startLoading = true) {
    const { loading    } = Store.useState("core");
    const { setLoading } = Store.useAction("core");

    const initialErrors = { form : "" };
    for (const key of Object.keys(initialData)) {
        initialErrors[key] = "";
    }

    const [ data,   setDataInt   ] = React.useState({ ...initialData });
    const [ errors, setErrorsInt ] = React.useState({ ...initialErrors });


    // Starts the Loader
    const startLoader = () => {
        setLoading(true);
    };

    // Ends the Loader
    const endLoader = () => {
        setLoading(false);
    };


    // Sets the Data
    const setData = (fields) => {
        setDataInt({ ...data, ...fields });
    };

    // Resets the Data
    const resetData = () => {
        setDataInt({ ...initialData });
    };


    // Returns the Main Error
    const mainError = () => {
        return errors.form;
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
        setDataInt({ ...initialData, ...elem });
        resetErrors();
        setLoading(false);
    };

    // Sets the Position
    const setPosition = (position) => {
        setDataInt({ ...initialData, position });
        resetErrors();
        setLoading(false);
    };

    // Resets the Data and Errors
    const reset = () => {
        resetData();
        resetErrors();
        setLoading(false);
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
            await edit(data);
            endLoader();
            if (onSubmit) {
                onSubmit();
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
        errors, mainError, setErrors, resetErrors,
        setElem, setPosition, reset,
        handleChange, handleSearch, handleSubmit,
    };
}




// The public API
export default useForm;
