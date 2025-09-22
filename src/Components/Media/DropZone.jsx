import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import DragDrop             from "./DragDrop";
import Button               from "../Form/Button";



// Styles
const Container = Styled.div`
    background-color: var(--dropzone-background);
    border-radius: var(--border-radius);
    text-align: center;
    padding: var(--main-padding);
    color: var(--black-color);
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
    const { isHidden, onlyImages, maxSize, onDrop, onError } = props;


    // The References
    const inputRef = React.useRef(null);


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
        </Container>
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
};

export default DropZone;
