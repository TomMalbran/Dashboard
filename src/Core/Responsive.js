import React                from "react";



/**
 * The width for Mobile
 * @constant {Number}
 */
const WIDTH_FOR_MOBILE = 700;

/**
 * The width to hide the Menu
 * @constant {Number}
 */
const WIDTH_FOR_MENU = 1000;

/**
 * The width to hide the Details
 * @constant {Number}
 */
const WIDTH_FOR_DETAILS = 1200;



/**
 * Hook to determine if the current width is for the Mobile
 * @returns {Boolean}
 */
function useIsForMobile() {
    return React.useMemo(() => {
        return window.innerWidth <= WIDTH_FOR_MOBILE;
    }, [ window.innerWidth ]);
}

/**
 * Hook to determine if the current width is for the Menu
 * @returns {Boolean}
 */
function useIsForMenu() {
    return React.useMemo(() => {
        return window.innerWidth <= WIDTH_FOR_MENU;
    }, [ window.innerWidth ]);
}

/**
 * Hook to determine if the current width is for the Details
 * @returns {Boolean}
 */
function useIsForDetails() {
    return React.useMemo(() => {
        return window.innerWidth <= WIDTH_FOR_DETAILS;
    }, [ window.innerWidth ]);
}





// The Public API
export default {
    WIDTH_FOR_MOBILE,
    WIDTH_FOR_MENU,
    WIDTH_FOR_DETAILS,

    useIsForMobile,
    useIsForMenu,
    useIsForDetails,
};
