import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Store                from "../../Core/Store";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import CircularLoader       from "../Loader/CircularLoader";



// Styles
const Container = Styled.section.attrs(({ isInside, isWide, isLarge, hasExternalTabs, withBorder, stickyBottom }) => ({ isInside, isWide, isLarge, hasExternalTabs, withBorder, stickyBottom }))`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: ${(props) => props.isLarge ? "var(--details-width-large)" : (props.isWide ? "var(--details-width-wide)" : "var(--details-width)")};
    height: var(--details-height);
    padding: var(--details-spacing);
    padding-top: 0px;
    background-color: var(--content-color);
    overflow: auto;

    ${(props) => props.isInside ? `
        --details-height: ${props.hasExternalTabs ? "var(--page-height-tabs)" : "var(--page-height)"};
    ` : `
        --details-height: var(--main-height);

        margin-right: var(--main-margin);
        border-radius: var(--main-radius);
    `}

    ${(props) => props.withBorder && `
        border-radius: var(--border-radius);
        border: 1px solid var(--details-border-color);
    `}

    ${(props) => props.stickyBottom && `
        padding-bottom: 0px;
    `}

    @media (max-width: 1200px) {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        height: auto;
        max-width: 90%;
        padding: 16px;
        padding-top: 0px;
        margin-right: 0;
        border-radius: 0;
        z-index: var(--z-details);
    }
`;

const Loading = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    background-color: var(--content-color);
    border-radius: var(--border-radius);
    overflow: hidden;
`;

const Error = Styled.div`
    margin: 0;
    padding: 16px;
    color: var(--error-color);
    text-align: center;
    background-color: var(--content-color);
    border-radius: 3px;
`;



/**
 * The Details Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Details(props) {
    const {
        className, isHidden, isInside, isWide, isLarge,
        hasInternalTabs, hasExternalTabs, withBorder,
        isLoading, isEmpty, hasError, error,
        canEdit, onAction, collapsible, stickyBottom, children,
    } = props;

    const { setDetails } = Store.useAction("core");


    // Set/Unset the Details on Load/Unload
    React.useEffect(() => {
        if (!isHidden) {
            setDetails(true);
        }
        return () => setDetails(false);
    }, [ isHidden ]);


    // Parse the Items
    const showError   = !isLoading && hasError;
    const showContent = !isLoading && !hasError && !isEmpty;

    let items = children;
    if (hasInternalTabs || collapsible || canEdit || onAction) {
        items = Utils.cloneChildren(children, () => ({
            hasInternalTabs, collapsible, canEdit, onAction,
        }));
    }


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container
        className={`details light-scrollbars ${className}`}
        isInside={isInside}
        isWide={isWide}
        isLarge={isLarge}
        hasExternalTabs={hasExternalTabs}
        withBorder={withBorder}
        stickyBottom={stickyBottom}
    >
        {isLoading   && <Loading><CircularLoader /></Loading>}
        {showError   && <Error>{NLS.get(error)}</Error>}
        {showContent && items}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Details.propTypes = {
    className       : PropTypes.string,
    isHidden        : PropTypes.bool,
    isInside        : PropTypes.bool,
    isWide          : PropTypes.bool,
    isLarge         : PropTypes.bool,
    hasExternalTabs : PropTypes.bool,
    hasInternalTabs : PropTypes.bool,
    withBorder      : PropTypes.bool,
    isLoading       : PropTypes.bool,
    isEmpty         : PropTypes.bool,
    hasError        : PropTypes.bool,
    error           : PropTypes.string,
    canEdit         : PropTypes.bool,
    onAction        : PropTypes.func,
    collapsible     : PropTypes.string,
    stickyBottom    : PropTypes.bool,
    children        : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Details.defaultProps = {
    className       : "",
    isHidden        : false,
    isInside        : false,
    isWide          : false,
    isLarge         : false,
    hasExternalTabs : false,
    hasInternalTabs : false,
    withBorder      : false,
    isLoading       : false,
    isEmpty         : false,
    hasError        : false,
    stickyBottom    : false,
};

export default Details;
