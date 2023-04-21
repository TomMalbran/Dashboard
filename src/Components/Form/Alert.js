import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Outcome }          from "../../Core/Variants";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";



// Styles
const Div = Styled.div.attrs(({ isOpen, isClosing, height }) => ({ isOpen, isClosing, height }))`
    display: ${(props) => props.isOpen ? "block" : "none"}
    box-sizing: border-box;
    overflow: hidden;
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
    transition: all 0.5s;

    & > div > .icon {
        margin-right: 8px;
    }
    & > .icon {
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
    const { isHidden, variant, message, onClose, noClose, children } = props;

    let content = children;
    if (message) {
        if (Array.isArray(message)) {
            content = NLS.format(message[0], ...message.slice(1));
        } else {
            content = NLS.get(message);
        }
    }

    // The State
    const [ open,   setOpen   ] = React.useState(true);
    const [ timer,  setTimer  ] = React.useState(null);
    const [ height, setHeight ] = React.useState(0);

    const alertRef  = React.useRef();
    const hasClose  = !noClose;
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


    if (isHidden || !content) {
        return <React.Fragment />;
    }
    return <Div
        className="alert"
        isOpen={open}
        isClosing={isClosing}
        height={height}
        ref={alertRef}
    >
        <Content variant={variant} isClosing={isClosing}>
            {!!message  && <Html>{content}</Html>}
            {!!children && <div>{children}</div>}
            {hasClose   && <Icon
                icon="close"
                onClick={handleClose}
            />}
        </Content>
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Alert.propTypes = {
    isHidden : PropTypes.bool,
    variant  : PropTypes.string.isRequired,
    onClose  : PropTypes.func,
    noClose  : PropTypes.bool,
    message  : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    children : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Alert.defaultProps = {
    isHidden : false,
    noClose  : false,
};

export default Alert;
