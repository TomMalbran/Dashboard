import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import Button               from "../Form/Button";



// Styles
const Drop = Styled.div.attrs(({ isOpen }) => ({ isOpen }))`
    display: ${(props)=> props.isOpen ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 32px;
    color: white;
    background-color: var(--drop-color);
    z-index: var(--z-dropzone);
`;

const Div = Styled.div`
    background-color: var(--lighter-gray);
    border-radius: var(--border-radius);
    text-align: center;
    padding: var(--main-padding);
`;
const H3 = Styled.h3`
    margin: 0;
`;
const P = Styled.p`
    margin: 8px 0;
`;
const Input = Styled.input`
    display: none;
`;



/**
 * The Drop Zone Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DropZone(props) {
    const {
        isHidden, open, onlyImages, maxSize,
        onStart, onDrop, onEnd, onError,
    } = props;


    // The References
    const containerRef = React.useRef(null);
    const inputRef     = React.useRef(null);


    // Returns true if there is a File
    const containsFiles = (e) => {
        if (e.dataTransfer.types) {
            for (const type of e.dataTransfer.types) {
                if (type === "Files") {
                    return true;
                }
            }
        }
        return false;
    };

    // Returns true if the Type is an Image
    const isValidType = (fileType) => {
        if (onlyImages) {
            const imageTypes = [ "image/png", "image/gif", "image/bmp", "image/jpg", "image/jpeg" ];
            return imageTypes.includes(fileType.toLowerCase());
        }
        return true;
    };

    // Returns true if the Type is an Image
    const isValidSize = (fileSize) => {
        if (maxSize) {
            const size = fileSize / (1024 * 1024);
            return size <= maxSize;
        }
        return true;
    };


    // Starts a Drop
    const startDrop = (e) => {
        if (containsFiles(e)) {
            onStart(Action.get("UPLOAD"));
        }
    };

    // Allows Dragging
    const allowDrag = (e) => {
        e.dataTransfer.dropEffect = "copy";
        e.preventDefault();
    };

    // Handles the Click
    const handleClick = (e) => {
        Utils.triggerClick(inputRef);
    };

    // Handles the Drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files      = [];
        let   totalFiles = 0;

        // Use DataTransferItemList interface to access the file(s)
        if (e.dataTransfer.items) {
            totalFiles = e.dataTransfer.items.length;
            for (const item of e.dataTransfer.items) {
                if (item.kind === "file" && isValidType(item.type) && isValidSize(item.size)) {
                    const file = item.getAsFile();
                    files.push(file);
                }
            }
        }

        // Use DataTransfer interface to access the file(s)
        if (!files.length) {
            totalFiles = e.dataTransfer.files.length;
            for (const file of e.dataTransfer.files) {
                if (isValidType(file.type) && isValidSize(file.size)) {
                    files.push(file);
                }
            }
        }

        if (files.length) {
            onDrop(files);
        }
        if (totalFiles !== files.length && onError) {
            onError(files.length - totalFiles);
        }
        onEnd();
    };

    // Handles the Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const node   = inputRef.current;
        const files  = e.target.files;
        const result = [];

        for (const file of files) {
            if (isValidType(file.type) && isValidSize(file.size)) {
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
        onEnd();
    };


    // Adds the Listeners
    React.useEffect(() => {
        window.addEventListener("dragenter", startDrop);
        if (containerRef.current) {
            const node = containerRef.current;
            node.addEventListener("dragenter", allowDrag);
            node.addEventListener("dragover",  allowDrag);
            node.addEventListener("dragleave", onEnd);
            node.addEventListener("drop",      handleDrop);
        }

        return () => {
            window.removeEventListener("dragenter", startDrop);
            if (containerRef.current) {
                const node = containerRef.current;
                node.removeEventListener("dragenter", allowDrag);
                node.removeEventListener("dragover",  allowDrag);
                node.removeEventListener("dragleave", onEnd);
                node.removeEventListener("drop",      handleDrop);
            }
        };
    });


    // Do the Render
    const prefix = onlyImages ? "DROPZONE_IMAGES_" : "DROPZONE_FILES_";
    if (isHidden) {
        return <React.Fragment />;
    }
    return <>
        <Drop ref={containerRef} isOpen={open}>
            {NLS.get(`${prefix}DROP`)}
        </Drop>
        <Div className="dropzone-upload">
            <H3>{NLS.get(`${prefix}TITLE`)}</H3>
            <P>{NLS.get("DROPZONE_OR")}</P>
            <Button
                variant="outlined"
                message={`${prefix}BUTTON`}
                onClick={handleClick}
            />
            <Input
                ref={inputRef}
                type="file"
                accept={onlyImages ? "image/*" : ""}
                className="dropzone-input"
                onChange={handleSubmit}
                multiple
            />
        </Div>
    </>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DropZone.propTypes = {
    isHidden   : PropTypes.bool,
    open       : PropTypes.bool.isRequired,
    onlyImages : PropTypes.bool,
    maxSize    : PropTypes.number,
    onStart    : PropTypes.func.isRequired,
    onEnd      : PropTypes.func.isRequired,
    onDrop     : PropTypes.func.isRequired,
    onError    : PropTypes.func,
};

export default DropZone;
