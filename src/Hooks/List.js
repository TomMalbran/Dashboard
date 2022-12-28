import React                from "react";

// Core
import Store                from "../Core/Store";
import Navigate             from "../Core/Navigate";



/**
 * Returns a Hook to use the List Fetch
 * @param {String}  slice
 * @param {String=} type
 * @returns {Object}
 */
function useList(slice, type = "") {
    const elemID = Navigate.useOneParam(type);
    const data   = Store.useState(slice);
    const { startLoader, fetchList } = Store.useAction(slice);


    // Load the data
    React.useEffect(() => {
        load();
        return () => startLoader();
    }, []);


    // Fetch the content
    const fetch = (params = data.sort) => {
        if (type && data.filters) {
            fetchList(type, elemID, data.filters, params);
        } else if (type) {
            fetchList(type, elemID, params);
        } else if (data.filters) {
            fetchList(data.filters, params);
        } else {
            fetchList(params);
        }
    };

    // Loads the Content
    const load = (params = data.sort) => {
        startLoader();
        fetch(params);
    };

    // Filters the content after Filter
    const filter = (filters) => {
        startLoader();
        const params = { ...data.sort, page : 0 };
        if (type) {
            fetchList(type, elemID, filters, params);
        } else {
            fetchList(filters, params);
        }
    };


    // The API
    return { fetch, load, filter };
}




// The public API
export default useList;
