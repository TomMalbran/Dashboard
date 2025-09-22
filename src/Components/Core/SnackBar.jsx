import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Button               from "../Form/Button";
import IconLink             from "../Link/IconLink";



// Styles
const Container = Styled.div`
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    top: 8px;
    display: flex;
    align-items: center;
    gap: var(--main-gap);
    color: #fff;
    padding: 8px 8px 8px 16px;
    background-color: var(--black-color);
    border-radius: var(--border-radius-medium);
    white-space: nowrap;
    transform: translate(-50%);
    z-index: 2;
`;



/**
 * The Snack Bar
 * @param {object} props
 * @returns {React.ReactElement}
 */
function SnackBar(props) {
    const {
        isHidden, message, buttonText,
        autoClose, onAccept, onClose,
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
    return <Container>
        {NLS.get(message)}
        <Button
            isHidden={!showAccept}
            variant="primary"
            message={buttonText}
            onClick={handleAccept}
            isSmall
        />
        <IconLink
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
    onAccept   : PropTypes.func,
    onClose    : PropTypes.func,
};

export default SnackBar;
