import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import Status               from "../../Core/Status";
import Store                from "../../Core/Store";
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
    transition: all 0.2s;
    cursor: pointer;

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
    height: calc(var(--tabs-table) - 8px);
    padding: 6px 12px;
    color: var(--title-color);
    background-color: var(--lighter-gray);
    border-radius: var(--border-radius);

    ${(props) => (!props.isSelected && !props.isDisabled) && `
        &:hover {
            box-shadow: inset 0 0 0 2em var(--light-gray);
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
    padding: 0 24px;
    color: var(--white-color);
    border-radius: var(--border-radius);
    line-height: 1;

    ${(props) => !props.isDisabled && `
        &:hover {
            box-shadow: inset 0 -3em var(--border-color);
        }
    `}
    ${(props) => props.isSelected && `
        color: var(--white-color);
        background-color: var(--secondary-color);
        border-color: var(--border-color);
        border-bottom-color: var(--secondary-color);
    `}
    ${(props) => props.isDisabled && `
        color: rgba(255, 255, 255, 0.5);
        cursor: not-allowed;
    `}
`;

const Amount = Styled.span`
    font-size: 12px;
    margin-left: 6px;
`;
const Badge = Styled.span`
    position: absolute;
    top: 0;
    right: -4px;
    padding: 2px 4px;
    font-size: 10px;
    color: white;
    background-color: #ff0033;
    border-radius: 9999px;
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
    const {
        className, variant, icon, message,
        status, url, value, index, selected,
        amount, badge, isDisabled,
        tooltip, tooltipVariant,
        canEdit, canDelete, onClick, onAction,
    } = props;

    const elementRef = React.useRef();
    const { showTooltip, hideTooltip } = Store.useAction("core");

    const Component  = Components[variant] || LightItem;
    const id         = status ? Status.getID(status) : (url ? NLS.url(url) : (value || index));
    const hasAmount  = amount !== undefined;
    const isSelected = Boolean(!isDisabled && selected && String(selected) === String(id));
    const canAction  = Boolean(!isDisabled && onAction);
    const showEdit   = Boolean(canEdit && canAction);
    const showDelete = Boolean(canDelete && canAction);


    // Handles the Action
    const handleAction = (action) => {
        if (!isDisabled && onAction) {
            onAction(Action.get(action), id);
        }
    };

    // Handle the Click
    const handleClick = () => {
        if (!isDisabled && onClick) {
            onClick(value);
        } else {
            handleAction("TAB");
        }
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

    // Handles the Tooltip
    const handleTooltip = () => {
        if (tooltip) {
            showTooltip(elementRef, tooltipVariant, tooltip);
        }
    };


    // Do the Render
    return <Component
        ref={elementRef}
        className={`tab-item ${isSelected ? "tab-selected" : ""} ${className}`}
        isSelected={isSelected}
        isDisabled={isDisabled}
        onClick={handleClick}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    >
        {showEdit && <EditIcon
            icon="edit"
            onClick={handleEdit}
        />}
        {icon ? <Icon icon={icon} /> : NLS.get(message)}
        {hasAmount && <Amount className="tab-amount">{amount}</Amount>}
        {!!badge && <Badge className="tab-badge">{badge}</Badge>}
        {showDelete && <DeleteIcon
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
    isHidden       : PropTypes.bool,
    className      : PropTypes.string,
    variant        : PropTypes.string,
    status         : PropTypes.string,
    url            : PropTypes.string,
    value          : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    index          : PropTypes.number,
    selected       : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    icon           : PropTypes.string,
    message        : PropTypes.string,
    amount         : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    badge          : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    tooltip        : PropTypes.string,
    tooltipVariant : PropTypes.string,
    isDisabled     : PropTypes.bool,
    isSelected     : PropTypes.bool,
    canEdit        : PropTypes.bool,
    canDelete      : PropTypes.bool,
    onClick        : PropTypes.func,
    onAction       : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabItem.defaultProps = {
    isHidden       : false,
    className      : "",
    variant        : Brightness.LIGHT,
    value          : "",
    index          : 0,
    tooltip        : "",
    tooltipVariant : "bottom",
    isDisabled     : false,
    isSelected     : false,
    canEdit        : false,
    canDelete      : false,
};

export default TabItem;
