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
    
    if (isHidden) {
        return <React.Fragment />;
    }

    // Handles the Click
    const handleClick = () => {
        const act = Action.get(action);
        onAction(act);
    };

    return <Button
        variant="accent"
        message={message}
        onClick={handleClick}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InfoAction.propTypes = {
    message  : PropTypes.string.isRequired,
    action   : PropTypes.string.isRequired,
    isHidden : PropTypes.bool,
    onAction : PropTypes.func,
};

export default InfoAction;
