import React                from "react";
import PropTypes            from "prop-types";

// Components
import Backdrop             from "../Common/Backdrop";

// Styled
import Styled, {
    keyframes, css,
} from "styled-components";



// Animations
const menuOpen = keyframes`
    from { opacity: 0; transform: translateX(calc(0px - var(--sidebar-width) - var(--navigation-width))); }
    50%  { opacity: 1; transform: translateX(0px); }
    to   { opacity: 1; transform: translateX(0px); }
`;
const menuClose = keyframes`
    from { opacity: 1; transform: translateX(0px); }
    50%  { opacity: 1; transform: translateX(0px); }
    to   { opacity: 0; transform: translateX(calc(0px - var(--sidebar-width) - var(--navigation-width))); }
`;

const detailsOpen = keyframes`
    from { opacity: 0; transform: translateX(var(--details-width)); }
    50%  { opacity: 1; transform: translateX(0px); }
    to   { opacity: 1; transform: translateX(0px); }
`;
const detailsClose = keyframes`
    from { opacity: 1; transform: translateX(0px); }
    50%  { opacity: 1; transform: translateX(0px); }
    to   { opacity: 0; transform: translateX(var(--details-width)); }
`;

// Styles
const Div = Styled.div.attrs(({
    showMenu, openingMenu, closingMenu,
    showDetails, openingDetails, closingDetails,
}) => ({
    showMenu, openingMenu, closingMenu,
    showDetails, openingDetails, closingDetails,
}))`
    display: flex;
    height: 100vh;
    width: 100vw;

    @media (max-width: 1000px) {
        flex-direction: column;

        ${(props) => props.showMenu && `
            .sidebar, .navigation { display: flex; }
        `}
        ${(props) => props.openingMenu && css`
            .sidebar, .navigation { animation: ${menuOpen} 0.3s ease-in both; }
        `}
        ${(props) => props.closingMenu && css`
            .sidebar, .navigation { animation: ${menuClose} 0.3s ease-out both; }
        `}

        ${(props) => props.showDetails && `
            .details { display: block; }
        `}
        ${(props) => props.openingDetails && css`
            .details { animation: ${detailsOpen} 0.3s ease-in both; }
        `}
        ${(props) => props.closingDetails && css`
            .details { animation: ${detailsClose} 0.3s ease-out both; }
        `}
    }
`;



/**
 * The Container Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Container(props) {
    const {
        className, onClose, children,
        showMenu, openingMenu, closingMenu,
        showDetails, openingDetails, closingDetails,
    } = props;

    return <Div
        className={className}
        showMenu={showMenu}
        openingMenu={openingMenu}
        closingMenu={closingMenu}
        showDetails={showDetails}
        openingDetails={openingDetails}
        closingDetails={closingDetails}
    >
        {children}
        {onClose && <Backdrop
            open={showMenu || showDetails}
            onClick={onClose}
        />}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Container.propTypes = {
    className      : PropTypes.string,
    showMenu       : PropTypes.bool,
    openingMenu    : PropTypes.bool,
    closingMenu    : PropTypes.bool,
    showDetails    : PropTypes.bool,
    openingDetails : PropTypes.bool,
    closingDetails : PropTypes.bool,
    onClose        : PropTypes.func,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Container.defaultProps = {
    className      : "",
    showMenu       : false,
    openingMenu    : false,
    closingMenu    : false,
    showDetails    : false,
    openingDetails : false,
    closingDetails : false,
};

export default Container;
