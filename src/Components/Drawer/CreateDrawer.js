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
        open, className, logo, message,
        onClose, onAction, children,
    } = props;

    const items = Utils.cloneChildren(children, () => ({ onAction }));


    // Do the Render
    return <Drawer
        open={open}
        className={className}
        message={message || "GENERAL_CREATE"}
        logo={logo}
        onClose={onClose}
    >
        {items}
    </Drawer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
CreateDrawer.propTypes = {
    open      : PropTypes.bool.isRequired,
    className : PropTypes.string,
    logo      : PropTypes.string,
    message   : PropTypes.string,
    onClose   : PropTypes.func.isRequired,
    onAction  : PropTypes.func.isRequired,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
CreateDrawer.defaultProps = {
    className : "",
};

export default CreateDrawer;
