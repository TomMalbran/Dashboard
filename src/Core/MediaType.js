// Media Types
const ANY   = "";
const MEDIA = "media";
const IMAGE = "image";
const VIDEO = "video";
const PDF   = "pdf";
const FILE  = "file";



/**
 * Returns true if the type is only for Images
 * @param {String} mediaType
 * @returns {Boolean}
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
    PDF,
    FILE,

    onlyImages,
};
