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
    const { action, message, icon, onClick } = props;
    const act = Action.get(action);

    return <Li>
        <Button
            variant="outlined"
            message={NLS.get(message || act.message)}
            icon={icon || act.icon}
            onClick={() => onClick(act)}
        />
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ActionItem.propTypes = {
    action   : PropTypes.string.isRequired,
    message  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    icon     : PropTypes.string,
    isHidden : PropTypes.bool,
    onClick  : PropTypes.func.isRequired,
};

export default ActionItem;
