import React                from "react";
import PropTypes            from "prop-types";

// Utils
import Period               from "../../Utils/Period";

// Components
import FilterList           from "./FilterList";
import FilterItem           from "./FilterItem";




/**
 * The Filter Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Filter(props) {
    const {
        hasSearch, hasCredential, hasPeriod,
        values, fetch, params, onFilter,
    } = props;

    // The Initial Data
    const initialData = {
        search         : "",
        credentialID   : 0,
        credentialName : "",
        period         : "",
        fromDate       : "",
        toDate         : "",
    };


    // Handles the Period Change
    const handlePeriod = (data, period) => {
        const fromDate = Period.getFromDate(period);
        const toDate   = Period.getToDate(period);
        return { ...data, period, fromDate, toDate };
    };


    // Do the Render
    return <FilterList
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
            label="GENERAL_USER"
            suggestID="credentialID"
            suggestFetch={fetch}
            suggestParams={params}
            shrinkLabel
        />

        <FilterItem
            isHidden={!hasPeriod}
            type="select"
            name="period"
            label="PERIOD_NAME"
            onChange={handlePeriod}
            options={Period.getSelect()}
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
    hasPeriod     : PropTypes.bool,
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
    hasPeriod     : false,
};

export default Filter;
