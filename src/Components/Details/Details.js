import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

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
 * Creates the Children
 * @param {Object} props
 * @returns {React.ReactElement[]}
 */
function getChildren(props) {
    const { onClose } = props;

    const childs   = Utils.toArray(props.children);
    const children = [];
    let   key      = 0;

    for (const child of childs) {
        const clone = React.cloneElement(child, {
            key, onClose,
        });
        children.push(clone);
        key += 1;
    }
    return children;
}



/**
 * The Details Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Details(props) {
    const { className, isLoading, hasError, error, canEdit, button, onClick, onClose } = props;
    
    const showError   = !isLoading && hasError;
    const showContent = !isLoading && !hasError;
    const showActions = Boolean(showContent && button);

    return <Section className={`details ${className}`}>
        {isLoading   && <Loading><CircularLoader /></Loading>}
        {showError   && <Error>{NLS.get(error)}</Error>}
        {showContent && getChildren(props)}
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
