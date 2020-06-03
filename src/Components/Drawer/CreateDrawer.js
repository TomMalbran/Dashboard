import React                from "react";
import PropTypes            from "prop-types";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import Drawer               from "../Drawer/Drawer";



/**
 * The Create Drawer
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function CreateDrawer(props) {
    const {
        open, className, message, onClose, onAction, children,
        logo, logoWidth, logoHeight,
    } = props;

    const items = Utils.cloneChildren(children, () => ({ onAction }));

    return <Drawer
        open={open}
        className={className}
        message={message || "GENERAL_CREATE"}
        onClose={onClose}
        logo={logo}
        logoWidth={logoWidth}
        logoHeight={logoHeight}
    >
        {items}
    </Drawer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
CreateDrawer.propTypes = {
    open       : PropTypes.bool.isRequired,
    className  : PropTypes.string,
    message    : PropTypes.string,
    onClose    : PropTypes.func.isRequired,
    onAction   : PropTypes.func.isRequired,
    logo       : PropTypes.string,
    logoWidth  : PropTypes.number,
    logoHeight : PropTypes.number,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
CreateDrawer.defaultProps = {
    className : "",
};

export default CreateDrawer;
