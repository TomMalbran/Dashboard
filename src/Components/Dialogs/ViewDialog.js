import React                from "react";
import PropTypes            from "prop-types";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogFooter         from "../Dialog/DialogFooter";



/**
 * The View Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ViewDialog(props) {
    const {
        open, title, icon, className,
        isLoading, width, isWide, isNarrow, fullHeight, withSpacing,
        secondary, onSecondary, cancel, onClose, children,
    } = props;

    return <Dialog
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        width={width}
        isWide={isWide}
        isNarrow={isNarrow}
    >
        <DialogHeader message={title} icon={icon} />
        <DialogBody
            className={className}
            fullHeight={fullHeight}
            withSpacing={withSpacing}
        >
            {children}
        </DialogBody>
        <DialogFooter
            secondary={secondary}
            onSecondary={onSecondary}
            cancel={cancel}
        />
    </Dialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ViewDialog.propTypes = {
    open        : PropTypes.bool.isRequired,
    title       : PropTypes.string.isRequired,
    icon        : PropTypes.string,
    className   : PropTypes.string,
    isLoading   : PropTypes.bool,
    width       : PropTypes.number,
    isWide      : PropTypes.bool,
    isNarrow    : PropTypes.bool,
    fullHeight  : PropTypes.bool,
    withSpacing : PropTypes.bool,
    secondary   : PropTypes.string,
    onSecondary : PropTypes.func,
    cancel      : PropTypes.string,
    onClose     : PropTypes.func.isRequired,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
ViewDialog.defaultProps = {
    className   : "",
    cancel      : "GENERAL_CLOSE",
    isLoading   : false,
    isWide      : false,
    isNarrow    : false,
    fullHeight  : false,
    withSpacing : false,
};

export default ViewDialog;
