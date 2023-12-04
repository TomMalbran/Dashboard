import React                from "react";
import PropTypes            from "prop-types";
import { Document, Page }   from "react-pdf";

// Components
import CircularLoader       from "../Loader/CircularLoader";



/**
 * The PDF Viewer Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PDFViewer(props) {
    const { source, currentPage, maxWidth, onLoad } = props;

    // The Current State
    const [ isMounted, setMounted ] = React.useState(false);

    // Handles the Mounted state
    React.useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Handles the Loaded Event
    const handleLoaded = (data) => {
        if (isMounted && onLoad) {
            onLoad(data.numPages);
        }
    };


    // Do the Render
    if (!source) {
        return <React.Fragment />;
    }
    return <Document
        file={source}
        onLoadSuccess={handleLoaded}
        loading={<CircularLoader withSpacing />}
    >
        <Page
            pageNumber={currentPage}
            width={maxWidth}
        />
    </Document>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PDFViewer.propTypes = {
    source      : PropTypes.string,
    currentPage : PropTypes.number,
    maxWidth    : PropTypes.number,
    onLoad      : PropTypes.func,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
PDFViewer.defaultProps = {
    currentPage : 1,
    maxWidth    : 800,
};

export default PDFViewer;
