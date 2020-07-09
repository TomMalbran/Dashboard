import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import Status               from "../../Core/Status";
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Item = Styled.div.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
    position: relative;
    flex-grow: 1;
    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s;

    &:hover .icon {
        display: block;
    }
`;

const ItemIcon = Styled(Icon)`
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.5 all;
    font-size: 14px;

    &:hover {
        opacity: 0.8;
    }
`;
const EditIcon = Styled(ItemIcon)`
    left: 2px;
`;
const DeleteIcon = Styled(ItemIcon)`
    right: 2px;
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
    ${(props) => props.isDisabled && `
        color: rgba(255, 255, 255, 0.5);
        cursor: not-allowed;
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
    ${(props) => props.isDisabled && `
        color: rgba(255, 255, 255, 0.5);
        cursor: not-allowed;
    `}
`;

// Components
const Components = {
    [Brightness.LIGHT] : LightItem,
    [Brightness.DARK]  : DarkItem,
};



/**
 * The Tab Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TabItem(props) {
    const { className, variant, message, status, value, index, selected, isDisabled, canEdit, canDelete, onAction } = props;
    
    const Component  = Components[variant] || LightItem;
    const id         = status ? Status.getID(status) : (value || index);
    const isSelected = !isDisabled && String(selected) === String(id);
    const canAction  = !isDisabled && onAction;

    // Handle the Click
    const handleClick = () => {
        handleAction("TAB");
    };

    // Handle the Edit
    const handleEdit = (e) => {
        handleAction("EDIT");
        e.stopPropagation();
        e.preventDefault();
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
        className={`tab-item ${isSelected ? "tab-selected" : ""} ${className}`}
        isSelected={isSelected}
        isDisabled={isDisabled}
        onClick={handleClick}
    >
        {canEdit && canAction && <EditIcon
            icon="edit"
            onClick={handleEdit}
        />}
        {NLS.get(message)}
        {canDelete && canAction && <DeleteIcon
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
    index      : PropTypes.number,
    value      : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    selected   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    message    : PropTypes.string.isRequired,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    canEdit    : PropTypes.bool,
    canDelete  : PropTypes.bool,
    onAction   : PropTypes.func,
    isHidden   : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabItem.defaultProps = {
    className  : "",
    variant    : Brightness.LIGHT,
    value      : "",
    index      : 0,
    isDisabled : false,
    isSelected : false,
    canEdit    : false,
    canDelete  : false,
    isHidden   : false,
};

export default TabItem;
