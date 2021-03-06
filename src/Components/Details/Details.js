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
const Section = Styled.section.attrs(({ topSpace }) => ({ topSpace }))`
    flex-shrink: 0;
    box-sizing: border-box;
    width: var(--details-width);
    background-color: var(--lighter-gray);
    padding: 16px;
    overflow: auto;

    ${(props) => props.topSpace ? `padding-top: ${props.topSpace}px` : ""};

    @media (max-width: 1000px) {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: var(--z-details);
    }
`;

const Loading = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    background-color: white;
    border-radius: 3px;
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
    const { className, topSpace, isLoading, hasError, error, children } = props;

    // Set/Unset the Details on Load/Unload
    React.useEffect(() => {
        Store.setDetails(true);
        return () => Store.setDetails(false);
    }, []);

    const showError   = !isLoading && hasError;
    const showContent = !isLoading && !hasError;
    const onClose     = Store.closeDetails;
    const items       = Utils.cloneChildren(children, () => ({ onClose }));

    return <Section className={`details light-scrollbars ${className}`} topSpace={topSpace}>
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
    className : PropTypes.string,
    topSpace  : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    isLoading : PropTypes.bool,
    hasError  : PropTypes.bool,
    error     : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Details.defaultProps = {
    className : "",
    isLoading : false,
    hasError  : false,
};

export default Details;
