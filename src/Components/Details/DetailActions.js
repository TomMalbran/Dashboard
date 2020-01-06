import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import Button               from "Components/Utils/Form/Button";



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
    props.onClick(action);
    // props.closeDetails();
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
            const clone = <Button
                key={key}
                variant="outlined"
                icon={child.props.action.icon}
                message={child.props.message}
                onClick={() => handleClick(props, child.props.action)}
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
    closeDetails : PropTypes.func.isRequired,
    onClick      : PropTypes.func,
    canEdit      : PropTypes.bool,
    children     : PropTypes.any,
};

export default DetailActions;
