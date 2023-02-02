import React                from "react";
import PropTypes            from "prop-types";

// Components
import FilterList           from "./FilterList";
import FilterItem           from "./FilterItem";




/**
 * The Filter Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Filter(props) {
    const { hasSearch, hasCredential, labelInside, values, fetch, params, onFilter } = props;

    // The Initial Data
    const initialData = {
        search         : "",
        credentialID   : 0,
        credentialName : "",
        fromDate       : "",
        toDate         : "",
    };


    return <FilterList
        labelInside={labelInside}
        initialData={initialData}
        values={values}
        onFilter={onFilter}
    >
        <FilterItem
            isHidden={!hasSearch}
            name="search"
            label="GENERAL_SEARCH"
            hasClear
            shrinkLabel
        />
        <FilterItem
            isHidden={!hasCredential}
            name="credentialName"
            label="USERS_SINGULAR"
            suggestID="credentialID"
            suggestFetch={fetch}
            suggestParams={params}
            shrinkLabel
        />
        <FilterItem
            type="date"
            name="fromDate"
            label="GENERAL_FROM_DATE"
            hasClear
        />
        <FilterItem
            type="date"
            name="toDate"
            label="GENERAL_TO_DATE"
            hasClear
        />
    </FilterList>;
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
