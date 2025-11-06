import React                from "react";
import PropTypes            from "prop-types";

// Utils
import Period               from "../../Utils/Period";

// Components
import FilterList           from "./FilterList";
import FilterItem           from "./FilterItem";




/**
 * The Filter Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Filter(props) {
    const {
        hasSearch, hasCredential, hasPeriod,
        values, fetch, params, onFilter, children,
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
            icon="search"
            placeholder="GENERAL_SEARCH"
            hasClear
        />
        <FilterItem
            isHidden={!hasCredential}
            type="suggest"
            name="credentialName"
            icon="user"
            placeholder="GENERAL_USER"
            suggestID="credentialID"
            suggestFetch={fetch}
            suggestParams={params}
        />

        {children}

        <FilterItem
            isHidden={!hasPeriod}
            type="select"
            name="period"
            icon="time"
            onChange={handlePeriod}
            options={Period.getSelect()}
        />
        <FilterItem
            type="date"
            name="fromDate"
            prefixText="GENERAL_FROM"
            hasClear
        />
        <FilterItem
            type="date"
            name="toDate"
            prefixText="GENERAL_TO"
            hasClear
        />
    </FilterList>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Filter.propTypes = {
    onFilter      : PropTypes.func.isRequired,
    hasCredential : PropTypes.bool,
    hasSearch     : PropTypes.bool,
    hasPeriod     : PropTypes.bool,
    values        : PropTypes.object,
    fetch         : PropTypes.func,
    params        : PropTypes.object,
    children      : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Filter.defaultProps = {
    hasCredential : false,
    hasSearch     : false,
    hasPeriod     : false,
};

export default Filter;
