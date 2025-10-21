import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";
import Responsive           from "../../Core/Responsive";

// Components
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const TFoot = Styled.tfoot`
    position: sticky;
    bottom: 0;
    z-index: 2;

    border: var(--table-border-outer);
    background: var(--table-background);
    border-top-right-radius: var(--table-radius-inner);
    border-top-left-radius: var(--table-radius-inner);
    border-bottom-right-radius: var(--table-radius-outer);
    border-bottom-left-radius: var(--table-radius-outer);
`;

const TRow = Styled.tr`
    position: sticky;
    right: 0;
    z-index: 1000;

    display: flex;
    height: auto;
    min-height: 32px;
`;

const GrowCell = Styled.td`
    display: flex;
    flex: 1 0 auto;
`;

const PagingCell = Styled.td`
    position: sticky;
    right: 0;
    z-index: 2;

    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 4px;
    font-size: 12px;
`;

const Rows = Styled.p`
    margin: 0 8px 0 0;

    @media (max-width: ${Responsive.WIDTH_FOR_MOBILE}px) {
        display: none;
    }
`;

const Pages = Styled.p`
    margin: 0 16px 0 0;
`;

const Amount = Styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 16px;
    border: 1px solid var(--border-color-medium);
    border-radius: var(--border-radius);

    :hover {
        border-color: var(--input-border-hover);
    }

    @media (max-width: ${Responsive.WIDTH_FOR_MOBILE}px) {
        display: none;
    }
`;

const Select = Styled.select`
    appearance: none;
    display: block;
    padding: 4px 18px 4px 8px;
    font-size: 11px;
    font-weight: normal;
    line-height: 1;
    color: var(--table-color);
    border: none;
    background-color: transparent;
    outline: none;
`;

const SelectIcon = Styled(Icon)`
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;

const TableIcon = Styled(IconLink).attrs(({ isDisabled }) => ({ isDisabled }))`
    ${(props) => props.isDisabled && `
        --link-color: var(--darker-gray);
        --link-background: transparent;
    `}
`;



/**
 * The Table Paging Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function TablePaging(props) {
    const { sort, total, fetch } = props;


    // Variables
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


    // Do the Render
    return <TFoot>
        <TRow>
            <GrowCell />
            <PagingCell className="table-paging">
                <Rows>{NLS.get("GENERAL_ROWS_PER_PAGE")}</Rows>
                <Amount>
                    <Select
                        name="rowsPerPage"
                        value={sort.amount}
                        onChange={handleAmount}
                    >
                        {rowOptions.map((option) => <option
                            key={option.key}
                            value={option.key}
                        >
                            {option.value}
                        </option>)}
                    </Select>
                    <SelectIcon
                        icon="expand"
                        size="18"
                    />
                </Amount>
                <Pages>{NLS.format("GENERAL_PAGE_OF", String(from), String(to), total)}</Pages>

                <TableIcon
                    variant="black"
                    icon="first"
                    onClick={handleFirstPage}
                    isDisabled={prevDisabled}
                    isSmall
                />
                <TableIcon
                    variant="black"
                    icon="prev"
                    onClick={handlePrevPage}
                    isDisabled={prevDisabled}
                    isSmall
                />
                <TableIcon
                    variant="black"
                    icon="next"
                    onClick={handleNextPage}
                    isDisabled={nextDisabled}
                    isSmall
                />
                <TableIcon
                    variant="black"
                    icon="last"
                    onClick={handleLastPage}
                    isDisabled={nextDisabled}
                    isSmall
                />
            </PagingCell>
        </TRow>
    </TFoot>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
TablePaging.propTypes = {
    fetch : PropTypes.func,
    sort  : PropTypes.object,
    total : PropTypes.number.isRequired,
};

export default TablePaging;
