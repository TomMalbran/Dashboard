import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import CircularLoader       from "../Loader/CircularLoader";



// Styles
const Main = Styled.main.attrs(({
    isLoading, isCentered, isNarrow, withSpacing, fullHeight, hideFooter, noOverflow,
}) => ({
    isLoading, isCentered, withSpacing, isNarrow, fullHeight, hideFooter, noOverflow,
}))`
    box-sizing: border-box;
    flex-grow: 2;
    color: var(--secondary-color);
    max-height: var(--dialog-body);
    overscroll-behavior-y: none;

    ${(props) => (props.isLoading || props.isCentered) && `
        display: flex;
        justify-content: center;
        align-items: center;
    `}
    ${(props) => props.isLoading && `
        padding: 32px;
    `}
    ${(props) => props.withSpacing && `
        padding: 24px;
    `}
    ${(props) => props.fullHeight && `
        height: var(--dialog-body);
    `}
    ${(props) => !props.noOverflow && `
        overflow: auto;
    `}

    @media (max-width: 500px) {
        ${(props) => props.hideFooter && "--dialog-footer: 0;"}
        ${(props) => !props.isNarrow && `
            height: calc(var(--full-height) - var(--dialog-header) - var(--dialog-footer));
            max-height: none;
        `}
    }
`;



/**
 * The Dialog Body Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogBody(props) {
    const {
        className, isLoading, isCentered, isNarrow, withSpacing,
        noOverflow, fullHeight, hideFooter,
        passedRef, onScroll, children,
    } = props;

    const defaultRef = React.useRef();
    const elementRef = passedRef || defaultRef;

    // Handle the Scroll
    const handleScroll = () => {
        if (onScroll && elementRef.current) {
            onScroll(elementRef.current);
        }
    };


    return <Main
        ref={elementRef}
        className={className}
        isLoading={isLoading}
        isCentered={isCentered}
        isNarrow={isNarrow}
        withSpacing={withSpacing}
        fullHeight={fullHeight}
        hideFooter={hideFooter}
        noOverflow={noOverflow}
        onScroll={handleScroll}
    >
        {isLoading ? <CircularLoader /> : children}
    </Main>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogBody.propTypes = {
    passedRef   : PropTypes.any,
    className   : PropTypes.string,
    isLoading   : PropTypes.bool,
    isCentered  : PropTypes.bool,
    isNarrow    : PropTypes.bool,
    withSpacing : PropTypes.bool,
    fullHeight  : PropTypes.bool,
    noOverflow  : PropTypes.bool,
    hideFooter  : PropTypes.bool,
    onScroll    : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogBody.defaultProps = {
    className   : "",
    isLoading   : false,
    isCentered  : false,
    isNarrow    : false,
    withSpacing : false,
    fullHeight  : false,
    noOverflow  : false,
    hideFooter  : false,
};

export default DialogBody;
