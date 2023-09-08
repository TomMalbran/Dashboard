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
    --tab-disabled-color: rgba(255, 255, 255, 0.5);
    --tab-selected-font: var(--white-color);

    position: relative;
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    border-radius: var(--border-radius);
    transition: all 0.2s;
    cursor: pointer;

    &:hover .icon {
        display: block;
    }

    ${(props) => (!props.isSelected && !props.isDisabled) && `
        &:hover {
            box-shadow: inset 0 0 0 2em var(--tab-hover-color);
        }
    `}
    ${(props) => props.isSelected && `
        && {
            box-shadow: inset 0 -3em var(--tab-selected-color);
            color: var(--tab-selected-font);
        }
    `}
    ${(props) => props.isDisabled && `
        && {
            color: var(--tab-disabled-color);
            cursor: not-allowed;
        }
    `}
`;

const LightItem = Styled(Item)`
    --tab-hover-color: var(--light-gray);
    --tab-selected-color: var(--primary-color);

    height: calc(var(--tabs-table) - var(--main-gap));
    padding: 6px 12px;
    color: var(--title-color);
    background-color: var(--lighter-gray);
`;

const DarkItem = Styled(Item)`
    --tab-hover-color: var(--border-color-dark);
    --tab-selected-color: var(--secondary-color);

    height: var(--tabs-dialog);
    padding: 0 24px;
    color: var(--white-color);
    background-color: var(--tertiary-color);
`;

const DarkerItem = Styled(Item)`
    --tab-hover-color: var(--border-color-dark);
    --tab-selected-color: var(--border-color-dark);

    height: var(--tabs-dialog);
    padding: 0 24px;
    color: var(--white-color);
    background-color: var(--primary-color);
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
    [Brightness.LIGHT]  : LightItem,
    [Brightness.DARK]   : DarkItem,
    [Brightness.DARKER] : DarkerItem,
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
    const isSelected = Boolean(!isDisabled && selected !== undefined && String(selected) === String(id));
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
            onClick(url || value);
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
