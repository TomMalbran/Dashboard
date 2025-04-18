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

const Content = Styled.div.attrs(({ isClosing }) => ({ isClosing }))`
    --bar-logo-width: var(--sidebar-logo-width, auto);
    --bar-logo-height: var(--sidebar-logo-height, auto);
    --bar-logo-max-width: var(--sidebar-logo-max-width, none);
    --bar-logo-max-height: var(--sidebar-logo-max-height, none);
    --bar-logo-bottom: var(--sidebar-logo-bottom, 0px);

    --bar-icon-size: var(--drawer-icon-size, 32px);
    --bar-icon-font: var(--drawer-icon-font, 16px);
    --bar-icon-color: var(--drawer-icon-color);
    --bar-icon-background: var(--drawer-icon-background);
    --bar-icon-sel-color: var(--drawer-icon-sel-color);
    --bar-icon-sel-bg: var(--drawer-icon-sel-bg);
    --bar-icon-hover-color: var(--drawer-icon-hover-color);
    --bar-icon-hover-bg: var(--drawer-icon-hover-bg);

    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--drawer-width);
    max-width: 100%;
    background-color: var(--drawer-background);

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
    gap: 8px;
    ${(props) => props.withBorder ? "border-right: 1px solid var(--border-color-dark)" : ""};
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
    letter-spacing: var(--title-letter-spacing);
    line-height: 1.2;
`;



/**
 * The Drawer Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Drawer(props) {
    const {
        open, className, withBorder,
        logo, message, onClose, children,
    } = props;


    // The Current State
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


    // Do the Render
    if (!open) {
        return <React.Fragment />;
    }
    return <DrawerDrop
        contentRef={contentRef}
        open={open}
        isClosing={isClosing}
        onClose={handleClose}
    >
        <Content
            ref={contentRef}
            className={className}
            isClosing={isClosing}
        >
            <Nav withBorder={withBorder}>
                <BarLogo logo={logo} />
                <BarIcon
                    icon="back"
                    onClick={handleClose}
                />
            </Nav>
            <Section>
                <H2>{NLS.get(message)}</H2>
                {children}
            </Section>
        </Content>
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
