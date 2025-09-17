import React                from "react";
import PropTypes            from "prop-types";

// Core
import Action               from "../../Core/Action";
import NLS                  from "../../Core/NLS";

// Components
import Button               from "../Form/Button";



/**
 * The Dialog Action Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogAction(props) {
    const { action, message, onAction } = props;
    const act = Action.get(action);

    return <Button
        variant="primary"
        message={NLS.get(message || act.message)}
        onClick={() => onAction(act)}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogAction.propTypes = {
    isHidden : PropTypes.bool,
    message  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    action   : PropTypes.string.isRequired,
    onAction : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogAction.defaultProps = {
    isHidden : false,
};

export default DialogAction;
