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
    showingMenu, openingMenu, closingMenu,
    showingDetails, openingDetails, closingDetails,
}) => ({
    showingMenu, openingMenu, closingMenu,
    showingDetails, openingDetails, closingDetails,
}))`
    display: flex;
    height: var(--full-height);
    width: 100vw;

    @media (max-width: 1000px) {
        flex-direction: column;

        ${(props) => props.showingMenu && `
            .sidebar, .navigation { display: flex; }
        `}
        ${(props) => props.openingMenu && css`
            .sidebar, .navigation { animation: ${menuOpen} 0.3s ease-in both; }
        `}
        ${(props) => props.closingMenu && css`
            .sidebar, .navigation { animation: ${menuClose} 0.3s ease-out both; }
        `}

        ${(props) => props.showingDetails && `
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
    const { className, children, showMenu, closeMenu, showDetails, closeDetails } = props;

    // The current State
    const [ menuTimer,      setMenuTimer      ] = React.useState(null);
    const [ showingMenu,    setShowingMenu    ] = React.useState(false);
    const [ openingMenu,    setOpeningMenu    ] = React.useState(false);
    const [ closingMenu,    setClosingMenu    ] = React.useState(false);

    const [ detailsTimer,   setDetailsTimer   ] = React.useState(null);
    const [ showingDetails, setShowingDetails ] = React.useState(false);
    const [ openingDetails, setOpeningDetails ] = React.useState(false);
    const [ closingDetails, setClosingDetails ] = React.useState(false);

    // Opens the Menu
    const handleMenuOpen = () => {
        if (openingMenu) {
            return;
        }
        setShowingMenu(true);
        setOpeningMenu(true);
        if (menuTimer) {
            window.clearTimeout(menuTimer);
        }
        setMenuTimer(window.setTimeout(() => {
            setOpeningMenu(false);
        }, 300));
    };

    // Closes the Menu
    const handleMenuClose = () => {
        if (closingMenu) {
            return;
        }
        setClosingMenu(true);
        if (menuTimer) {
            window.clearTimeout(menuTimer);
        }
        setMenuTimer(window.setTimeout(() => {
            setClosingMenu(false);
            setShowingMenu(false);
        }, 300));
    };

    // Opens the Details
    const handleDetailsOpen = () => {
        if (openingDetails) {
            return;
        }
        setShowingDetails(true);
        setOpeningDetails(true);
        if (detailsTimer) {
            window.clearTimeout(detailsTimer);
        }
        setDetailsTimer(window.setTimeout(() => {
            setOpeningDetails(false);
        }, 300));
    };

    // Closes the Details
    const handleDetailsClose = () => {
        if (closingDetails) {
            return;
        }
        setClosingDetails(true);
        if (detailsTimer) {
            window.clearTimeout(detailsTimer);
        }
        setDetailsTimer(window.setTimeout(() => {
            setClosingDetails(false);
            setShowingDetails(false);
        }, 300));
    };

    // Handles the Menu/Detials Close
    const handleClose = () => {
        if (showingMenu) {
            closeMenu();
        }
        if (showingDetails) {
            closeDetails();
        }
    };


    // Open or Close the Menu
    React.useEffect(() => {
        if (showMenu) {
            handleMenuOpen();
        } else {
            handleMenuClose();
        }
        return () => {
            if (menuTimer) {
                window.clearTimeout(menuTimer);
            }
        };
    }, [ showMenu ]);

    // Open or Close the Details
    React.useEffect(() => {
        if (showDetails) {
            handleDetailsOpen();
        } else {
            handleDetailsClose();
        }
        return () => {
            if (detailsTimer) {
                window.clearTimeout(detailsTimer);
            }
        };
    }, [ showDetails ]);


    return <Div
        className={className}
        showingMenu={showingMenu}
        openingMenu={openingMenu}
        closingMenu={closingMenu}
        showingDetails={showingDetails}
        openingDetails={openingDetails}
        closingDetails={closingDetails}
    >
        {children}
        <Backdrop
            open={showingMenu || showingDetails}
            onClick={handleClose}
        />
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Container.propTypes = {
    className    : PropTypes.string,
    showMenu     : PropTypes.bool,
    showDetails  : PropTypes.bool,
    closeMenu    : PropTypes.func,
    closeDetails : PropTypes.func,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Container.defaultProps = {
    className   : "",
    showMenu    : false,
    showDetails : false,
};

export default Container;
