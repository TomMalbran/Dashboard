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

    // The State
    const [ selected, setSelected ] = React.useState(initial);

    // Handle the Click
    const handleClick = (id, isDisabled) => () => {
        if (!isDisabled) {
            setSelected(id);
            if (onChange) {
                onChange(id);
            }
        }
    };

    const items = Utils.cloneChildren(children, (child, index) => {
        const id = child.props.value || index;
        return {
            isFist     : id === 0,
            isSelected : id === selected,
            onClick    : handleClick(id, child.props.isDisabled),
        };
    });
    
    
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
    initial   : PropTypes.number,
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
