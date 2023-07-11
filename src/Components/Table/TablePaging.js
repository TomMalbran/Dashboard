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
    min-height: 32px;
`;

const TD = Styled.td`
    flex: 1 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 4px;
    font-size: 12px;
    background: var(--table-color);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
`;

const Rows = Styled.p`
    margin: 0 8px 0 0;

    @media (max-width: 700px) {
        display: none;
    }
`;

const Pages = Styled.p`
    margin: 0 16px 0 0;
`;

const PagingInput = Styled(InputField)`
    margin-right: 16px;

    & .input-content {
        background: transparent;
    }
    & .input-select.input-select {
        min-height: 24px;
        padding-left: 8px;
        line-height: 1;
        font-size: 12px;
        font-weight: normal;
        border: 1px solid var(--input-border);
        border-radius: var(--border-radius);
        background-color: var(--table-pages);
    }
    & .input-select.input-select:hover {
        border-color: var(--input-border-hover);
    }

    @media (max-width: 700px) {
        display: none;
    }
`;




/**
 * The Table Paging Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TablePaging(props) {
    const { colSpan, sort, total, fetch } = props;

    const rowOptions   = [ 10, 25, 50, 100, 250, 500 ].map((value) => ({ key : value, value }));
    const from         = total === 0 ? 0 : sort.page * sort.amount + 1;
    const to           = Math.min(total, (sort.page + 1) * sort.amount);
    const lastPage     = Math.ceil(total / sort.amount) - 1;
    const prevDisabled = sort.page === 0;
    const nextDisabled = sort.page >= lastPage;


    // Handles the Amount Change
    const handleAmount = (name, amount) => {
        fetch({ ...sort, page : 0, amount });
    };

    // Handles the Page Change
    const handlePage = (page) => {
        fetch({ ...sort, page });
    };


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
        handlePage(lastPage);
    };


    return <tfoot>
        <TR>
            <TD colSpan={colSpan} className="table-paging">
                <Rows>{NLS.get("GENERAL_ROWS_PER_PAGE")}</Rows>
                <PagingInput
                    type="select"
                    name="amount"
                    value={sort.amount}
                    onChange={handleAmount}
                    options={rowOptions}
                    withBorder={false}
                />
                <Pages>{NLS.format("GENERAL_PAGE_OF", String(from), String(to), total)}</Pages>

                <IconLink
                    variant="black"
                    icon="first"
                    onClick={handleFirstPage}
                    isDisabled={prevDisabled}
                    isSmall
                />
                <IconLink
                    variant="black"
                    icon="prev"
                    onClick={handlePrevPage}
                    isDisabled={prevDisabled}
                    isSmall
                />
                <IconLink
                    variant="black"
                    icon="next"
                    onClick={handleNextPage}
                    isDisabled={nextDisabled}
                    isSmall
                />
                <IconLink
                    variant="black"
                    icon="last"
                    onClick={handleLastPage}
                    isDisabled={nextDisabled}
                    isSmall
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
    fetch   : PropTypes.func,
    colSpan : PropTypes.number,
    sort    : PropTypes.object,
    total   : PropTypes.number.isRequired,
};

export default TablePaging;
