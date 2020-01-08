import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import CircularLoader       from "../Common/CircularLoader";
import DetailActions        from "../Details/DetailActions";
import DetailAction         from "../Details/DetailAction";



// Styles
const Section = Styled.section`
    box-sizing: border-box;
    width: var(--details-width);
    background-color: var(--lighter-gray);
    padding: 16px;
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
    const { className, isLoading, hasError, error, canEdit, button, onClick, onClose, children } = props;
    
    const showError   = !isLoading && hasError;
    const showContent = !isLoading && !hasError;
    const showActions = Boolean(showContent && button);
    const items       = [];

    if (showContent) {
        for (const [ key, child ] of Utils.toEntries(children)) {
            items.push(React.cloneElement(child, {
                key, onClose,
            }));
        }
    }

    return <Section className={`details ${className}`}>
        {isLoading   && <Loading><CircularLoader /></Loading>}
        {showError   && <Error>{NLS.get(error)}</Error>}
        {showContent && items}
        {showActions && <DetailActions canEdit={canEdit} onClick={onClick} onClose={onClose}>
            <DetailAction action="EDIT" message={button} />
        </DetailActions>}
    </Section>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Details.propTypes = {
    className : PropTypes.string,
    isLoading : PropTypes.bool,
    hasError  : PropTypes.bool,
    error     : PropTypes.string,
    canEdit   : PropTypes.bool,
    button    : PropTypes.string,
    onClick   : PropTypes.func,
    onClose   : PropTypes.func,
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
    canEdit   : true,
};

export default Details;
