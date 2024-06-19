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
const Container = Styled(Backdrop)`
    --dialog-tabs: 0px;
    --dialog-height: calc(var(--full-height) - var(--dialog-spacing) * 2);
    --dialog-body: calc(var(--dialog-height) - var(--dialog-header) - var(--dialog-tabs) - var(--dialog-footer));

    padding: var(--dialog-spacing);
`;

const Content = Styled.dialog.attrs(({ width, isWide, isNarrow, hasTabs, isClosing }) => ({ width, isWide, isNarrow, hasTabs, isClosing }))`
    position: static;
    display: block;
    margin: 0;
    padding: 0;
    width: calc(100% - var(--dialog-spacing) * 2);
    max-width: 600px;
    min-height: 200px;
    max-height: calc(var(--full-height) - var(--dialog-spacing) * 2);
    border: none;
    border-radius: var(--dialog-radius);
    background-color: white;
    animation: ${(props) => props.isClosing ? css`${close}` : css`${open}`} 0.2s ease-out;
    animation-fill-mode: ${(props) => props.isClosing ? "forwards" : "none"};

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
            --dialog-radius: 0;

            width: 100%;
            height: var(--full-height);
            max-width: none;
            max-height: none;
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
        dontClose, onClose, aside, children,
    } = props;


    // The References
    const contentRef   = React.useRef(null);
    const savedHandler = React.useRef(null);

    // The Current State
    const [ level,     setLevel   ] = React.useState(0);
    const [ opened,    setOpened  ] = React.useState(false);
    const [ isClosing, setClosing ] = React.useState(false);


    // Handles the Dialog Close
    const handleClose = () => {
        if (dontClose || isClosing || dialogLevel !== level) {
            return;
        }

        setOpened(false);
        setClosing(true);
        window.setTimeout(() => {
            setClosing(false);
            onClose();
        }, 200);
    };

    // Handle the Key
    const handleKey = (e) => {
        if (!open || isClosing || dialogLevel !== level) {
            return;
        }

        if (!noTab && e.which === KeyCode.DOM_VK_TAB) {
            if (e.target.closest(".dialog") === null) {
                const focusable = contentRef.current.querySelectorAll("input, a, button");
                const backward  = e.shiftKey;
                const target    = backward ? focusable[focusable.length - 1] : focusable[0];
                target.focus();
                e.preventDefault();
            }
        } else if (e.which === KeyCode.DOM_VK_ESCAPE) {
            handleClose();
            e.preventDefault();
        }
    };

    // Handles the Mouse Down
    const handleMouseDown = (e) => {
        e.stopPropagation();
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
            setLevel(dialogLevel);
            window.addEventListener("keyup", eventListener);
            window.setTimeout(() => {
                setOpened(true);
            }, 200);
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


    // Variables
    const showAside = open && !isClosing && !isLoading;
    const items     = [];
    let   hasTabs   = false;

    for (const [ key, child ] of Utils.getChildren(children)) {
        if (child.type === TabList) {
            hasTabs = true;
        }
        items.push(React.cloneElement(child, {
            key, isLoading, isNarrow, dontClose, onClose : handleClose,
        }));
    }


    // Do the Render
    return <Container
        open={open}
        contentRef={contentRef}
        isClosing={isClosing}
        onClose={handleClose}
    >
        <Content
            ref={contentRef}
            className={`dialog ${className}`}
            onMouseDown={handleMouseDown}
            width={width}
            isWide={isWide}
            isNarrow={isNarrow}
            hasTabs={hasTabs}
            isClosing={isClosing}
            open
        >
            {opened && items}
        </Content>

        {showAside && <div onMouseDown={handleMouseDown}>
            {aside}
        </div>}
    </Container>;
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
    aside     : PropTypes.any,
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
