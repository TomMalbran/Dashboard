import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";



// Styles
const Container = Styled.div.attrs(({ columns }) => ({ columns }))`
    --filter-columns: ${(props) => props.columns};
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(var(--filter-columns), 1fr) 0.1fr;
    grid-gap: 8px;
    height: var(--filter-height);
    margin: 0 0 16px 0;
    padding: 12px;
    background-color: var(--lighter-gray);
    border-radius: var(--border-radius);
    overflow-y: hidden;
    overflow-x: auto;
`;

const FilterField = Styled(InputField)`
    box-sizing: border-box;
    margin: 0;
    min-width: 140px;

    .textfield-label {
        background-color: var(--lighter-gray);
    }
`;

const Div = Styled.div.attrs(({ labelInside }) => ({ labelInside }))`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-right: 0;
    ${(props) => !props.labelInside ? "margin-top: 6px;" : ""}
`;

const FilterButton = Styled(Button).attrs(({ labelInside }) => ({ labelInside }))`
    font-size: 12px;
    height: ${(props) => props.labelInside ? "43px" : "37px"};
`;



// The Initial Data
const initialData = {
    search         : "",
    credentialID   : 0,
    credentialName : "",
    fromDate       : "",
    toDate         : "",
};
const initialErrors = {
    search       : "",
    credentialID : "",
    fromDate     : "",
    toDate       : "",
};



/**
 * The Filter Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Filter(props) {
    const { hasSearch, hasCredential, labelInside, values, fetch, params, onFilter } = props;

    const columns = hasCredential || hasSearch ? 3 : 2;
    const initial = values ? { ...initialData, ...values } : initialData;

    const [ loading, setLoading ] = React.useState(false);
    const [ data,    setData    ] = React.useState(initial);
    const [ errors,  setErrors  ] = React.useState(initialErrors);

    // Handles the Input Change
    const handleChange = (name, value) => {
        setData({ ...data, [name] : value });
        setErrors({ ...errors, [name] : "" });
    };

    // Handles the Input Search
    const handleSearch = (id, idValue, name, nameValue) => {
        setData({ ...data, [id] : idValue, [name] : nameValue });
        setErrors({ ...errors, [name] : "" });
    };

    // Handles the On Click event
    const handleClick = async () => {
        setLoading(true);
        setErrors(initialErrors);
        try {
            await onFilter(data);
            setLoading(false);
        } catch (errors) {
            setLoading(false);
            setErrors(errors);
        }
    };


    return <Container columns={columns}>
        <FilterField
            isHidden={!hasSearch}
            name="search"
            label="GENERAL_SEARCH"
            value={data.search}
            error={errors.search}
            onChange={handleChange}
            onSubmit={handleClick}
            labelInside={labelInside}
            shrinkLabel
        />
        <FilterField
            isHidden={!hasCredential}
            name="credentialName"
            label="USERS_SINGULAR"
            suggestID="credentialID"
            suggestFetch={fetch}
            suggestParams={params}
            value={data.credentialName}
            error={errors.credentialID}
            onChange={handleChange}
            onSearch={handleSearch}
            onSubmit={handleClick}
            labelInside={labelInside}
            shrinkLabel
        />
        <FilterField
            type="date"
            name="fromDate"
            label="GENERAL_FROM_DATE"
            value={data.fromDate}
            error={errors.fromDate}
            onChange={handleChange}
            onSubmit={handleClick}
            labelInside={labelInside}
        />
        <FilterField
            type="date"
            name="toDate"
            label="GENERAL_TO_DATE"
            value={data.toDate}
            error={errors.toDate}
            onChange={handleChange}
            onSubmit={handleClick}
            labelInside={labelInside}
        />
        <Div labelInside={labelInside}>
            <FilterButton
                variant="outlined"
                isDisabled={loading}
                onClick={handleClick}
                message="GENERAL_FILTER"
                labelInside={labelInside}
            />
        </Div>
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Filter.propTypes = {
    onFilter      : PropTypes.func.isRequired,
    hasCredential : PropTypes.bool,
    hasSearch     : PropTypes.bool,
    labelInside   : PropTypes.bool,
    values        : PropTypes.object,
    fetch         : PropTypes.func,
    params        : PropTypes.object,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Filter.defaultProps = {
    hasCredential : false,
    hasSearch     : false,
    labelInside   : false,
};

export default Filter;
