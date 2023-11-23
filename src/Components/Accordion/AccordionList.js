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
    const { className, initial, selected, onChange, noClose, children } = props;


    // The Current State
    const [ selection, setSelection ] = React.useState(selected || initial);

    // Handle the Initial change
    React.useEffect(() => {
        if (initial) {
            setSelection(initial);
        }
    }, [ initial ]);

    // Handle the Selected change
    React.useEffect(() => {
        if (selected) {
            setSelection(selected);
        }
    }, [ selected ]);


    // Handle the Click
    const handleClick = (id, isDisabled) => () => {
        if (isDisabled) {
            return;
        }
        let newID = id;
        if (!noClose && id === selection) {
            newID = "";
        }
        if (newID === selection) {
            return;
        }

        setSelection(newID);
        if (onChange) {
            onChange(newID);
        }
    };

    // Generate the Items
    const items = Utils.cloneChildren(children.flat(), (child, index) => {
        const id = child.props.value || index;
        return {
            number     : index + 1,
            isSelected : id === selection,
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
    selected  : PropTypes.string,
    onChange  : PropTypes.func,
    noClose   : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
AccordionList.defaultProps = {
    className : "",
    initial   : "",
    selected  : "",
    noClose   : false,
};

export default AccordionList;
