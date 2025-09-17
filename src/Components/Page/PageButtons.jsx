import React                from "react";
import PropTypes            from "prop-types";

// Components
import PageFooter           from "./PageFooter";
import Button               from "../Form/Button";



/**
 * The Page Buttons
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PageButtons(props) {
    const { canEdit, isEdit, isDisabled, onSubmit, onDelete, onClose } = props;


    // Do the Render
    return <PageFooter>
        <Button
            isHidden={!canEdit}
            variant="primary"
            message="GENERAL_SAVE"
            onClick={() => onSubmit()}
            isDisabled={isDisabled}
        />
        <Button
            isHidden={!canEdit || !isEdit}
            variant="primary"
            message="GENERAL_DELETE"
            onClick={() => onDelete()}
        />
        <Button
            variant="cancel"
            message="GENERAL_CANCEL"
            onClick={() => onClose()}
        />
    </PageFooter>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PageButtons.propTypes = {
    canEdit    : PropTypes.bool,
    isEdit     : PropTypes.bool,
    isDisabled : PropTypes.bool,
    onSubmit   : PropTypes.func.isRequired,
    onDelete   : PropTypes.func,
    onClose    : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
PageButtons.defaultProps = {
    canEdit : true,
};

export default PageButtons;
