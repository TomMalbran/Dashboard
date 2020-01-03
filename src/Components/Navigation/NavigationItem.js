import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import HyperLink            from "../Common/HyperLink";
import Icon                 from "../Common/Icon";



// Styles
const Li = Styled.li`
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
 * Handles the Click Event
 * @param {Object}     props
 * @param {MouseEvent} e
 * @returns {Void}
 */
function handleClick(props, e) {
    const { onClose, onClick } = props;
    if (onClose) {
        onClose(e);
    }
    if (onClick) {
        onClick(e);
    }
}



/**
 * The Navigation Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationItem(props) {
    const {
        variant, className, path, baseUrl, message, url, href, icon,
        canDelete, onDelete,
    } = props;
    
    return <Li>
        <HyperLink
            variant={`menu-${variant}`}
            className={className}
            message={message}
            href={url ? NLS.url(url, baseUrl) : (href || "")}
            onClick={(e) => handleClick(props, e)}
            path={path}
            icon={icon}
        />
        {canDelete && <Icon
            variant="delete"
            onClick={onDelete}
        />}
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationItem.propTypes = {
    variant   : PropTypes.string,
    className : PropTypes.string,
    path      : PropTypes.string,
    baseUrl   : PropTypes.string,
    message   : PropTypes.string,
    url       : PropTypes.string,
    href      : PropTypes.string,
    icon      : PropTypes.string,
    onClose   : PropTypes.func,
    onClick   : PropTypes.func,
    canDelete : PropTypes.bool,
    onDelete  : PropTypes.func,
    isHidden  : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationItem.defaultProps = {
    className : "",
};

export default NavigationItem;
