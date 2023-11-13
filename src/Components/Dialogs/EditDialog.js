import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogMessage        from "../Dialog/DialogMessage";
import DialogFooter         from "../Dialog/DialogFooter";
import Form                 from "../Form/Form";



// Styles
const Message = Styled(DialogMessage)`
    margin-top: 0;
`;



/**
 * The Edit Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function EditDialog(props) {
    const {
        open, title, icon, message, className,
        isLoading, isNarrow, isWide, fullHeight,
        lightHeader, noOverflow, withSpacing,
        error, isDisabled, dontClose,
        hidePrimary, primary, primaryVariant, onSubmit,
        cancel, cancelVariant, onClose, onCancel,
        secondary, onSecondary, tertiary, onTertiary, children,
    } = props;


    // Do the Render
    return <Dialog
        open={open}
        onClose={onClose}
        isNarrow={isNarrow}
        isWide={isWide}
        isLoading={isLoading}
        dontClose={dontClose}
    >
        <DialogHeader
            message={title}
            icon={icon}
            lightHeader={lightHeader}
        />
        <DialogBody
            className={className}
            fullHeight={fullHeight}
            noOverflow={noOverflow}
            withSpacing={withSpacing}
        >
            <Message variant="h3" message={message} />
            <Form error={error} onSubmit={onSubmit}>
                {children}
            </Form>
        </DialogBody>
        <DialogFooter
            isDisabled={isLoading || isDisabled}
            primary={hidePrimary ? "" : primary}
            primaryVariant={primaryVariant}
            onSubmit={onSubmit}
            cancel={cancel}
            cancelVariant={cancelVariant}
            onCancel={onCancel}
            secondary={secondary}
            onSecondary={onSecondary}
            tertiary={tertiary}
            onTertiary={onTertiary}
        />
    </Dialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
EditDialog.propTypes = {
    open           : PropTypes.bool.isRequired,
    title          : PropTypes.string.isRequired,
    icon           : PropTypes.string,
    className      : PropTypes.string,
    message        : PropTypes.string,
    error          : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    dontClose      : PropTypes.bool,
    onClose        : PropTypes.func.isRequired,
    isLoading      : PropTypes.bool,
    isDisabled     : PropTypes.bool,
    isNarrow       : PropTypes.bool,
    isWide         : PropTypes.bool,
    fullHeight     : PropTypes.bool,
    lightHeader    : PropTypes.bool,
    noOverflow     : PropTypes.bool,
    withSpacing    : PropTypes.bool,
    hidePrimary    : PropTypes.bool,
    primary        : PropTypes.string,
    primaryVariant : PropTypes.string,
    onSubmit       : PropTypes.func.isRequired,
    cancel         : PropTypes.string,
    cancelVariant  : PropTypes.string,
    onCancel       : PropTypes.func,
    secondary      : PropTypes.string,
    onSecondary    : PropTypes.func,
    tertiary       : PropTypes.string,
    onTertiary     : PropTypes.func,
    children       : PropTypes.any,
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
    lightHeader : false,
    noOverflow  : false,
    withSpacing : true,
    hidePrimary : false,
};

export default EditDialog;
