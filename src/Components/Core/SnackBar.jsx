import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Button               from "../Form/Button";
import IconLink             from "../Link/IconLink";
import Html                 from "../Common/Html";



// Styles
const Container = Styled.div.attrs(({ zIndex }) => ({ zIndex }))`
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    top: 8px;
    width: max-content;
    max-width: 600px;
    display: grid;
    grid-template-areas: "message button close";
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: var(--main-gap);
    padding: 8px 8px 8px 16px;
    color: #fff;
    background-color: var(--black-color);
    border-radius: var(--border-radius-medium);
    transform: translate(-50%);
    z-index: ${(props) => props.zIndex || 2};

    @media (max-width: 616px) {
        max-width: 96vw;
    }
    @media (max-width: 400px) {
        grid-template-areas: "message close" "button close";
        grid-template-columns: 1fr auto;
    }
`;

const Content = Styled(Html)`
    grid-area: message;
`;

const Accept = Styled(Button)`
    grid-area: button;
`;

const Close = Styled(IconLink)`
    grid-area: close;
`;



/**
 * The Snack Bar
 * @param {object} props
 * @returns {React.ReactElement}
 */
function SnackBar(props) {
    const {
        isHidden, message, buttonText,
        autoClose, zIndex, onAccept, onClose,
    } = props;

    // The References
    const timeoutRef = React.useRef(null);

    // The Current State
    const [ isVisible, setIsVisible ] = React.useState(false);


    // Show the Snack Bar
    React.useEffect(() => {
        if (!isHidden && message) {
            showBar();
        } else if (isHidden && isVisible) {
            hideBar();
        }
    }, [ isHidden, message ]);

    // Remove the Timeout
    React.useEffect(() => {
        return () => {
            window.clearTimeout(timeoutRef.current);
        };
    }, []);


    // Shows the Snack Bar
    const showBar = () => {
        setIsVisible(true);
        if (autoClose) {
            timeoutRef.current = window.setTimeout(() => {
                setIsVisible(false);
            }, autoClose * 60 * 1000);
        }
    };

    // Hides the Snack Bar
    const hideBar = () => {
        setIsVisible(false);
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }
    };

    // Handles the Accept
    const handleAccept = async () => {
        if (onAccept) {
            onAccept();
        }
        hideBar();
    };

    // Handles the Close
    const handleClose = async () => {
        if (onClose) {
            onClose();
        }
        hideBar();
    };


    // Do the Render
    const showAccept = Boolean(buttonText && onAccept);

    if (!isVisible) {
        return <React.Fragment />;
    }
    return <Container zIndex={zIndex}>
        <Content
            message={NLS.get(message)}
            addBreaks
            formatText
        />
        <Accept
            isHidden={!showAccept}
            variant="primary"
            message={buttonText}
            onClick={handleAccept}
            isSmall
        />
        <Close
            variant="white"
            icon="close"
            onClick={handleClose}
            isSmall
        />
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
SnackBar.propTypes = {
    isHidden   : PropTypes.bool,
    message    : PropTypes.string,
    buttonText : PropTypes.string,
    autoClose  : PropTypes.number,
    zIndex     : PropTypes.number,
    onAccept   : PropTypes.func,
    onClose    : PropTypes.func,
};

export default SnackBar;
