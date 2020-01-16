import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import Status               from "../../Core/Status";
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";

// Variants
const Variant = {
    LIGHT : "light",
    DARK  : "dark",
};



// Styles
const Item = Styled.div.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
    position: relative;
    flex-grow: 1;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;

    ${(props) => props.isDisabled && `
        color: rgba(255, 255, 255, 0.5);
        cursor: not-allowed;
    `}

    .icon {
        position: absolute;
        top: 50%;
        right: 2px;
        transform: translateY(-50%);
        transition: 0.5 all;
    }
    .icon:hover {
        opacity: 0.8;
    }
`;

const LightItem = Styled(Item)`
    height: var(--tabs-table);
    padding: 6px 12px;
    color: var(--title-color);
    background-color: var(--lighter-gray);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);

    ${(props) => (!props.isSelected && !props.isDisabled) && `
        &:hover {
            box-shadow: inset 0 -2px var(--primary-color);
        }
    `}
    ${(props) => props.isSelected && `
        box-shadow: inset 0 -3em var(--primary-color);
        color: var(--white-color);
    `}
`;

const DarkItem = Styled(Item)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--tabs-dialog);
    color: var(--white-color);
    border: 1px solid var(--primary-color);
    border-bottom: 1px solid var(--border-color);
    line-height: 1;
    
    ${(props) => (!props.isSelected && !props.isDisabled) && `
        &:hover {
            box-shadow: inset 0 -4px var(--border-color);
        }
    `}
    ${(props) => props.isSelected && `
        color: var(--white-color);
        background-color: var(--secondary-color);
        border-color: var(--border-color);
        border-bottom-color: var(--secondary-color);

        &:first-child {
            border-left-color: var(--secondary-color);
        }
    `}
`;

// Components
const Components = {
    [Variant.LIGHT] : LightItem,
    [Variant.DARK]  : DarkItem,
};



/**
 * The Tab Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TabItem(props) {
    const { className, variant, message, status, value, index, isDisabled, isSelected, canDelete, onAction } = props;
    
    const Component = Components[variant];
    const id        = status ? Status.getID(status) : value || index;

    // Handle the Click
    const handleClick = () => {
        handleAction("TAB");
    };

    // Handle the Delete
    const handleDelete = (e) => {
        handleAction("DELETE");
        e.stopPropagation();
        e.preventDefault();
    };

    // Handles the Action
    const handleAction = (action) => {
        if (!isDisabled && onAction) {
            onAction(Action.get(action), id);
        }
    };
    
    
    return <Component
        className={className}
        isSelected={!isDisabled && isSelected}
        isDisabled={isDisabled}
        onClick={handleClick}
    >
        {NLS.get(message)}
        {canDelete && isSelected && <Icon
            icon="close"
            onClick={handleDelete}
        />}
    </Component>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TabItem.propTypes = {
    className  : PropTypes.string,
    variant    : PropTypes.string,
    status     : PropTypes.string,
    value      : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    index      : PropTypes.number,
    message    : PropTypes.string.isRequired,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    isHidden   : PropTypes.bool,
    canDelete  : PropTypes.bool,
    onAction   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabItem.defaultProps = {
    className  : "",
    variant    : Variant.LIGHT,
    value      : "",
    index      : 0,
    isDisabled : false,
    isSelected : false,
    canDelete  : false,
};

export default TabItem;
