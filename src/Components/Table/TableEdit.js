import React                from "react";
import PropTypes            from "prop-types";

// Dashboard
import EditDialog           from "Dashboard/Components/Dialogs/EditDialog";
import SortableList         from "Dashboard/Components/Common/SortableList";



/**
 * The Table Edit Dialog
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TableEdit(props) {
    const { open, columns, onSubmit, onClose } = props;


    // The Current State
    const [ list, setList ] = React.useState([]);

    // Update the data on Open
    React.useEffect(() => {
        setList(columns);
    }, [ open ]);

    // Handles the Visibility
    const handleVisibility = (index, isVisible) => {
        const newList  = [ ...list ];
        newList[index] = { ...list[index], isVisible };
        setList(newList);
    };


    // Do the Render
    return <EditDialog
        open={open}
        icon="edit"
        title="GENERAL_EDIT_COLUMNS"
        onSubmit={() => onSubmit(list)}
        onClose={onClose}
        isNarrow
    >
        <SortableList
            list={list}
            onSort={setList}
            onVisibility={handleVisibility}
        />
    </EditDialog>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TableEdit.propTypes = {
    open     : PropTypes.bool.isRequired,
    onSubmit : PropTypes.func.isRequired,
    onClose  : PropTypes.func.isRequired,
    columns  : PropTypes.array,
};

export default TableEdit;
