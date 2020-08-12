import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import NLS                  from "../../Core/NLS";

// Components
import Button               from "../Form/Button";



// Styles
const Li = Styled.li`
    &:not(:last-child) {
        margin-right: 8px;
    }
    .btn {
        font-size: 12px;
    }
`;



/**
 * The Action Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ActionItem(props) {
    const { action, message, icon, onAction } = props;
    const act = Action.get(action);

    return <Li>
        <Button
            variant="outlined"
            message={NLS.get(message || act.message)}
            icon={icon || act.icon}
            onClick={() => onAction(act)}
        />
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ActionItem.propTypes = {
    isHidden : PropTypes.bool,
    action   : PropTypes.string.isRequired,
    message  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    icon     : PropTypes.string,
    onAction : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ActionItem.defaultProps = {
    isHidden : false,
};

export default ActionItem;
