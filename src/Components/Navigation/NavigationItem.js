import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import NLS                  from "../../Core/NLS";

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
        variant, className, path, baseUrl, message, html, url, href, icon,
        elemID, isSelected, isDisabled, usePrefix, onAction, onClick, onClose, amount,
        canEdit, canDelete, canCollapse, isCollapsed, children,
    } = props;

    const uri        = url ? NLS.baseUrl(baseUrl, url) : (href || "");
    const hasActions = canEdit || canDelete || canCollapse;

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

    // Returns true if the Menu should be selected
    const shouldSelect = () => {
        if (isSelected) {
            return isSelected;
        }
        if (usePrefix) {
            return path.startsWith(uri);
        }
        return path === uri;
    }


    return <li>
        <Div>
            <MenuLink
                variant={variant}
                className={className}
                isSelected={shouldSelect()}
                isDisabled={isDisabled}
                message={message}
                html={html}
                href={uri}
                onClick={handleClick}
                icon={icon}
            />
            {amount !== undefined && <NavAmount>{amount}</NavAmount>}
            {hasActions && <NavActions className="nav-actions" variant={variant}>
                {canCollapse && <NavIcon
                    icon={isCollapsed ? "closed" : "open"}
                    onClick={(e) => handleAction(e, "COLLAPSE")}
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
        {children}
    </li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationItem.propTypes = {
    isHidden    : PropTypes.bool,
    variant     : PropTypes.string,
    className   : PropTypes.string,
    path        : PropTypes.string,
    baseUrl     : PropTypes.string,
    message     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    html        : PropTypes.string,
    url         : PropTypes.string,
    href        : PropTypes.string,
    icon        : PropTypes.string,
    elemID      : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onClick     : PropTypes.func,
    onAction    : PropTypes.func,
    onClose     : PropTypes.func,
    amount      : PropTypes.number,
    canEdit     : PropTypes.bool,
    canDelete   : PropTypes.bool,
    canCollapse : PropTypes.bool,
    isCollapsed : PropTypes.bool,
    isSelected  : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    usePrefix   : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationItem.defaultProps = {
    isHidden    : false,
    className   : "",
    canEdit     : false,
    canDelete   : false,
    canCollapse : false,
    isCollapsed : false,
    isSelected  : false,
    isDisabled  : false,
};

export default NavigationItem;
