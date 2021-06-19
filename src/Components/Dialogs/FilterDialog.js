import React                from "react";
import PropTypes            from "prop-types";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import EditDialog           from "./EditDialog";



/**
 * The Filter Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FilterDialog(props) {
    const { open, title, isLoading, initialData, data, onSubmit, onClose, children } = props;

    const hasFilter = !Utils.areObjectsEqual(initialData, data);

    return <EditDialog
        open={open}
        icon="filter"
        title={title}
        primary="GENERAL_FILTER"
        secondary={hasFilter ? "GENERAL_REMOVE_FILTER" : ""}
        onSubmit={() => onSubmit({ ...data })}
        onSecondary={() => onSubmit({ ...initialData })}
        onClose={onClose}
        isLoading={isLoading}
    >
        {children}
    </EditDialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
FilterDialog.propTypes = {
    open        : PropTypes.bool.isRequired,
    title       : PropTypes.string.isRequired,
    isLoading   : PropTypes.bool,
    initialData : PropTypes.object.isRequired,
    data        : PropTypes.object.isRequired,
    onSubmit    : PropTypes.func.isRequired,
    onClose     : PropTypes.func.isRequired,
    children    : PropTypes.any,
};

export default FilterDialog;
