import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Action               from "../../Core/Action";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Components
import Button               from "../Form/Button";
import ActionOption         from "./ActionOption";
import Menu                 from "../Menu/Menu";
import MenuItem             from "../Menu/MenuItem";



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
    const { action, message, icon, onAction, children } = props;

    // References
    const actionRef = React.useRef();

    // State
    const [ menuOpen, setMenuOpen ] = React.useState(false);
    const [ menuTop,  setMenuTop  ] = React.useState(null);
    const [ menuLeft, setMenuLeft ] = React.useState(null);

    // Menu Actions
    const actions = [];
    for (const child of Utils.toArray(children)) {
        if (child && child.type === ActionOption) {
            const action = { ...child.props };
            action.act = Action.get(action.action);
            if (!action.isHidden) {
                actions.push(action);
            }
        }
    }
    const showMenu = actions.length > 0;


    // Handles the Click
    const handleClick = () => {
        if (showMenu) {
            const bounds = Utils.getBounds(actionRef);
            setMenuTop(bounds.bottom);
            setMenuLeft(bounds.right);
            setMenuOpen(true);
        } else {
            onAction(act);
        }
    };

    // Handles the Menu Close
    const handleMenuClose = () => {
        setMenuOpen(false);
    };


    if (!showMenu && !action) {
        return <React.Fragment />;
    }
    const act = Action.get(action);

    return <Li ref={actionRef}>
        <Button
            variant="outlined"
            message={NLS.get(message || act.message)}
            icon={icon || act.icon}
            onClick={() => handleClick()}
        />
        {showMenu && <Menu
            open={menuOpen}
            top={menuTop}
            left={menuLeft}
            direction="left"
            onClose={handleMenuClose}
        >
            {actions.map((elem, index) => <MenuItem
                key={index}
                icon={elem.icon || elem.act.icon}
                message={elem.message || elem.act.message}
                onClick={() => onAction(elem.act)}
            />)}
        </Menu>}
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ActionItem.propTypes = {
    isHidden : PropTypes.bool,
    action   : PropTypes.string,
    message  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    icon     : PropTypes.string,
    onAction : PropTypes.func,
    children : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ActionItem.defaultProps = {
    isHidden : false,
};

export default ActionItem;
