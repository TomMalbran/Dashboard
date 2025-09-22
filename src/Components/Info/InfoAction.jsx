import React                from "react";
import PropTypes            from "prop-types";

// Core
import Action               from "../../Core/Action";

// Components
import Button               from "../Form/Button";



/**
 * The Info Action Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function InfoAction(props) {
    const {
        isHidden, className, variant, icon, message,
        action, onAction,
    } = props;

    const act = Action.get(action);


    // Handles the Click
    const handleClick = () => {
        if (onAction) {
            onAction(act);
        }
    };


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Button
        className={className}
        variant={variant}
        icon={icon || act.icon}
        message={message || act.message}
        onClick={handleClick}
    />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
InfoAction.propTypes = {
    isHidden  : PropTypes.bool,
    action    : PropTypes.string.isRequired,
    className : PropTypes.string,
    variant   : PropTypes.string,
    icon      : PropTypes.string,
    message   : PropTypes.string,
    onAction  : PropTypes.func,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
InfoAction.defaultProps = {
    isHidden  : false,
    className : "",
    variant   : "accent",
};

export default InfoAction;
