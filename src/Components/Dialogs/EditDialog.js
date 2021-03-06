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
        open, title, icon, message, className,
        isLoading, isNarrow, isWide, fullHeight, withSpacing,
        error, isDisabled, dontClose, hidePrimary, primary, cancel, onSubmit, onClose,
        secondary, onSecondary, children,
    } = props;

    return <Dialog
        open={open}
        onClose={onClose}
        isNarrow={isNarrow}
        isWide={isWide}
        isLoading={isLoading}
        dontClose={dontClose}
    >
        <DialogHeader message={title} icon={icon} />
        <DialogBody
            className={className}
            fullHeight={fullHeight}
            withSpacing={withSpacing}
        >
            <DialogMessage variant="h3" message={message} />
            <Form error={error} onSubmit={onSubmit}>
                {children}
            </Form>
        </DialogBody>
        <DialogFooter
            isDisabled={isLoading || isDisabled}
            primary={hidePrimary ? "" : primary}
            cancel={cancel}
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
    className   : PropTypes.string,
    message     : PropTypes.string,
    error       : PropTypes.string,
    dontClose   : PropTypes.bool,
    onClose     : PropTypes.func.isRequired,
    isLoading   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    isNarrow    : PropTypes.bool,
    isWide      : PropTypes.bool,
    fullHeight  : PropTypes.bool,
    withSpacing : PropTypes.bool,
    hidePrimary : PropTypes.bool,
    primary     : PropTypes.string,
    secondary   : PropTypes.string,
    cancel      : PropTypes.string,
    onSubmit    : PropTypes.func.isRequired,
    onSecondary : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
EditDialog.defaultProps = {
    className   : "",
    primary     : "GENERAL_SAVE",
    cancel      : "GENERAL_CANCEL",
    dontClose   : false,
    isLoading   : false,
    isDisabled  : false,
    isNarrow    : false,
    isWide      : false,
    fullHeight  : false,
    withSpacing : true,
    hidePrimary : false,
};

export default EditDialog;
