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
const Section = Styled.section.attrs(({ isInside, isWide, isLarge, hasTabs, topSpace }) => ({ isInside, isWide, isLarge, hasTabs, topSpace }))`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: var(--details-spacing);
    padding: var(--details-spacing);
    width: ${(props) => props.isLarge ? "var(--details-width-large)" : (props.isWide ? "var(--details-width-wide)" : "var(--details-width)")};
    background-color: var(--details-background);
    overflow: auto;

    ${(props) => props.hasTabs && "padding-top: 0px;"}
    ${(props) => props.topSpace && `padding-top: ${props.topSpace}px;`}

    ${(props) => props.isInside ? `
        border-radius: var(--border-radius);
        border: 1px solid var(--details-border-color);
    ` : `
        height: var(--main-height);
    `}

    @media (max-width: 1200px) {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        height: auto;
        max-width: 90%;
        border-radius: 0;
        z-index: var(--z-details);
    }
`;

const Loading = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    background-color: white;
    border-radius: var(--border-radius);
    overflow: hidden;
`;

const Error = Styled.div`
    margin: 0;
    padding: 16px;
    color: var(--error-color);
    text-align: center;
    background-color: white;
    border-radius: 3px;
`;



/**
 * The Details Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Details(props) {
    const {
        className, isHidden, isInside, isWide, isLarge, hasTabs, topSpace,
        isLoading, isEmpty, hasError, error,
        canEdit, onAction, collapsible, children,
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
    if (collapsible || onAction) {
        items = Utils.cloneChildren(children, () => ({
            collapsible, canEdit, onAction,
        }));
    }


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Section
        className={`details light-scrollbars ${className}`}
        isInside={isInside}
        isWide={isWide}
        isLarge={isLarge}
        hasTabs={hasTabs}
        topSpace={topSpace}
    >
        {isLoading   && <Loading><CircularLoader /></Loading>}
        {showError   && <Error>{NLS.get(error)}</Error>}
        {showContent && items}
    </Section>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Details.propTypes = {
    className   : PropTypes.string,
    isHidden    : PropTypes.bool,
    isInside    : PropTypes.bool,
    isWide      : PropTypes.bool,
    isLarge     : PropTypes.bool,
    hasTabs     : PropTypes.bool,
    topSpace    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    isLoading   : PropTypes.bool,
    isEmpty     : PropTypes.bool,
    hasError    : PropTypes.bool,
    error       : PropTypes.string,
    canEdit     : PropTypes.bool,
    onAction    : PropTypes.func,
    collapsible : PropTypes.string,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Details.defaultProps = {
    className : "",
    isHidden  : false,
    isInside  : false,
    isWide    : false,
    isLarge   : false,
    hasTabs   : false,
    isLoading : false,
    isEmpty   : false,
    hasError  : false,
};

export default Details;
