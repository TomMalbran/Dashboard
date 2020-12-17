import React                from "react";
import PropTypes            from "prop-types";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import IconLink             from "../Link/IconLink";



/**
 * The PDF Navigation Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function PDFNavigation(props) {
    const { currentPage, totalPages, onChange } = props;

    if (!totalPages) {
        return <React.Fragment />;
    }
    
    // Handles the Prev Page button
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onChange(currentPage - 1);
        }
    };

    // Handles the Next Page button
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onChange(currentPage + 1);
        }
    };


    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage >= totalPages;

    return <>
        <p>{Utils.getPageText(currentPage, totalPages)}</p>
        <IconLink
            className="left-space"
            variant="light"
            icon="prev"
            onClick={handlePrevPage}
            isDisabled={prevDisabled}
        />
        <IconLink
            className="right-space"
            variant="light"
            icon="next"
            onClick={handleNextPage}
            isDisabled={nextDisabled}
        />
    </>;
}
    
/**
 * The Property Types
 * @typedef {Object} propTypes
 */
PDFNavigation.propTypes = {
    currentPage : PropTypes.number,
    totalPages  : PropTypes.number,
    onChange    : PropTypes.func,
};

export default PDFNavigation;
