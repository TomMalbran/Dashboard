import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import Navigate             from "../../Core/Navigate";
import Utils                from "../../Utils/Utils";

// Components
import MenuLink             from "../Link/MenuLink";
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div`
    position: relative;
    margin-bottom: 6px;

    &:hover > .nav-actions {
        display: flex;
    }
`;

const NavActions = Styled.div.attrs(({ variant }) => ({ variant }))`
    display: none;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 4px;
    border-radius: var(--border-radius);
    transform: translateY(-50%);

    ${(props) => props.variant === Brightness.DARK && `
        background-color: var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.LIGHT && `
        background-color: rgba(0, 0, 0, 0.1);
    `}

    .icon {
        padding: 2px;
    }
`;

const NavIcon = Styled(Icon)`
    padding: 4px;
    font-size: 1.2em;
    cursor: pointer;
`;

const NavAmount = Styled.span`
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    padding: 4px;
    font-size: 1.2em;
`;



/**
 * The Navigation Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationItem(props) {
    const {
        variant, className, message, html, url, href, icon,
        elemID, isSelected, isDisabled, onAction, onClick, onClose, amount,
        canEdit, canDelete, canCollapse, isCollapsed, collapseOnSelect, children,
    } = props;

    const isSelect = Navigate.useSelect();

    // Returns true if the Menu should be selected
    const shouldSelect = () => {
        if (isSelected) {
            return isSelected;
        }
        if (url) {
            return isSelect(url);
        }
        return false;
    };

    // Handles the Click
    const handleClick = (e) => {
        if (isDisabled) {
            return;
        }
        if (onClose) {
            onClose(e);
        }
        if (onClick) {
            onClick(e);
        } else if (onAction) {
            handleAction(e, "VIEW");
        }
    };

    // Handles the Action
    const handleAction = (e, action) => {
        if (!isDisabled && onAction) {
            onAction(Action.get(action), elemID);
        }
        e.stopPropagation();
        e.preventDefault();
    };

    // Handle the variables
    const hasActions   = canEdit || canDelete || canCollapse || collapseOnSelect;
    const selected     = shouldSelect();
    const showChildren = collapseOnSelect ? selected : (canCollapse ? !isCollapsed : true);
    const items        = Utils.cloneChildren(children, () => ({ variant }));
    const menuUrl      = Navigate.useMenuUrl(url || "");


    return <li>
        <Div>
            <MenuLink
                variant={variant}
                className={className}
                isSelected={selected}
                isDisabled={isDisabled}
                message={message}
                html={html}
                href={url ? menuUrl : href}
                onClick={handleClick}
                icon={icon}
            />
            {amount !== undefined && <NavAmount>{amount}</NavAmount>}
            {hasActions && <NavActions className="nav-actions" variant={variant}>
                {canCollapse && <NavIcon
                    icon={isCollapsed ? "closed" : "open"}
                    onClick={(e) => handleAction(e, "COLLAPSE")}
                />}
                {collapseOnSelect && <NavIcon
                    icon={selected ? "closed" : "open"}
                    onClick={handleClick}
                />}
                {canEdit && <NavIcon
                    icon="edit"
                    onClick={(e) => handleAction(e, "EDIT")}
                />}
                {canDelete && <NavIcon
                    icon="delete"
                    onClick={(e) => handleAction(e, "DELETE")}
                />}
            </NavActions>}
        </Div>
        {showChildren && items}
    </li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationItem.propTypes = {
    isHidden         : PropTypes.bool,
    variant          : PropTypes.string,
    className        : PropTypes.string,
    message          : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    html             : PropTypes.string,
    url              : PropTypes.string,
    href             : PropTypes.string,
    icon             : PropTypes.string,
    elemID           : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onClick          : PropTypes.func,
    onAction         : PropTypes.func,
    onClose          : PropTypes.func,
    amount           : PropTypes.number,
    canEdit          : PropTypes.bool,
    canDelete        : PropTypes.bool,
    canCollapse      : PropTypes.bool,
    isCollapsed      : PropTypes.bool,
    collapseOnSelect : PropTypes.bool,
    isSelected       : PropTypes.bool,
    isDisabled       : PropTypes.bool,
    children         : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationItem.defaultProps = {
    isHidden         : false,
    className        : "",
    canEdit          : false,
    canDelete        : false,
    canCollapse      : false,
    isCollapsed      : false,
    collapseOnSelect : false,
    isSelected       : false,
    isDisabled       : false,
};

export default NavigationItem;
