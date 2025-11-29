import React                from "react";



/**
 * The width for Mobile
 * @constant {number}
 */
const WIDTH_FOR_MOBILE = 700;

/**
 * The width to hide the Menu
 * @constant {number}
 */
const WIDTH_FOR_MENU = 1000;

/**
 * The width to hide the Details
 * @constant {number}
 */
const WIDTH_FOR_DETAILS = 1200;

/**
 * The width to hide the Details
 * @constant {number}
 */
const WIDTH_FOR_WIDE_DETAILS = 1600;



/**
 * Hook to determine if the current width is for the Mobile
 * @returns {boolean}
 */
function useIsForMobile() {
    return React.useMemo(() => {
        return window.innerWidth <= WIDTH_FOR_MOBILE;
    }, [ window.innerWidth ]);
}

/**
 * Hook to determine if the current width is for the Menu
 * @returns {boolean}
 */
function useIsForMenu() {
    return React.useMemo(() => {
        return window.innerWidth <= WIDTH_FOR_MENU;
    }, [ window.innerWidth ]);
}

/**
 * Hook to determine if the current width is for the Details
 * @returns {boolean}
 */
function useIsForDetails() {
    return React.useMemo(() => {
        return window.innerWidth <= WIDTH_FOR_DETAILS;
    }, [ window.innerWidth ]);
}

/**
 * Hook to determine if the current width is for the Wide Details
 * @returns {boolean}
 */
function useIsForWideDetails() {
    return React.useMemo(() => {
        return window.innerWidth >= WIDTH_FOR_WIDE_DETAILS;
    }, [ window.innerWidth ]);
}




// The Public API
export default {
    WIDTH_FOR_MOBILE,
    WIDTH_FOR_MENU,
    WIDTH_FOR_DETAILS,
    WIDTH_FOR_WIDE_DETAILS,

    useIsForMobile,
    useIsForMenu,
    useIsForDetails,
    useIsForWideDetails,
};
