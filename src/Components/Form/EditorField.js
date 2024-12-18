// spell-checker: disable
import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";
import { Editor }           from "@tinymce/tinymce-react";

// Core
import MediaType            from "../../Core/MediaType";

// Components
import EditorStyles         from "./EditorStyles";
import InputError           from "../Input/InputError";



// Styles
const Container = Styled.div.attrs(({ maxHeight }) => ({ maxHeight }))`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    ${(props) => props.maxHeight && `max-height: ${props.maxHeight}px;`}
`;



/**
 * The Editor Field
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function EditorField(props) {
    const {
        isHidden, name, value, error, height, maxHeight, language,
        clientID, contentStyle, menubar, menu,
        onChange, onMedia, onSetup,
    } = props;


    // The Current State
    const [ firstChange, setFirstChange ] = React.useState(true);


    // Handles the Editor Change
    const handleChange = (newValue) => {
        if (firstChange) {
            setFirstChange(false);
            if (value !== newValue) {
                onChange(name, newValue);
            }
            return;
        }
        onChange(name, newValue);
    };


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container
        className={error ? "editorfield-error" : ""}
        maxHeight={maxHeight}
    >
        <EditorStyles />
        <Editor
            tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
            onEditorChange={handleChange}
            value={value}
            init={{
                document_base_url    : `${process.env.REACT_APP_FILES}${clientID}/`,
                height               : height,
                menu                 : menu,
                language             : language,
                resize               : false,
                statusbar            : false,
                convert_urls         : false,
                menubar              : `edit insert view format table tools ${menubar}`,
                toolbar              : `
                    undo redo | blocks |
                    bold italic forecolor |
                    alignleft aligncenter alignright |
                    bullist numlist outdent indent |
                    image link removeformat fullscreen
                `,
                plugins              : [
                    "advlist", "autolink", "lists", "link", "image", "media", "charmap",
                    "anchor", "searchreplace", "visualblocks", "code",
                    "insertdatetime", "media", "table", "wordcount", "fullscreen", "preview",
                ],
                content_style        : `
                    body { font-family:Inter,Lato,Helvetica,Arial,sans-serif; font-size:14px; max-width: 800px; padding: 0 24px; margin: 0 auto; }
                    ${contentStyle}
                `,
                file_picker_callback : (callback, value, meta) => {
                    if (meta.fileType === "image") {
                        onMedia(MediaType.IMAGE, callback);
                    } else if (meta.fileType === "media") {
                        onMedia(MediaType.MEDIA, callback);
                    } else {
                        onMedia(MediaType.ANY, callback);
                    }
                },
                setup                : (editor) => {
                    if (onSetup) {
                        onSetup(editor);
                    }
                },
            }}
        />
        <InputError error={error} />
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
EditorField.propTypes = {
    isHidden     : PropTypes.bool,
    name         : PropTypes.string.isRequired,
    value        : PropTypes.string,
    error        : PropTypes.string,
    height       : PropTypes.number,
    maxHeight    : PropTypes.number,
    language     : PropTypes.string,
    clientID     : PropTypes.number,
    contentStyle : PropTypes.string,
    menubar      : PropTypes.string,
    menu         : PropTypes.object,
    onChange     : PropTypes.func.isRequired,
    onMedia      : PropTypes.func.isRequired,
    onSetup      : PropTypes.func,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
EditorField.defaultProps = {
    isHidden     : false,
    value        : "",
    height       : 600,
    language     : "es",
    clientID     : 0,
    contentStyle : "",
    menubar      : "",
};

export default EditorField;
