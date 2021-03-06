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
 * The Detail Action List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DetailActionList(props) {
    const { canEdit, onAction, onClose, children } = props;

    // Handles the Click
    const handleClick = (action) => {
        if (onAction) {
            onAction(action);
        }
        if (onClose) {
            onClose();
        }
    };

    const items = [];
    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        const act = Action.get(child.props.action);
        items.push(<Button
            key={key}
            variant="outlined"
            icon={child.props.icon || act.icon}
            message={child.props.message || act.message}
            onClick={() => handleClick(act)}
        />);
    }


    if (!canEdit || !items.length) {
        return <React.Fragment />;
    }
    return <Div>
        {items}
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DetailActionList.propTypes = {
    onAction : PropTypes.func,
    onClose  : PropTypes.func,
    canEdit  : PropTypes.bool,
    children : PropTypes.any,
};

export default DetailActionList;
