import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul`
    list-style: none;
    margin: 0;
    padding-left: 16px;
    padding-bottom: 8px;
`;



/**
 * The Navigation List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SubNavigationList(props) {
    const { isHidden, className, onAction, onClose, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        onAction, onClose,
    }));


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Ul className={className}>
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
SubNavigationList.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    onAction  : PropTypes.func,
    onClose   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
SubNavigationList.defaultProps = {
    isHidden  : false,
    className : "",
};

export default SubNavigationList;
