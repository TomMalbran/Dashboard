import React                from "react";
import PropTypes            from "prop-types";

// Components
import MenuLink             from "../Link/MenuLink";



/**
 * The Drawer Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DrawerItem(props) {
    const { type, message, onClick, onAction } = props;

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (onAction) {
            onAction(type);
        }
    };


    return <MenuLink
        variant="light"
        message={message}
        onClick={handleClick}
        icon={type}
    />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DrawerItem.propTypes = {
    type     : PropTypes.string.isRequired,
    message  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
    onClick  : PropTypes.func,
    onAction : PropTypes.func,
};

export default DrawerItem;
