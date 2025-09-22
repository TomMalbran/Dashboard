// Media Types
const ANY   = "";
const MEDIA = "media";
const IMAGE = "image";
const VIDEO = "video";
const AUDIO = "audio";
const PDF   = "pdf";
const TEXT  = "text";
const FILE  = "file";



/**
 * Returns true if the type is only for Images
 * @param {string} mediaType
 * @returns {boolean}
 */
function onlyImages(mediaType) {
    return mediaType === IMAGE;
}



// The Public API
export default {
    ANY,
    MEDIA,
    IMAGE,
    VIDEO,
    AUDIO,
    PDF,
    TEXT,
    FILE,

    onlyImages,
};
