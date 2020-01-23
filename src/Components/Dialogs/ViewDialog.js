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
        isLoading, isNarrow, isWide, fullHeight, withSpacing,
        secondary, onSecondary, onClose, children,
    } = props;

    return <Dialog
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        isNarrow={isNarrow}
        isWide={isWide}
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
            cancel="GENERAL_CLOSE"
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
    isNarrow    : PropTypes.bool,
    isWide      : PropTypes.bool,
    fullHeight  : PropTypes.bool,
    withSpacing : PropTypes.bool,
    secondary   : PropTypes.string,
    onSecondary : PropTypes.func,
    onClose     : PropTypes.func.isRequired,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
ViewDialog.defaultProps = {
    className   : "",
    isLoading   : false,
    isNarrow    : false,
    isWide      : false,
    fullHeight  : false,
    withSpacing : false,
};

export default ViewDialog;
