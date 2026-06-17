import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import DragDrop             from "./DragDrop";
import Button               from "../Form/Button";
import PromptDialog         from "../Dialogs/PromptDialog";



// Styles
const Container = Styled.div`
    background-color: var(--dropzone-background);
    border-radius: var(--border-radius);
    text-align: center;
    padding: var(--main-padding);
    color: var(--black-color);
`;

const Buttons = Styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
`;

const Title = Styled.h3`
    margin: 0;
`;

const Text = Styled.p`
    margin: 8px 0;
`;

const Input = Styled.input`
    display: none;
`;



/**
 * The Drop Zone Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function DropZone(props) {
    const {
        isHidden, onlyImages, maxSize,
        onDrop, onError, onUrl,
    } = props;


    // The References
    const inputRef = React.useRef(null);

    // The Current State
    const [ uploading,  setUploading  ] = React.useState(false);
    const [ showUpload, setShowUpload ] = React.useState(false);
    const [ error,      setError      ] = React.useState("");


    // Handles the Click
    const handleClick = (e) => {
        Utils.triggerClick(inputRef);
    };

    // Handles the Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const node   = inputRef.current;
        const files  = e.target.files;
        const result = [];

        for (const file of files) {
            if (Utils.isValidFile(file, onlyImages, maxSize)) {
                result.push(file);
            }
        }

        if (result.length) {
            onDrop(result);
        }
        if (result.length !== files.length && onError) {
            onError(files.length - result.length);
        }
        if (node) {
            node.value = "";
        }
    };

    // Handles the Upload Url
    const handleUploadUrl = async (fileUrl, fileName) => {
        if (!onUrl) {
            return;
        }

        setUploading(true);
        setError("");
        try {
            await onUrl(fileUrl, fileName);
            setShowUpload(false);
        } catch (/** @type {object} */ errors) {
            setError(errors.form || errors.fileUrl);
        } finally {
            setUploading(false);
        }
    };

    // Handles the Upload Close
    const handleUploadClose = () => {
        setShowUpload(false);
        setError("");
    };


    // Do the Render
    const prefix = onlyImages ? "DROPZONE_IMAGES_" : "DROPZONE_FILES_";
    if (isHidden) {
        return <React.Fragment />;
    }
    return <>
        <DragDrop
            isHidden={isHidden}
            onlyImages={onlyImages}
            maxSize={maxSize}
            onDrop={onDrop}
            onError={onError}
        />

        <Container className="dropzone-upload">
            <Title>{NLS.get(`${prefix}TITLE`)}</Title>
            <Text>{NLS.get("DROPZONE_OR")}</Text>
            <Buttons>
                <Button
                    variant="outlined"
                    icon="upload"
                    message={`${prefix}BUTTON`}
                    onClick={handleClick}
                    inLowerCase
                />
                <Button
                    isHidden={!onUrl}
                    variant="outlined"
                    icon="link"
                    message="MEDIA_UPLOAD_URL_TITLE"
                    onClick={() => setShowUpload(true)}
                    inLowerCase
                />
            </Buttons>
            <Input
                ref={inputRef}
                type="file"
                accept={onlyImages ? "image/*" : ""}
                className="dropzone-input"
                onChange={handleSubmit}
                multiple
            />
        </Container>

        <PromptDialog
            open={showUpload}
            isLoading={uploading}
            icon="link"
            title="MEDIA_UPLOAD_URL_TITLE"
            inputLabel="MEDIA_UPLOAD_URL"
            secInputLabel="MEDIA_UPLOAD_URL_NAME"
            secHelperText="MEDIA_UPLOAD_URL_NAME_TIP"
            onSubmit={handleUploadUrl}
            onClose={handleUploadClose}
            error={error}
            showError
            isNarrow
        />
    </>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
DropZone.propTypes = {
    isHidden   : PropTypes.bool,
    onlyImages : PropTypes.bool,
    maxSize    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onDrop     : PropTypes.func.isRequired,
    onError    : PropTypes.func,
    onUrl      : PropTypes.func,
};

export default DropZone;
