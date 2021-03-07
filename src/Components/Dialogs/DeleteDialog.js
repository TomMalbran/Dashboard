import React                from "react";
import PropTypes            from "prop-types";

// Components
import ConfirmDialog        from "./ConfirmDialog";



/**
 * The Delete Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DeleteDialog(props) {
    const { open, title, message, content, onSubmit, onClose } = props;

    return <ConfirmDialog
        open={open}
        icon="delete"
        title={title}
        message={message}
        content={content}
        primary="GENERAL_DELETE"
        onSubmit={onSubmit}
        onClose={onClose}
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DeleteDialog.propTypes = {
    open     : PropTypes.bool.isRequired,
    title    : PropTypes.string.isRequired,
    message  : PropTypes.string.isRequired,
    content  : PropTypes.string,
    onSubmit : PropTypes.func.isRequired,
    onClose  : PropTypes.func.isRequired,
};

export default DeleteDialog;
