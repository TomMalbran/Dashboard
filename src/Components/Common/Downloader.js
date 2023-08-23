import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Downloader Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Downloader(props) {
    const { download, source, onLoad } = props;

    const frameRef = React.useRef(null);


    // The Current State
    const [ count, setCount ] = React.useState(0);


    // Call the Load
    React.useEffect(() => {
        if (download) {
            window.setTimeout(onComplete, 100);
        }
    }, [ download ]);

    // Test the Complete
    const onComplete = () => {
        if (!frameRef.current) {
            return;
        }
        const frame    = frameRef.current;
        const document = frame.contentDocument || frame.contentWindow.document;

        if (document.readyState !== "complete") {
            window.setTimeout(onComplete, 100);
        } else {
            window.setTimeout(() => {
                onLoad();
                setCount(count + 1);
            }, 10000);
        }
    };


    // Do the Render
    if (!download) {
        return <React.Fragment />;
    }
    return <iframe
        ref={frameRef}
        title="Downloader"
        name="downloader"
        src={`${source}&rdm=${count}`}
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
