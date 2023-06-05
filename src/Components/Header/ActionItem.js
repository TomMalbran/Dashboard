import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import Button               from "../Form/Button";
import ActionOption         from "./ActionOption";
import Menu                 from "../Menu/Menu";
import MenuItem             from "../Menu/MenuItem";



// Styles
const Li = Styled.li.attrs(({ isSmall }) => ({ isSmall }))`
    ${(props) => !props.isSmall && `.btn {
        font-size: 12px;
    }`}
`;



/**
 * The Action Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ActionItem(props) {
    const {
        action, variant, isSmall, message, icon,
        onClick, onAction, direction,
        tooltip, tooltipVariant, children,
    } = props;

    // References
    const buttonRef = React.useRef();
    const actionRef = React.useRef();

    // State
    const [ menuOpen, setMenuOpen ] = React.useState(false);

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
            setMenuOpen(!menuOpen);
        } else if (onClick) {
            onClick();
        } else if (onAction) {
            onAction(act);
        }
    };

    // Handles the Menu Click
    const handleMenuClick = (elem) => {
        if (onClick) {
            onClick(elem.value);
        } else if (onAction) {
            onAction(elem.act);
        }
    };

    // Handles the Menu Close
    const handleMenuClose = () => {
        setMenuOpen(false);
    };


    // Do the Render
    if (!showMenu && !action && !onClick) {
        return <React.Fragment />;
    }
    const act = Action.get(action);

    return <Li ref={actionRef} isSmall={isSmall}>
        <Button
            passedRef={buttonRef}
            variant={variant}
            message={message || act.message}
            tooltip={tooltip}
            tooltipVariant={tooltipVariant}
            icon={icon || act.icon}
            onClick={() => handleClick()}
            isSmall={isSmall}
            propagate
        />
        {showMenu && <Menu
            open={menuOpen}
            targetRef={buttonRef}
            direction={direction}
            onClose={handleMenuClose}
        >
            {actions.map((elem, index) => <MenuItem
                key={index}
                icon={elem.icon || elem.act.icon}
                message={elem.message || elem.act.message}
                onClick={() => handleMenuClick(elem)}
            />)}
        </Menu>}
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ActionItem.propTypes = {
    isHidden       : PropTypes.bool,
    variant        : PropTypes.string,
    isSmall        : PropTypes.bool,
    action         : PropTypes.string,
    message        : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    icon           : PropTypes.string,
    tooltip        : PropTypes.string,
    tooltipVariant : PropTypes.string,
    onClick        : PropTypes.func,
    onAction       : PropTypes.func,
    direction      : PropTypes.string,
    children       : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ActionItem.defaultProps = {
    isHidden  : false,
    variant   : "outlined",
    isSmall   : false,
    direction : "bottom left",
};

export default ActionItem;
