import React                from "react";
import PropTypes            from "prop-types";

// Core
import Action               from "../../Core/Action";
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";


.tabs-item {
    position: relative;
    flex-grow: 1;
    box-sizing: border-box;
    text-align: center;
    color: var(--light-color);
    cursor: pointer;
    transition: all 0.2s;
}


/**
 * The Tab Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TabItem(props) {
    const { className, message, value, index, isDisabled, isSelected, canDelete, onClick } = props;

    // Handle the Click
    const handleClick = () => {
        if (!isDisabled && onClick) {
            onClick(Action.get("TAB"), value || index);
        }
    };

    // Handle the Delete
    const handleDelete = (e) => {
        if (!isDisabled && canDelete && onClick) {
            onClick(Action.get("DELETE"), value || index);
        }
        e.stopPropagation();
        e.preventDefault();
    };

    const classes = new ClassList(className, "tabs-item");
    classes.addIf("tabs-disabled", isDisabled);
    classes.addIf("tabs-selected", !isDisabled && isSelected);
    
    return <div className={classes.get()} onClick={handleClick}>
        {NLS.get(message)}
        {canDelete && isSelected && <Icon
            icon="close"
            onClick={handleDelete}
        />}
    </div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TabItem.propTypes = {
    value      : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    index      : PropTypes.number,
    className  : PropTypes.string,
    message    : PropTypes.string.isRequired,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    canDelete  : PropTypes.bool,
    onClick    : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabItem.defaultProps = {
    value      : "",
    index      : 0,
    className  : "",
    isDisabled : false,
    isSelected : false,
    canDelete  : false,
};

export default TabItem;
