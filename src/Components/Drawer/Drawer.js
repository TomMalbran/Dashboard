import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Backdrop             from "../Common/Backdrop";
import BarLogo              from "../Core/BarLogo";
import BarIcon              from "../Core/BarIcon";

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
const DrawerDrop = Styled(Backdrop)`
    z-index: var(--z-drawer);
`;
const Div = Styled.div.attrs(({ isClosing }) => ({ isClosing }))`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--drawer-width);
    max-width: 100%;
    background-color: white;

    ${(props) => props.isClosing ?
        css`animation: ${close} 0.3s ease-out both;` :
        css`animation: ${open} 0.3s ease-in both;`};
`;

const Nav = Styled.nav.attrs(({ withBorder }) => ({ withBorder }))`
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    width: var(--sidebar-width);
    padding: 16px 0;
    ${(props) => props.withBorder ? "border-right: 1px solid var(--border-color-dark)" : ""};
`;

const Logo = Styled(BarLogo)`
    margin-bottom: 8px;
    margin-top: var(--sidebar-top);
    height: var(--sidebar-logo);
`;

const Section = Styled.section`
    box-sizing: border-box;
    width: calc(var(--drawer-width) - var(--sidebar-width));
    padding: 18px 32px 32px 16px;
`;

const H2 = Styled.h2`
    margin: 0 0 12px 0;
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
    const {
        open, className, withBorder,
        logo, logoWidth, logoHeight,
        message, onClose, children,
    } = props;

    // The State
    const [ isClosing, setClosing ] = React.useState(false);
    const contentRef = React.useRef();

    // Handles the Close
    const handleClose = () => {
        if (isClosing) {
            return;
        }
        setClosing(true);
        window.setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    };


    if (!open) {
        return <React.Fragment />;
    }
    return <DrawerDrop
        contentRef={contentRef}
        open={open}
        isClosing={isClosing}
        onClose={handleClose}
    >
        <Div className={className} ref={contentRef} isClosing={isClosing}>
            <Nav withBorder={withBorder}>
                <Logo
                    logo={logo}
                    logoWidth={logoWidth}
                    logoHeight={logoHeight}
                />
                <BarIcon
                    variant="light"
                    icon="back"
                    onClick={handleClose}
                />
            </Nav>
            <Section>
                <H2>{NLS.get(message)}</H2>
                {children}
            </Section>
        </Div>
    </DrawerDrop>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Drawer.propTypes = {
    open       : PropTypes.bool.isRequired,
    className  : PropTypes.string,
    withBorder : PropTypes.bool,
    message    : PropTypes.string.isRequired,
    logo       : PropTypes.string,
    logoWidth  : PropTypes.number,
    logoHeight : PropTypes.number,
    onClose    : PropTypes.func.isRequired,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Drawer.defaultProps = {
    className  : "",
    withBorder : false,
};

export default Drawer;
