import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";



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
    background: var(--table-background);
    border: var(--table-border-outer);
    border-top-right-radius: var(--table-radius-inner);
    border-top-left-radius: var(--table-radius-inner);
    border-bottom-right-radius: var(--table-radius-outer);
    border-bottom-left-radius: var(--table-radius-outer);
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

const Select = Styled.select`
    appearance: none;
    display: block;
    margin-right: 16px;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: normal;
    line-height: 1;
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius);
    padding-right: 16px !important;
    background-color: transparent;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAICAYAAAAIloRgAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAdElEQVQ4T2P4//8/AyGsLK8ggE8NIXmYXoIWgRQCDbuAy0CQOEiekINB8sRa9h+bhTCLgDTQLMIhRKxlIJ+hWIhsEbV9Bg4qJAsd0Ph445SkOIPGG7KFIF9iDVp8wUlUMMIMQA86YlMhyT5Ds3ABqRaB9AMArxAryYUamQYAAAAASUVORK5CYII=);
    background-position: right -3px center;
    background-size: auto;
    background-repeat: no-repeat;
    outline: none;

    :hover {
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
    const handleAmount = (e) => {
        fetch({ ...sort, page : 0, amount : e.target.value });
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
                <Select value={sort.amount} onChange={handleAmount}>
                    {rowOptions.map((option) => <option key={option.key} value={option.key}>
                        {option.value}
                    </option>)}
                </Select>
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
