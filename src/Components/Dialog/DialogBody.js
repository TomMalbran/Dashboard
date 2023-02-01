import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import CircularLoader       from "../Loader/CircularLoader";



// Styles
const Main = Styled.main.attrs(({ isLoading, isCentered, isNarrow, withSpacing, fullHeight, noOverflow }) => ({ isLoading, isCentered, withSpacing, isNarrow, fullHeight, noOverflow }))`
    box-sizing: border-box;
    flex-grow: 2;
    color: var(--secondary-color);
    max-height: var(--dialog-body);

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
        className, isLoading, isCentered, isNarrow, withSpacing, noOverflow, fullHeight,
        onScroll, children,
    } = props;

    const dialogRef = React.useRef();

    // Handle the Scroll
    const handleScroll = () => {
        if (onScroll && dialogRef.current) {
            onScroll(dialogRef.current);
        }
    };


    return <Main
        ref={dialogRef}
        className={className}
        isLoading={isLoading}
        isCentered={isCentered}
        isNarrow={isNarrow}
        withSpacing={withSpacing}
        fullHeight={fullHeight}
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
    className   : PropTypes.string,
    isLoading   : PropTypes.bool,
    isCentered  : PropTypes.bool,
    isNarrow    : PropTypes.bool,
    withSpacing : PropTypes.bool,
    fullHeight  : PropTypes.bool,
    noOverflow  : PropTypes.bool,
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
};

export default DialogBody;
