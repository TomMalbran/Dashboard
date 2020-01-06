import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";



// Keyframes
const open = keyframes`
    from { transform: translateX(200px); opacity: 0; }
    to   { transform: translateX(0px);   opacity: 1; }
`;
const close = keyframes`
    from { transform: translateX(0);     opacity: 1; }
    to   { transform: translateX(200px); opacity: 0; }
`;

// Styles
const Div = Styled.div.attrs(({ open }) => ({ open }))`
    display: ${(props) => props.open ? "block" : "none"};
    position: absolute;
    top: 20px;
    right: 20px;
    overflow: hidden;
    max-width: calc(100% - 32px);
    z-index: var(--z-result);
`;

const Content = Styled.div.attrs(({ closing }) => ({ closing }))`
    position: relative;
    padding: 12px 40px 12px 24px;
    color: white;
    font-weight: 400;
    border-radius: var(--border-radius);
    z-index: 1000;
    transform: translateX(200px);
    opacity: 0;
    animation: ${(props) => props.closing ? css`${close} 0.3s` : css`${open} 0.1s`};
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    margin: 4px;

    &.result-success {
        background-color: var(--success-color);
    }
    &.result-error {
        background-color: var(--error-color);
    }
    &.result-warning {
        background-color: var(--warning-color);
    }

    .result-close {
        position: absolute;
        top: calc(50% - 10px);
        right: 16px;
        font-weight: 400;
        font-size: 18px;
        color: white;
        transition: all 0.5s;
        cursor: pointer;
    }
    .result-close:hover {
        color: var(--black-color);
        text-decoration: none;
    }
`;



/**
 * The Result Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Result(props) {
    const { open, variant, message, onClose } = props;

    // The State
    const [ timer,   setTimer   ] = React.useState(null);
    const [ closing, setClosing ] = React.useState(false);

    // The Close Function
    const closeResult = () => {
        if (closing) {
            return;
        }
        if (timer) {
            window.clearTimeout(timer);
        }
        setTimeout(null);
        setClosing(true);
        window.setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    };

    // Set the Initial Timeout
    React.useEffect(() => {
        if (open) {
            if (timer) {
                window.clearTimeout(timer);
            }
            const timeout = window.setTimeout(closeResult, 5000);
            setTimer(timeout);
        }
    });


    return <Div className="result" open={open}>
        <Content className={`result-${variant}`} closing={closing}>
            {NLS.get(message)}
            <Icon
                variant="close"
                className="result-close"
                onClick={closeResult}
            />
        </Content>
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Result.propTypes = {
    open    : PropTypes.bool.isRequired,
    variant : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired,
    onClose : PropTypes.func.isRequired,
};

export default Result;
