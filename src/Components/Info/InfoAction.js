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

    // Handles the Click
    const handleClick = () => {
        if (onAction) {
            onAction(act);
        }
    };


    if (isHidden) {
        return <React.Fragment />;
    }
    return <Button
        variant="accent"
        message={message || act.message}
        onClick={handleClick}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InfoAction.propTypes = {
    action   : PropTypes.string.isRequired,
    message  : PropTypes.string,
    onAction : PropTypes.func,
    isHidden : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InfoAction.defaultProps = {
    isHidden : false,
};

export default InfoAction;
