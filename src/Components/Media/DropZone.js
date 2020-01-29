import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import Action               from "../../Core/Action";

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
    text-align: center;
    padding: 24px;
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
    const { open, onlyImages, onStart, onDrop, onEnd } = props;

    const containerRef = React.useRef();
    const inputRef     = React.useRef();


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
        const node = inputRef.current;
        if (node) {
            node.click();
        }
    };

    // Handles the Drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = [];

        // Use DataTransferItemList interface to access the file(s)
        if (e.dataTransfer.items) {
            for (const item of e.dataTransfer.items) {
                if (item.kind === "file" && isValidType(item.type)) {
                    const file = item.getAsFile();
                    files.push(file);
                }
            }
        // Use DataTransfer interface to access the file(s)
        } else {
            for (const file of e.dataTransfer.files) {
                if (isValidType(file.type)) {
                    files.push(file);
                }
            }
        }
        if (files.length) {
            onDrop(files);
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
            if (isValidType(file.type)) {
                result.push(file);
            }
        }
        if (result.length) {
            onDrop(result);
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


    const prefix = onlyImages ? "DROPZONE_IMAGES_" : "DROPZONE_FILES_";
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
    onStart    : PropTypes.func.isRequired,
    onEnd      : PropTypes.func.isRequired,
    onDrop     : PropTypes.func.isRequired,
    open       : PropTypes.bool.isRequired,
    onlyImages : PropTypes.bool,
};

export default DropZone;
