import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import Button               from "../Form/Button";



// Styles
const Div = Styled.div`
    margin-top: 16px;
    border-radius: 3px;
    
    .btn {
        width: 100%;
        font-size: 12px;
        background-color: white;
    }
    .btn.btn + .btn.btn {
        margin-top: 8px;
        margin-left: 0;
    }
`;



/**
 * Handle the Button Clicks
 * @param {Object} props
 * @param {Object} action
 * @returns {Void}
 */
function handleClick(props, action) {
    if (props.onClick) {
        props.onClick(action);
    }
    if (props.onClose) {
        props.onClose();
    }
}

/**
 * Creates the Children
 * @param {Object} props
 * @returns {React.ReactElement[]}
 */
function getChildren(props) {
    const childs   = Utils.toArray(props.children);
    const children = [];
    let   key      = 0;

    for (const child of childs) {
        if (child && !child.props.isHidden) {
            const action = Action.get(child.props.action);
            const clone  = <Button
                key={key}
                variant="outlined"
                icon={child.props.icon || action.icon}
                message={child.props.message || action.message}
                onClick={() => handleClick(props, action)}
            />;
            children.push(clone);
            key += 1;
        }
    }
    return children;
}



/**
 * The Detail Actions Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DetailActions(props) {
    const { canEdit } = props;
    const children = getChildren(props);

    if (!canEdit || !children.length) {
        return <React.Fragment />;
    }

    return <Div>
        {children}
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DetailActions.propTypes = {
    onClick  : PropTypes.func,
    onClose  : PropTypes.func,
    canEdit  : PropTypes.bool,
    children : PropTypes.any,
};

export default DetailActions;
