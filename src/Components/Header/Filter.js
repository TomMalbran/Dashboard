import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";



// Styles
const Container = Styled.div.attrs(({ columns }) => ({ columns }))`
    --filter-columns: ${(props) => props.columns};
    display: flex;
    box-sizing: border-box;
    height: var(--filter-height);
    margin: 0 0 16px 0;
    padding: 12px 8px;
    background-color: var(--lighter-gray);
    border-radius: var(--border-radius);
`;

const FilterField = Styled(InputField)`
    flex-grow: 1;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 0;
    box-sizing: border-box;
    width: calc((100% - 81px) / var(--filter-columns));

    .textfield-label {
        background-color: var(--lighter-gray);
    }
`;

const Div = Styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-right: 0;
    margin-top: 6px;
    width: 90px;
`;

const FilterButton = Styled(Button)`
    font-size: 12px;
    height: 37px;
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
    const { hasSearch, hasCredential, labelInside, fetch, params, onFilter } = props;
    const columns = hasCredential || hasSearch ? 3 : 2;

    const [ loading, setLoading ] = React.useState(false);
    const [ data,    setData    ] = React.useState(initialData);
    const [ errors,  setErrors  ] = React.useState(initialErrors);

    // Handles the Input Change
    const handleChange = (name, value) => {
        setData({ ...data, [name] : value });
        setErrors({ ...errors, [name] : "" });
    };

    // Handles the Input Suggest
    const handleSuggest = (id, idValue, name, value) => {
        setData({ ...data, [id] : idValue, [name] : value });
        setErrors({ ...errors, [id] : "" });
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
            onSuggest={handleSuggest}
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
            labelInside={labelInside}
        />
        <FilterField
            type="date"
            name="toDate"
            label="GENERAL_TO_DATE"
            value={data.toDate}
            error={errors.toDate}
            onChange={handleChange}
            labelInside={labelInside}
        />
        <Div>
            <FilterButton
                variant="outlined"
                isDisabled={loading}
                onClick={handleClick}
                message="GENERAL_FILTER"
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
