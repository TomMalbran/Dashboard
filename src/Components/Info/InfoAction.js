import React                from "react";
import PropTypes            from "prop-types";

// Components
import Button               from "../Form/Button";



/**
 * The Info Action Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InfoAction(props) {
    const { isHidden, message, action, onClick } = props;
    
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Button
        variant="accent"
        message={message}
        onClick={() => onClick(action)}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InfoAction.propTypes = {
    message  : PropTypes.string.isRequired,
    action   : PropTypes.object,
    isHidden : PropTypes.bool,
    onClick  : PropTypes.func,
};

export default InfoAction;
