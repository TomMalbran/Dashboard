import React                from "react";

// Utils
import Store                from "../Core/Store";
import Period               from "../Utils/Period";



// eslint-disable-next-line valid-jsdoc
/**
 * Returns a Hook to use the Filter Data
 * @param {String}    slice
 * @param {Boolean}   open
 * @param {Object}    initialData
 * @param {Object}    filters
 * @param {Function=} onSubmit
 * @param {Object=}   sendData
 * @returns {{
 *   loading      : Boolean,
 *   startLoading : Function,
 *   endLoading   : Function,
 *   data         : Object,
 *   setData      : Function,
 *   handleChange : (...any) => any,
 *   handleSearch : (...any) => any,
 *   handlePeriod : (...any) => any,
 *   handleSubmit : (...any) => any,
 * }}
 */
function useFilter(slice, open, initialData, filters, onSubmit = null, sendData = {}) {
    const { loaders } = Store.useState("core");
    const { startLoader, endLoader } = Store.useAction("core");

    const { edition } = Store.useState(slice);
    const { fetchFilterData, fetchEditData } = Store.useAction(slice);

    const loading = loaders[slice] || false;

    // The Current State
    const [ data, setDataInt ] = React.useState({ ...initialData, ...filters });


    // Dialog Opens
    React.useEffect(() => {
        if (!open) {
            startLoading();
            return;
        }

        if (fetchFilterData) {
            fetchFilterData(...Object.values(sendData || {}));
            startLoading();
        } else if (fetchEditData) {
            fetchEditData(...Object.values(sendData || {}));
            startLoading();
        } else {
            endLoading();
        }
        setDataInt({ ...initialData, ...filters });
    }, [ open ]);

    // Data Updated
    React.useEffect(() => {
        endLoading();
    }, [ edition ]);


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

    // Handles the Input Change
    const handleChange = (name, value, secondName, secondValue) => {
        const fields = { [name] : value };
        if (secondName) {
            fields[secondName] = secondValue;
        }
        setData(fields);
    };

    // Handles the Search Change
    const handleSearch = (id, idValue, name, nameValue) => {
        setData({ ...data, [id] : idValue, [name] : nameValue });
    };

    // Handles the Period Change
    const handlePeriod = (name, period) => {
        const fromDate = Period.getFromDate(period);
        const toDate   = Period.getToDate(period);
        setData({ ...data, period, fromDate, toDate });
    };

    // Handles the Submit
    const handleSubmit = (filters, hasFilters) => {
        setData({ ...filters });
        if (onSubmit) {
            onSubmit(hasFilters ? filters : {});
        }
    };


    // The API
    return {
        loading, startLoading, endLoading,
        data, setData,
        handleChange, handleSearch, handlePeriod, handleSubmit,
    };
}




// The public API
export default useFilter;
