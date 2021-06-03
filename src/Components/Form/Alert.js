import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Outcome }          from "../../Core/Variants";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div.attrs(({ isOpen, isClosing, height }) => ({ isOpen, isClosing, height }))`
    display: ${(props) => props.isOpen ? "block" : "none"}
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 0 16px 0;
    transition: all 0.2s linear;

    ${(props) => !!props.height  && `max-height: ${props.height}px`}
    ${(props) => props.isClosing && "max-height: 0 !important;"}
`;

const Content = Styled.div.attrs(({ variant, isClosing }) => ({ variant, isClosing }))`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px 8px 16px;
    color: white;
    font-weight: 400;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.5s;

    .icon {
        margin-left: 8px;
        cursor: pointer;
    }

    ${(props) => props.isClosing && "transform: translateY(-50px);"}

    ${(props) => props.variant === Outcome.SUCCESS && "background-color: var(--success-color);"}
    ${(props) => props.variant === Outcome.WARNING && "background-color: var(--warning-color);"}
    ${(props) => props.variant === Outcome.ERROR   && "background-color: var(--error-color);"}
`;



/**
 * The Alert Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Alert(props) {
    const { variant, message, onClose } = props;

    if (!message) {
        return <React.Fragment />;
    }

    const [ open,   setOpen   ] = React.useState(true);
    const [ timer,  setTimer  ] = React.useState(null);
    const [ height, setHeight ] = React.useState(0);

    const alertRef  = React.useRef();
    const isClosing = Boolean(timer);

    // Sets the Alert Height
    React.useEffect(() => {
        const bounds = Utils.getBounds(alertRef);
        setHeight(bounds.height);
    }, [ message ]);

    // Handles the Close
    const handleClose = () => {
        if (timer) {
            window.clearTimeout(timer);
        }
        setTimer(window.setTimeout(() => {
            setOpen(false);
            setTimer(null);
            if (onClose) {
                onClose();
            }
        }, 200));
    };


    return <Div
        className="alert"
        isOpen={open}
        isClosing={isClosing}
        height={height}
        ref={alertRef}
    >
        <Content variant={variant} isClosing={isClosing}>
            {NLS.get(message)}
            <Icon
                icon="close"
                onClick={handleClose}
            />
        </Content>
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Alert.propTypes = {
    variant : PropTypes.string.isRequired,
    message : PropTypes.string,
    onClose : PropTypes.func,
};

export default Alert;
