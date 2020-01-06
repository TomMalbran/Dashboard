import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import DetailActions        from "./DetailActions";
import DetailAction         from "./DetailAction";
import CircularLoader       from "../Common/CircularLoader";



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
    const { hasData, hasError, error, canEdit, button, onClick, onClose, children } = props;
    
    const isLoading = hasData    && !hasError;
    const withError = !isLoading && hasError;
    const showCnt   = !isLoading && !hasError;
    const showActs  = Boolean(canEdit && showCnt && button);

    return <Section className="details">
        {isLoading && <Loading><CircularLoader /></Loading>}
        {withError && <Error>{NLS.get(error)}</Error>}
        {showCnt   && children}
        {showActs  && <DetailActions canEdit={canEdit} onClick={onClick} onClose={onClose}>
            <DetailAction action="EDIT" message={button} />
        </DetailActions>}
    </Section>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Details.propTypes = {
    closeDetails : PropTypes.func.isRequired,
    hasData      : PropTypes.bool.isRequired,
    hasError     : PropTypes.bool.isRequired,
    error        : PropTypes.string.isRequired,
    canEdit      : PropTypes.bool,
    button       : PropTypes.string,
    onClick      : PropTypes.func,
    onClose      : PropTypes.func,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Details.defaultProps = {
    canEdit : true,
};

export default Details;
