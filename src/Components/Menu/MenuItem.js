import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Li = Styled.li.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
    display: flex;
    align-items: center;
    width: auto;
    margin: 0;
    padding: 8px;
    text-align: left;
    font-size: 14px;
    white-space: nowrap;
    transition: all 0.2s;
    cursor: pointer;
    color: var(--title-color);

    &:hover {
        background-color: var(--light-gray);
    }
    .icon {
        margin-right: 6px;
        font-size: 20px;
    }
`;



/**
 * The Menu Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MenuItem(props) {
    const { className, action, icon, message, isDisabled, isSelected, onAction, onClick, onClose } = props;
    const act = Action.get(action);
    const icn = icon    || act.icon;
    const cnt = message || act.message;

    // Handles the Click
    const handleClick = (e) => {
        if (onAction) {
            onAction(act);
        } else if (onClick) {
            onClick(e);
        }
        if (onClose) {
            onClose(e);
        }
        e.preventDefault();
        e.stopPropagation();
    };

    return <Li
        className={className}
        isSelected={!isDisabled && isSelected}
        isDisabled={isDisabled}
        onClick={handleClick}
    >
        {!!icn && <Icon icon={icn} />}
        {NLS.get(cnt)}
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MenuItem.propTypes = {
    className  : PropTypes.string,
    action     : PropTypes.string,
    icon       : PropTypes.string,
    message    : PropTypes.string,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    onAction   : PropTypes.func,
    onClick    : PropTypes.func,
    onClose    : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MenuItem.defaultProps = {
    className  : "",
    isDisabled : false,
    isSelected : false,
};

export default MenuItem;
