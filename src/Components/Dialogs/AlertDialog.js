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
 * The Alert Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AlertDialog(props) {
    const { open, icon, title, message, content, onClose, lightHeader } = props;

    const body = content ? NLS.format(message, content) : NLS.get(message);


    // Do the Render
    return <Dialog open={open} onClose={onClose} isNarrow>
        <DialogHeader
            message={title}
            icon={icon}
            lightHeader={lightHeader}
        />
        <DialogBody withSpacing>
            <Content variant="h3">
                {body}
            </Content>
        </DialogBody>
        <DialogFooter cancel="GENERAL_ACCEPT" />
    </Dialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AlertDialog.propTypes = {
    open        : PropTypes.bool.isRequired,
    icon        : PropTypes.string,
    title       : PropTypes.string.isRequired,
    message     : PropTypes.string,
    content     : PropTypes.string,
    lightHeader : PropTypes.bool,
    onClose     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
AlertDialog.defaultProps = {
    icon        : "view",
    message     : "",
    lightHeader : false,
};

export default AlertDialog;
