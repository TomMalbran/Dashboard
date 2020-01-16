import React                from "react";
import PropTypes            from "prop-types";

// Core
import Action               from "../../Core/Action";

// Components
import Button               from "../Form/Button";



/**
 * The Info Action Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InfoAction(props) {
    const { isHidden, message, action, onAction } = props;
    const act = Action.get(action);

    if (isHidden) {
        return <React.Fragment />;
    }

    return <Button
        variant="accent"
        message={message || act.message}
        onClick={() => onAction(act)}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InfoAction.propTypes = {
    action   : PropTypes.string.isRequired,
    message  : PropTypes.string,
    isHidden : PropTypes.bool,
    onAction : PropTypes.func,
};

export default InfoAction;
