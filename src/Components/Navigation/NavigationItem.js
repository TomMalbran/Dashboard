import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import HyperLink            from "../Common/HyperLink";
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div`
    position: relative;
    margin-bottom: 6px;

    & > .icon {
        display: none;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        padding: 4px;
        cursor: pointer;
    }
    &:hover > .icon {
        display: block;
    }
`;



/**
 * The Navigation Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationItem(props) {
    const {
        variant, className, path, baseUrl, message, html, url, href, icon,
        isSelected, onClick, onClose, canEdit, onEdit, canDelete, onDelete, children,
    } = props;

    const uri = url ? NLS.url(url, baseUrl) : (href || "");

    const handleClick = (e) => {
        if (onClose) {
            onClose(e);
        }
        if (onClick) {
            onClick(e);
        }
    };
    
    return <li>
        <Div>
            <HyperLink
                variant={`menu-${variant}`}
                className={className}
                isSelected={isSelected || path === uri}
                message={message}
                html={html}
                href={uri}
                onClick={handleClick}
                icon={icon}
            />
            {canEdit && <Icon
                icon="edit"
                onClick={onEdit}
            />}
            {canDelete && <Icon
                icon="delete"
                onClick={onDelete}
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
    message    : PropTypes.string,
    html       : PropTypes.string,
    url        : PropTypes.string,
    href       : PropTypes.string,
    icon       : PropTypes.string,
    onClose    : PropTypes.func,
    onClick    : PropTypes.func,
    canEdit    : PropTypes.bool,
    onEdit     : PropTypes.func,
    canDelete  : PropTypes.bool,
    onDelete   : PropTypes.func,
    isSelected : PropTypes.bool,
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
