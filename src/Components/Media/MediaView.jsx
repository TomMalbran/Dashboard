import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogFooter         from "../Dialog/DialogFooter";
import PDFViewer            from "./PDFViewer";
import PDFNavigation        from "./PDFNavigation";
import HyperLink            from "../Link/HyperLink";
import Button               from "../Form/Button";



// Styles
const Image = Styled.img`
    display: block;
    max-width: 100%;
    margin: 0 auto;
`;

const Iframe = Styled.iframe`
    width: 100%;
    height: 500px;
`;



/**
 * The Media View Dialog
 * @param {object} props
 * @returns {React.ReactElement}
 */
function MediaView(props) {
    const { elem, open, onClose } = props;

    const [ totalPages,  setTotalPages  ] = React.useState(0);
    const [ currentPage, setCurrentPage ] = React.useState(1);

    // Handles the PDF Load
    const handleLoad = (totalPages) => {
        setTotalPages(totalPages);
    };

    // Handles the PDF Page Change
    const handlePage = (currentPage) => {
        setCurrentPage(currentPage);
    };

    // Reset the current page on open
    React.useEffect(() => {
        setCurrentPage(1);
    }, [ open ]);


    const withSpacing = !elem.isPDF && !elem.isImage && !elem.isDocument;
    const canPreview  = elem.isPDF || elem.isImage || elem.isAudio || elem.isDocument;

    return <Dialog open={open} onClose={onClose} width={800}>
        <DialogHeader message={elem.name} icon="media" />
        <DialogBody withSpacing={withSpacing}>
            {elem.isPDF && <PDFViewer
                source={elem.source}
                currentPage={currentPage}
                onLoad={handleLoad}
            />}
            {elem.isAudio && <audio src={elem.source} controls />}
            {elem.isImage && <Image
                alt={elem.name}
                src={elem.source}
            />}
            {elem.isDocument && <Iframe
                title={elem.name}
                src={`https://docs.google.com/gview?url=${elem.source}&embedded=true`}
                frameBorder="0"
            />}
            {!canPreview && <HyperLink
                className="big-text"
                variant="primary"
                href={elem.path}
                target="blank"
                message={elem.name}
            />}
        </DialogBody>
        <DialogFooter cancel="GENERAL_CLOSE">
            {elem.isPDF && <PDFNavigation
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={handlePage}
            />}
            {canPreview && <Button
                variant="primary"
                href={elem.source}
                target="_blank"
                message="GENERAL_DOWNLOAD"
            />}
        </DialogFooter>
    </Dialog>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
MediaView.propTypes = {
    open    : PropTypes.bool.isRequired,
    elem    : PropTypes.object,
    onClose : PropTypes.func.isRequired,
};

export default MediaView;
