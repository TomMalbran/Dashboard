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
    const { className, onChange, children } = props;

    // The State
    const [ selected, setSelected ] = React.useState(0);

    // Handle the Click
    const handleClick = (item, isDisabled) => () => {
        if (!isDisabled) {
            setSelected(item);
            if (onChange) {
                onChange(item);
            }
        }
    };

    const items = Utils.cloneChildren(children, (child, key) => ({
        isFist     : key === 0,
        isSelected : key === selected,
        onClick    : handleClick(key, child.props.isDisabled),
    }));
    
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
    onChange  : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
AccordionList.defaultProps = {
    className : "",
};

export default AccordionList;
