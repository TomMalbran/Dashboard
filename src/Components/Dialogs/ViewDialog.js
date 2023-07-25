import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogFooter         from "../Dialog/DialogFooter";



// Styles
const Content = Styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--main-gap);
`;



/**
 * The View Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ViewDialog(props) {
    const {
        contentRef, open, title, icon, className,
        isLoading, width, isWide, isNarrow, fullHeight, lightHeader, withSpacing,
        hideFooter, secondary, onSecondary, tertiary, onTertiary,
        cancel, onClose, children,
    } = props;


    // Do the Render
    return <Dialog
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        width={width}
        isWide={isWide}
        isNarrow={isNarrow}
    >
        <DialogHeader
            message={title}
            icon={icon}
            lightHeader={lightHeader}
        />
        <DialogBody
            passedRef={contentRef}
            className={className}
            fullHeight={fullHeight}
            withSpacing={withSpacing}
            hideFooter={hideFooter}
        >
            <Content>{children}</Content>
        </DialogBody>
        <DialogFooter
            isHidden={hideFooter}
            secondary={secondary}
            onSecondary={onSecondary}
            tertiary={tertiary}
            onTertiary={onTertiary}
            cancel={cancel}
        />
    </Dialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ViewDialog.propTypes = {
    contentRef  : PropTypes.any,
    open        : PropTypes.bool.isRequired,
    title       : PropTypes.string.isRequired,
    icon        : PropTypes.string,
    className   : PropTypes.string,
    isLoading   : PropTypes.bool,
    width       : PropTypes.number,
    isWide      : PropTypes.bool,
    isNarrow    : PropTypes.bool,
    fullHeight  : PropTypes.bool,
    lightHeader : PropTypes.bool,
    withSpacing : PropTypes.bool,
    hideFooter  : PropTypes.bool,
    secondary   : PropTypes.string,
    tertiary    : PropTypes.string,
    onSecondary : PropTypes.func,
    onTertiary  : PropTypes.func,
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
    lightHeader : false,
    withSpacing : false,
    hideFooter  : false,
};

export default ViewDialog;
