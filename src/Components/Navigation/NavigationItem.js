import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import NLS                  from "../../Core/NLS";

// Components
import MenuLink             from "../Link/MenuLink";
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div`
    position: relative;
    margin-bottom: 6px;

    &:hover > .icon {
        display: block;
    }
`;

const NavIcon = Styled(Icon)`
    display: none;
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    padding: 4px;
    font-size: 1.2em;
    cursor: pointer;
`;

const Span = Styled.span`
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
        elemID, isSelected, isDisabled, onAction, onClick, onClose, amount, canEdit, canDelete, children,
    } = props;

    const uri = url ? NLS.baseUrl(baseUrl, url) : (href || "");

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

    
    return <li>
        <Div>
            <MenuLink
                variant={variant}
                className={className}
                isSelected={isSelected || path === uri}
                isDisabled={isDisabled}
                message={message}
                html={html}
                href={uri}
                onClick={handleClick}
                icon={icon}
            />
            {amount !== undefined && <Span>{amount}</Span>}
            {canEdit && <NavIcon
                icon="edit"
                onClick={(e) => handleAction(e, "EDIT")}
            />}
            {canDelete && <NavIcon
                icon="delete"
                onClick={(e) => handleAction(e, "DELETE")}
            />}
        </Div>
        {children}
    </li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationItem.propTypes = {
    variant    : PropTypes.string,
    className  : PropTypes.string,
    path       : PropTypes.string,
    baseUrl    : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    html       : PropTypes.string,
    url        : PropTypes.string,
    href       : PropTypes.string,
    icon       : PropTypes.string,
    elemID     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onClick    : PropTypes.func,
    onAction   : PropTypes.func,
    onClose    : PropTypes.func,
    amount     : PropTypes.number,
    canEdit    : PropTypes.bool,
    canDelete  : PropTypes.bool,
    isSelected : PropTypes.bool,
    isDisabled : PropTypes.bool,
    isHidden   : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationItem.defaultProps = {
    className  : "",
    canEdit    : false,
    canDelete  : false,
    isSelected : false,
    isHidden   : false,
};

export default NavigationItem;
