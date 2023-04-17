import React                from "react";

// Core
import { Outcome }          from "../../Core/Variants";
import NLS                  from "../../Core/NLS";
import Store                from "../../Core/Store";

// Components
import Icon                 from "../Common/Icon";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";



// Animations
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

const Content = Styled.div.attrs(({ variant, isClosing }) => ({ variant, isClosing }))`
    position: relative;
    padding: 12px 40px 12px 24px;
    color: white;
    font-weight: 400;
    border-radius: var(--border-radius);
    z-index: 1000;
    transform: translateX(200px);
    opacity: 0;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    margin: 4px;

    ${(props) => props.isClosing ?
        css`animation: ${close} 0.3s 1 linear both;` :
        css`animation: ${open} 0.1s 1 linear both;`};

    ${(props) => props.variant === Outcome.SUCCESS && `
        background-color: var(--success-color);
    `}
    ${(props) => props.variant === Outcome.WARNING && `
        background-color: var(--warning-color);
    `}
    ${(props) => props.variant === Outcome.ERROR && `
        background-color: var(--error-color);
    `}

    .icon {
        position: absolute;
        top: calc(50% - 10px);
        right: 16px;
        font-weight: 400;
        font-size: 18px;
        color: white;
        transition: all 0.5s;
        cursor: pointer;
    }
    .icon:hover {
        color: var(--black-color);
        text-decoration: none;
    }
`;



/**
 * The Result Component
 * @returns {React.ReactElement}
 */
function Result() {
    const { result                 } = Store.useState("core");
    const { hideResult             } = Store.useAction("core");
    const { open, variant, message } = result;


    // The State
    const [ timer,     setTimer   ] = React.useState(null);
    const [ isClosing, setClosing ] = React.useState(false);

    // The Close Function
    const handleClose = () => {
        if (isClosing) {
            return;
        }
        if (timer) {
            window.clearTimeout(timer);
            setTimeout(null);
        }
        setClosing(true);
        window.setTimeout(() => {
            setClosing(false);
            hideResult();
        }, 300);
    };

    // Set the Initial Timeout
    React.useEffect(() => {
        if (timer) {
            window.clearTimeout(timer);
        }
        if (open) {
            setTimer(window.setTimeout(handleClose, 10 * 1000));
        }
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ open ]);


    return <Div className="result" open={open}>
        <Content variant={variant} isClosing={isClosing}>
            {NLS.get(message)}
            <Icon icon="close" onClick={handleClose} />
        </Content>
    </Div>;
}

export default Result;
