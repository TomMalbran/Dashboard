import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
import InputField           from "../Form/InputField";



// Styles
const TR = Styled.tr`
    display: flex;
    height: auto;
`;
const TD = Styled.td`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1 0 0;
    padding: 2px;
    background: var(--light-gray);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
`;

const Rows = Styled.p`
    margin: 0 16px 0 0;
`;
const Pages = Styled.p`
    margin: 0 16px 0 0;    
`;

const PagingInput = Styled(InputField)`
    .inputfield-input {
        margin-right: 16px;
        min-height: 28px;
        line-height: 1;
        font-size: 12px;
        font-weight: normal;
        background-color: var(--lighter-gray);
    }
`;



/**
 * The Table Paging Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TablePaging(props) {
    const { colSpan, sort, total, handlePage, handleAmount } = props;

    // Handles the First Page button
    const handleFirstPage = () => {
        handlePage(0);
    };

    // Handles the Prev Page button
    const handlePrevPage = () => {
        handlePage(sort.page - 1);
    };

    // Handles the Next Page button
    const handleNextPage = () => {
        handlePage(sort.page + 1);
    };

    // Handles the Last Page button
    const handleLastPage = () => {
        const page = Math.max(0, Math.ceil(total / sort.amount) - 1);
        handlePage(page);
    };


    const rowOptions   = [ 10, 25, 50, 100, 250, 500 ].map((value) => ({ key : value, value }));
    const from         = total === 0 ? 0 : sort.page * sort.amount + 1;
    const to           = Math.min(total, (sort.page + 1) * sort.amount);
    const prevDisabled = sort.page === 0;
    const nextDisabled = sort.page >= Math.ceil(total / sort.amount) - 1;

    return <tfoot>
        <TR>
            <TD colSpan={colSpan} className="table-paging">
                <Rows>{NLS.get("GENERAL_ROWS_PER_PAGE")}</Rows>
                <PagingInput
                    type="select"
                    name="amount"
                    value={sort.amount}
                    onChange={(name, value) => handleAmount(value)}
                    options={rowOptions}
                    noMargin
                />
                <Pages>{NLS.format("GENERAL_PAGE_OF", String(from), String(to), total)}</Pages>

                <IconLink
                    variant="light"
                    icon="first"
                    onClick={handleFirstPage}
                    isDisabled={prevDisabled}
                />
                <IconLink
                    variant="light"
                    icon="prev"
                    onClick={handlePrevPage}
                    isDisabled={prevDisabled}
                />
                <IconLink
                    variant="light"
                    icon="next"
                    onClick={handleNextPage}
                    isDisabled={nextDisabled}
                />
                <IconLink
                    variant="light"
                    icon="last"
                    onClick={handleLastPage}
                    isDisabled={nextDisabled}
                />
            </TD>
        </TR>
    </tfoot>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TablePaging.propTypes = {
    handlePage   : PropTypes.func,
    handleAmount : PropTypes.func,
    colSpan      : PropTypes.number,
    sort         : PropTypes.object,
    total        : PropTypes.number.isRequired,
};

export default TablePaging;
