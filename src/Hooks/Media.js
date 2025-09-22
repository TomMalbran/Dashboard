import React                from "react";

// Core & Utils
import MediaType            from "../Core/MediaType";



/**
 * The Media Hook
 * @typedef {object}           MediaType
 * @property {boolean}         showMedia
 * @property {string}          mediaType
 * @property {(...args: any[]) => any} handleMediaOpen
 * @property {(...args: any[]) => any} handleMediaSubmit
 * @property {(...args: any[]) => any} handleMediaClose
 * @returns {MediaType}
 */
function useMedia() {

    // The Current State
    const [ showMedia, setShowMedia ] = React.useState(false);
    const [ mediaType, setMediaType ] = React.useState(MediaType.ANY);
    const [ callback,  setCallback  ] = React.useState(null);


    // Handles the Media Open
    const handleMediaOpen = (mediaType, newCallback) => {
        setShowMedia(true);
        setMediaType(mediaType);
        setCallback(() => newCallback);
    };

    // Handles the Media Submit
    const handleMediaSubmit = (value) => {
        let file = value;
        if (file[0] === "/") {
            file = file.substring(1);
        }
        callback(file);
        setShowMedia(false);
        setCallback(null);
    };

    // Handles the Media Close
    const handleMediaClose = () => {
        setShowMedia(false);
        setCallback(null);
    };



    // The public API
    return {
        showMedia, mediaType,
        handleMediaOpen, handleMediaSubmit, handleMediaClose,
    };
}

export default useMedia;
