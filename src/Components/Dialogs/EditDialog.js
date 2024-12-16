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
        open, title, icon, message, className, isLoading,
        width, isNarrow, isWide, minHeight, fullHeight,
        noOverflow, withSpacing, bigSpacing,
        error, isDisabled, dontClose, noAutoFocus,
        hidePrimary, primary, primaryVariant, onSubmit,
        cancel, cancelVariant, onClose, onCancel,
        secondary, onSecondary, tertiary, onTertiary,
        aside, children,
    } = props;


    // Do the Render
    return <Dialog
        open={open}
        onClose={onClose}
        width={width}
        isNarrow={isNarrow}
        isWide={isWide}
        isLoading={isLoading}
        dontClose={dontClose}
        aside={aside}
    >
        <DialogHeader message={title} icon={icon} />
        <DialogBody
            className={className}
            minHeight={minHeight}
            fullHeight={fullHeight}
            noOverflow={noOverflow}
            withSpacing={withSpacing}
            bigSpacing={bigSpacing}
        >
            <Message variant="h3" message={message} />
            <Form
                error={error}
                onSubmit={onSubmit}
                noAutoFocus={noAutoFocus}
            >
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
    noAutoFocus    : PropTypes.bool,
    width          : PropTypes.number,
    isNarrow       : PropTypes.bool,
    isWide         : PropTypes.bool,
    minHeight      : PropTypes.number,
    fullHeight     : PropTypes.bool,
    noOverflow     : PropTypes.bool,
    withSpacing    : PropTypes.bool,
    bigSpacing     : PropTypes.bool,
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
    aside          : PropTypes.any,
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
    noAutoFocus : false,
    isNarrow    : false,
    isWide      : false,
    fullHeight  : false,
    noOverflow  : false,
    withSpacing : true,
    bigSpacing  : false,
    hidePrimary : false,
};

export default EditDialog;
