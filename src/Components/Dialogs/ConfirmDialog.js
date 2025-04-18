import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Dialog               from "../Dialog/Dialog";
import DialogHeader         from "../Dialog/DialogHeader";
import DialogBody           from "../Dialog/DialogBody";
import DialogFooter         from "../Dialog/DialogFooter";
import Html                 from "../Common/Html";



// Styles
const Content = Styled(Html)`
    margin: 0;
    color: var(--black-color);
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
`;



/**
 * The Confirm Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ConfirmDialog(props) {
    const {
        open, icon, title, message, content, isLoading, isWide,
        bigSpacing, primary, primaryVariant, onSubmit, onClose,
    } = props;


    // Variables
    const body = content ? NLS.format(message, content) : NLS.get(message);


    // Do the Render
    return <Dialog
        open={open}
        onClose={onClose}
        isLoading={isLoading}
        dontClose={isLoading}
        isNarrow={!isWide}
        width={isWide ? 500 : null}
    >
        <DialogHeader message={title} icon={icon} />
        <DialogBody bigSpacing={bigSpacing} withSpacing>
            <Content variant="h3">{body}</Content>
        </DialogBody>
        <DialogFooter
            primary={primary}
            primaryVariant={primaryVariant}
            onSubmit={onSubmit}
            isDisabled={isLoading}
        />
    </Dialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ConfirmDialog.propTypes = {
    open           : PropTypes.bool.isRequired,
    icon           : PropTypes.string.isRequired,
    title          : PropTypes.string.isRequired,
    message        : PropTypes.string.isRequired,
    content        : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    primary        : PropTypes.string,
    primaryVariant : PropTypes.string,
    isLoading      : PropTypes.bool,
    bigSpacing     : PropTypes.bool,
    isWide         : PropTypes.bool,
    onSubmit       : PropTypes.func.isRequired,
    onClose        : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
ConfirmDialog.defaultProps = {
    primary    : "GENERAL_ACCEPT",
    isLoading  : false,
    bigSpacing : true,
    isWide     : false,
};

export default ConfirmDialog;
