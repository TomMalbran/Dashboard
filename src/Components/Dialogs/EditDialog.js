import React                from "react";
import PropTypes            from "prop-types";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogMessage        from "../Dialog/DialogMessage";
import DialogFooter         from "../Dialog/DialogFooter";
import Form                 from "../Form/Form";



/**
 * The Edit Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function EditDialog(props) {
    const {
        open, title, icon, message, children,
        isLoading, isNarrow, isWide, withSpacing,
        error, isDisabled, primary, onSubmit, onClose,
        secondary, onSecondary,
    } = props;

    return <Dialog
        open={open}
        onClose={onClose}
        isNarrow={isNarrow}
        isWide={isWide}
        isLoading={isLoading}
    >
        <DialogHeader message={title} icon={icon} />
        <DialogBody withSpacing={withSpacing}>
            <DialogMessage variant="h3" message={message} />
            <Form error={error} onSubmit={onSubmit}>
                {children}
            </Form>
        </DialogBody>
        <DialogFooter
            isDisabled={isLoading || isDisabled}
            primary={primary || "GENERAL_SAVE"}
            onSubmit={onSubmit}
            secondary={secondary}
            onSecondary={onSecondary}
        />
    </Dialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
EditDialog.propTypes = {
    open        : PropTypes.bool.isRequired,
    title       : PropTypes.string.isRequired,
    icon        : PropTypes.string,
    message     : PropTypes.string,
    error       : PropTypes.string,
    primary     : PropTypes.string,
    secondary   : PropTypes.string,
    onSubmit    : PropTypes.func.isRequired,
    onSecondary : PropTypes.func,
    onClose     : PropTypes.func.isRequired,
    isLoading   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    isNarrow    : PropTypes.bool,
    isWide      : PropTypes.bool,
    withSpacing : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
EditDialog.defaultProps = {
    isLoading   : false,
    isDisabled  : false,
    isNarrow    : false,
    isWide      : false,
    withSpacing : true,
};

export default EditDialog;
