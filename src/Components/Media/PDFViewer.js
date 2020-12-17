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
    const { source, currentPage, onLoad } = props;
    const [ isMounted, setMounted ] = React.useState(false);

    if (!source) {
        return <React.Fragment />;
    }

    // Handles the Loaded Event
    const handleLoaded = (data) => {
        if (isMounted && onLoad) {
            onLoad(data.numPages);
        }
    };

    // Handles the Mounted state
    React.useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    });


    return <Document
        file={source}
        onLoadSuccess={handleLoaded}
        loading={<CircularLoader withSpacing />}
    >
        <Page pageNumber={currentPage} width={800} />
    </Document>;
}
    
/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PDFViewer.propTypes = {
    source      : PropTypes.string,
    currentPage : PropTypes.number,
    onLoad      : PropTypes.func,
};

export default PDFViewer;
