import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Backdrop             from "../Common/Backdrop";
import Icon                 from "../Common/Icon";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";




// Animations
const open = keyframes`
    from { opacity: 0; transform: translateX(calc(0px - var(--drawer-width))); }
    50%  { opacity: 1; transform: translateX(0px); }
    to   { opacity: 1; transform: translateX(0px); }
`;
const close = keyframes`
    from { opacity: 1; transform: translateX(0px); }
    50%  { opacity: 1; transform: translateX(calc(0px - var(--drawer-width))); }
    to   { opacity: 0; transform: translateX(calc(0px - var(--drawer-width))); }
`;

// Styles
const Div = Styled.div.attrs(({ closing }) => ({ closing }))`
    animation: ${(props) => props.closing ? css`${close} 0.3s ease-out both` : css`${open} 0.3s ease-in both`};
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--drawer-width);
    background-color: white;
    animation: drawer-open 0.3s ease-in;
`;

const Nav = Styled.nav`
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    width: var(--mainbar-width);
    padding: 16px 0;
    
    .mainbar-icon {
        color: var(--primary-color);
        background-color: white;
    }
    .mainbar-icon:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const Section = Styled.section`
    box-sizing: border-box;
    width: calc(var(--drawer-width) - var(--mainbar-width));
    padding: 18px 32px 32px 16px;
`;

const H2 = Styled.h2`
    margin: 0;
    color: var(--title-color);
    font-size: 24px;
    font-family: var(--title-font);
    line-height: 1.2;
    letter-spacing: 1px;
`;



/**
 * The Drawer Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Drawer(props) {
    const { open, className, logo, message, onClose, children } = props;
    
    if (!open) {
        return <React.Fragment />;
    }
    
    // The State
    const [ closing, setClosing ] = React.useState(false);
    const contentRef = React.useRef();

    // The Close Function
    const handleClose = () => {
        if (closing) {
            return;
        }
        setClosing(true);
        window.setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    };


    return <Backdrop
        contentRef={contentRef}
        open={open}
        closing={closing}
        onClose={handleClose}
    >
        <Div className={className} ref={contentRef}>
            <Nav>
                <h2 className="app-logo">
                    <img src={logo} alt={NLS.get("TITLE")} />
                </h2>
                <Icon
                    variant="back"
                    className="mainbar-icon"
                    onClick={handleClose}
                    message="GENERAL_SEARCH"
                />
            </Nav>
            <Section className="drawer-content">
                <H2>{NLS.get(message)}</H2>
                {children}
            </Section>
        </Div>
    </Backdrop>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Drawer.propTypes = {
    open      : PropTypes.bool.isRequired,
    className : PropTypes.string,
    message   : PropTypes.string.isRequired,
    logo      : PropTypes.string,
    onClose   : PropTypes.func.isRequired,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Drawer.defaultProps = {
    className : "",
};

export default Drawer;
