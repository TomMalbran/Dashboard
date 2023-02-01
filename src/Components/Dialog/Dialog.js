import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";

// Components
import Backdrop             from "../Common/Backdrop";
import TabList              from "../Tab/TabList";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";

// Module Variables
let dialogLevel = 0;



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
const Container = Styled.dialog.attrs(({ width, isWide, isNarrow, hasTabs, isClosing }) => ({ width, isWide, isNarrow, hasTabs, isClosing }))`
    --dialog-header  : 55px;
    --dialog-tabs    : 0px;
    --dialog-footer  : 55px;
    --dialog-spacing : 32px;
    --dialog-body    : calc(var(--full-height) - var(--dialog-spacing) * 2 - var(--dialog-header) - var(--dialog-tabs) - var(--dialog-footer));

    position: static;
    margin: var(--dialog-spacing);
    padding: 0;
    width: calc(100% - var(--dialog-spacing) * 2);
    max-height: calc(var(--full-height) - var(--dialog-spacing) * 2);
    max-width: 600px;
    border: none;
    border-radius: var(--border-radius);
    background-color: white;
    animation: ${(props) => props.isClosing ? css`${close} 0.3s ease-out` : css`${open} 0.2s ease-out`};

    &[open]:not(:focus-within) {
        background-color: rgb(255, 255, 254);
        transition: background-color 0.01s;
    }

    ${(props) => props.width    ?  `max-width: ${props.width}px;` : ""}
    ${(props) => props.isWide   && "max-width: 1000px;"}
    ${(props) => props.isNarrow && "max-width: 400px;"}
    ${(props) => props.hasTabs  && "--dialog-tabs: var(--tabs-dialog);"}

    @media (max-width: 500px) {
        ${(props) => props.isNarrow ? `
            width: 95vw;
            max-width: none;
        ` : `
            --dialog-spacing: 0;
            width: 100%;
            height: var(--full-height);
            max-width: none;
            max-height: none;
            border-radius: 0;
        `}
    }
`;



/**
 * The Dialog Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Dialog(props) {
    const {
        open, className, isLoading, width, isWide, isNarrow, noTab,
        dontClose, onClose, children,
    } = props;

    const [ level,   setLevel   ] = React.useState(0);
    const [ opened,  setOpened  ] = React.useState(false);
    const [ closing, setClosing ] = React.useState(false);

    const contentRef              = React.useRef();
    const savedHandler            = React.useRef();


    // Handles the Dialog Close
    const handleClose = () => {
        if (dontClose || closing || dialogLevel !== level) {
            return;
        }
        setClosing(true);
        window.setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    };

    // Handle the Key
    const handleKey = (e) => {
        if (!open || closing || dialogLevel !== level) {
            return;
        }
        const node = contentRef.current;
        if (!noTab && e.which === KeyCode.DOM_VK_TAB) {
            if (e.target.closest(".dialog") === null) {
                const focusables = node.querySelectorAll("input, a, button");
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


    // Update the Handler if the function changes
    React.useEffect(() => {
        // @ts-ignore
        savedHandler.current = handleKey;
    }, [ handleKey ]);

    // Handle the Level and Key event when open changes
    React.useEffect(() => {
        // @ts-ignore
        const eventListener = (e) => savedHandler.current(e);

        if (open) {
            dialogLevel += 1;
            setOpened(true);
            setLevel(dialogLevel);
            window.addEventListener("keyup", eventListener);
        } else if (opened) {
            dialogLevel -= 1;
            setOpened(false);
            setLevel(0);
            window.removeEventListener("keyup", eventListener);
        }
        return () => window.removeEventListener("keyup", eventListener);
    }, [ open ]);


    // No need to continue
    if (!open) {
        return <React.Fragment />;
    }

    const items   = [];
    let   hasTabs = false;
    for (const [ key, child ] of Utils.getChildren(children)) {
        if (child.type === TabList) {
            hasTabs = true;
        }
        items.push(React.cloneElement(child, {
            key, isLoading, isNarrow, dontClose, onClose : handleClose,
        }));
    }

    return <Backdrop
        contentRef={contentRef}
        open={open}
        closing={closing}
        onClose={handleClose}
    >
        <Container
            className={`dialog ${className}`}
            ref={contentRef}
            width={width}
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
    open      : PropTypes.bool,
    className : PropTypes.string,
    dontClose : PropTypes.bool,
    onClose   : PropTypes.func.isRequired,
    width     : PropTypes.number,
    isWide    : PropTypes.bool,
    isNarrow  : PropTypes.bool,
    noTab     : PropTypes.bool,
    isLoading : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Dialog.defaultProps = {
    className : "",
    open      : false,
    dontClose : false,
    isWide    : false,
    isNarrow  : false,
    noTab     : false,
    isLoading : false,
};

export default Dialog;
