import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Downloader Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Downloader(props) {
    const { download, source, onLoad } = props;

    if (!download) {
        return <React.Fragment />;
    }
    React.useEffect(() => onLoad, [ source ]);

    return <iframe
        title="Downloader"
        name="downloader"
        src={`${source}&rdm=${new Date().getTime()}`}
        style={{ display : "none" }}
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Downloader.propTypes = {
    download : PropTypes.bool.isRequired,
    source   : PropTypes.string.isRequired,
    onLoad   : PropTypes.func.isRequired,
};

export default Downloader;
