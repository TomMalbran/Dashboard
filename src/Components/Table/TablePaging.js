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
const TFoot = Styled.tfoot.attrs(({ isEditable }) => ({ isEditable }))`
    border: var(--table-border-outer);
    background: var(--table-background);
    border-top-right-radius: var(--table-radius-inner);
    border-top-left-radius: var(--table-radius-inner);
    border-bottom-right-radius: var(--table-radius-outer);
    border-bottom-left-radius: var(--table-radius-outer);
    padding-right: var(--table-header-right);

    ${(props) => props.isEditable && `
        position: sticky;
        bottom: 0;
        z-index: 2;
    `}
`;

const TR = Styled.tr`
    display: flex;
    height: auto;
    min-height: 32px;

    position: sticky;
    right: 0;
    z-index: 1000;
`;

const GrowCell = Styled.td`
    display: flex;
    flex: 1 0 auto;
`;

const PagingCell = Styled.td.attrs(({ isEditable }) => ({ isEditable }))`
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 4px;
    font-size: 12px;

    ${(props) => props.isEditable && `
        position: sticky;
        right: 0;
        z-index: 2;
    `}
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
    display: flex;
    align-items: center;
    margin-right: 16px;
    border: 1px solid var(--border-color-medium);
    border-radius: var(--border-radius);

    .icon {
        font-size: 18px;
        margin-left: -2px;
        margin-bottom: -4px;
    }
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
    padding: 4px 0px 4px 8px;
    font-size: 11px;
    font-weight: normal;
    line-height: 1;
    color: var(--table-color);
    border: none;
    background-color: transparent;
    outline: none;
`;



/**
 * The Table Paging Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TablePaging(props) {
    const { isEditable, sort, total, fetch } = props;

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
    return <TFoot isEditable={isEditable}>
        <TR>
            <GrowCell />
            <PagingCell className="table-paging" isEditable={isEditable}>
                <Rows>{NLS.get("GENERAL_ROWS_PER_PAGE")}</Rows>
                <Amount>
                    <Select value={sort.amount} onChange={handleAmount}>
                        {rowOptions.map((option) => <option key={option.key} value={option.key}>
                            {option.value}
                        </option>)}
                    </Select>
                    <Icon icon="expand" />
                </Amount>
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
            </PagingCell>
        </TR>
    </TFoot>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
TablePaging.propTypes = {
    fetch      : PropTypes.func,
    isEditable : PropTypes.bool,
    sort       : PropTypes.object,
    total      : PropTypes.number.isRequired,
};

export default TablePaging;
