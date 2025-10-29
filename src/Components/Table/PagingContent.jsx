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

const PageIcon = Styled(IconLink).attrs(({ isDisabled }) => ({ isDisabled }))`
    ${(props) => props.isDisabled && `
        --link-color: var(--darker-gray);
        --link-background: transparent;
    `}
`;



/**
 * The Paging Content Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function PagingContent(props) {
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
    return <>
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

        <PageIcon
            variant="black"
            icon="first"
            onClick={handleFirstPage}
            isDisabled={prevDisabled}
            isSmall
        />
        <PageIcon
            variant="black"
            icon="prev"
            onClick={handlePrevPage}
            isDisabled={prevDisabled}
            isSmall
        />
        <PageIcon
            variant="black"
            icon="next"
            onClick={handleNextPage}
            isDisabled={nextDisabled}
            isSmall
        />
        <PageIcon
            variant="black"
            icon="last"
            onClick={handleLastPage}
            isDisabled={nextDisabled}
            isSmall
        />
    </>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
PagingContent.propTypes = {
    fetch : PropTypes.func,
    sort  : PropTypes.object,
    total : PropTypes.number.isRequired,
};

export default PagingContent;
