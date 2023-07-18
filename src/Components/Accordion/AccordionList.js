import React                from "react";
import PropTypes            from "prop-types";

// Utils
import Utils                from "../../Utils/Utils";



/**
 * The Accordion List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AccordionList(props) {
    const { className, initial, onChange, children } = props;

    // The Current State
    const [ selected, setSelected ] = React.useState(initial);

    // Handle the Click
    const handleClick = (id, isDisabled) => () => {
        if (isDisabled) {
            return;
        }
        let newID = id;
        if (id === selected) {
            newID = "";
        }
        if (newID === selected) {
            return;
        }

        setSelected(newID);
        if (onChange) {
            onChange(newID);
        }
    };

    // Generate the Items
    const items = Utils.cloneChildren(children, (child, index) => {
        const id = child.props.value || index;
        return {
            number     : index + 1,
            isSelected : id === selected,
            onClick    : handleClick(id, child.props.isDisabled),
        };
    });


    // Do the Render
    return <div className={`accordion ${className}`}>
        {items}
    </div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
AccordionList.propTypes = {
    className : PropTypes.string,
    initial   : PropTypes.string,
    onChange  : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
AccordionList.defaultProps = {
    className : "",
    initial   : 0,
};

export default AccordionList;
