import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import Dashboard            from "../../Core/Dashboard";
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";

// Components
import Backdrop             from "../Common/Backdrop";
import TabList              from "../Tab/TabList";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";



// Animations
const open = keyframes`
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1);   }
`;
const close = keyframes`
    from { opacity: 1; transform: scale(1);   }
    to   { opacity: 0; transform: scale(0.8); }
`;

// Styles
const Container = Styled.dialog.attrs(({ isWide, isNarrow, hasTabs, isClosing }) => ({ isWide, isNarrow, hasTabs, isClosing }))`
    --dialog-header  : 55px;
    --dialog-tabs    : 0px;
    --dialog-footer  : 55px;
    --dialog-spacing : 32px;
    --dialog-body    : calc(100vh - var(--dialog-spacing) * 2 - var(--dialog-header) - var(--dialog-tabs) - var(--dialog-footer));

    position: static;
    margin: var(--dialog-spacing);
    padding: 0;
    width: calc(100% - var(--dialog-spacing) * 2);
    max-height: calc(100vh - var(--dialog-spacing) * 2);
    max-width: 600px;
    overflow: auto;
    border: none;
    border-radius: var(--border-radius);
    background-color: white;
    animation: ${(props) => props.isClosing ? css`${close} 0.3s ease-out` : css`${open} 0.2s ease-out`};

    &[open]:not(:focus-within) {
        background-color: rgb(255, 255, 254);
        transition: background-color 0.01s;
    }
    
    ${(props) => props.isWide   && "max-width: 1000px;"}
    ${(props) => props.isNarrow && "max-width: 400px;"}
    ${(props) => props.hasTabs  && "--dialog-tabs: var(--tabs-dialog);"}

    @media (max-width: 500px) {
        --dialog-spacing: 0;
        width: 100%;
        height: 100vh;
        max-width: none;
        max-height: none;
    }
`;



/**
 * The Dialog Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Dialog(props) {
    const { onClose } = props;
    const { open, className, isLoading, isWide, isNarrow, fullHeight, noTab, children } = props;
    const items   = [];
    let   hasTabs = false;
    
    if (!open) {
        return <React.Fragment />;
    }
    
    const [ level,   setLevel   ] = React.useState(0);
    const [ closing, setClosing ] = React.useState(false);
    const contentRef = React.useRef();

    // Handle the Level and key event whrn open changes
    React.useEffect(() => {
        if (open) {
            setLevel(Dashboard.openDialog());
            window.addEventListener("keyup", handleTab);
        } else {
            setLevel(Dashboard.closeDialog());
            window.removeEventListener("keyup", handleTab);
        }
        return () => window.removeEventListener("keyup", handleTab);
    }, [ open ]);

    // Handles the Dialog Close
    const handleClose = () => {
        if (closing || !Dashboard.isDialogAt(level)) {
            return;
        }
        setClosing(true);
        window.setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    };

    // Handle the Tab
    const handleTab = (e) => {
        if (!open || closing || !Dashboard.isDialogAt(level)) {
            return;
        }

        const node = contentRef.current;
        if (!noTab && e.which === KeyCode.DOM_VK_TAB) {
            // @ts-ignore
            if (e.target.closest(".dialog-container") === null) {
                const focusables = node.querySelectorAll("input, a");
                const backward   = e.shiftKey;
                const target     = backward ? focusables[focusables.length - 1] : focusables[0];
                target.focus();
                e.preventDefault();
            }
        } else if (e.which === KeyCode.DOM_VK_ESCAPE) {
            handleClose();
            e.preventDefault();
        }
    };


    for (const [ key, child ] of Utils.toEntries(children)) {
        if (child.type === TabList) {
            hasTabs = true;
        }
        items.push(React.cloneElement(child, {
            key, onClose, isLoading, fullHeight,
            closeDialog : handleClose,
        }));
    }
        

    return <Backdrop
        contentRef={contentRef}
        open={open}
        closing={closing}
        onClose={handleClose}
    >
        <Container
            className={className}
            ref={contentRef}
            isWide={isWide}
            isNarrow={isNarrow}
            hasTabs={hasTabs}
            isClosing={closing}
            open
        >
            {items}
        </Container>
    </Backdrop>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Dialog.propTypes = {
    open       : PropTypes.bool,
    className  : PropTypes.string,
    onClose    : PropTypes.func.isRequired,
    isWide     : PropTypes.bool,
    isNarrow   : PropTypes.bool,
    fullHeight : PropTypes.bool,
    noTab      : PropTypes.bool,
    isLoading  : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Dialog.defaultProps = {
    className  : "",
    open       : false,
    isWide     : false,
    isNarrow   : false,
    fullHeight : false,
    noTab      : false,
    isLoading  : false,
};

export default Dialog;
