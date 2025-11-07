import React                from "react";
import PropTypes            from "prop-types";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Period               from "../../Utils/Period";
import DateTime             from "../../Utils/DateTime";

// Components
import FilterField          from "./FilterField";
import PromptDialog         from "../Dialogs/PromptDialog";



/**
 * The Filter Period
 * @param {object} props
 * @returns {React.ReactElement}
 */
function FilterPeriod(props) {
    const { variant, data, errors, onUpdate, onSubmit, hideClear } = props;

    // The Current State
    const [ showDates,  setShowDates  ] = React.useState(false);
    const [ currPeriod, setCurrPeriod ] = React.useState("");


    // Handles the Change
    const handleChange = (filters, period) => {
        if (period === Period.SELECT) {
            setCurrPeriod(filters.period);
            return null;
        }
        return { ...filters, period, fromDate : "", toDate : "" };
    };

    // Handles the Clear
    const handleClear = (filters, period) => {
        return { ...filters, period : "", fromDate : "", toDate : "" };
    };

    // Handles the Submit
    const handleSubmit = (filters) => {
        if (filters.period === Period.SELECT) {
            setShowDates(true);
        } else {
            onSubmit(filters);
        }
    };

    // Handles the Submit of the Dates Dialog
    const handleSubmitDates = (fromDate, toDate) => {
        setShowDates(false);
        onSubmit({ ...data, fromDate, toDate, period : Period.CUSTOM });
    };

    // Handles the Close of the Dates Dialog
    const handleCloseDates = () => {
        setShowDates(false);
        onUpdate("period", currPeriod);
    };


    // The Options
    const options = React.useMemo(() => {
        if (variant === "last") {
            return Period.getLastSelect(true);
        }
        return Period.getSimpleSelect();
    }, [ variant ]);

    // The Period Text
    const periodText = React.useMemo(() => {
        if (data.period === Period.CUSTOM) {
            const fromDate = DateTime.formatDate(data.fromDate, "dashes");
            const toDate   = DateTime.formatDate(data.toDate, "dashes");
            return NLS.format("DATE_RANGE", fromDate, toDate);
        }
        return "";
    }, [ data.period, data.fromDate, data.toDate ]);


    // Do the Render
    return <>
        <FilterField
            data={data}
            errors={errors}
            onUpdate={onUpdate}
            onChange={handleChange}
            onClear={handleClear}
            onSubmit={handleSubmit}
            type="select"
            name="period"
            icon="time"
            options={options}
            placeholder="PERIOD_NAME"
            customKey={Period.SELECT}
            customText="PERIOD_SELECT"
            noneValue={Period.CUSTOM}
            noneText={periodText}
            hideClear={hideClear}
            withCustom
        />

        <PromptDialog
            open={showDates}
            icon="date-range"
            title="GENERAL_DATE_RANGE"
            message="GENERAL_DATE_RANGE_FILTER"
            inputType="date"
            inputLabel="GENERAL_FROM_DATE"
            initialValue={data.fromDate}
            secInputType="date"
            secInputLabel="GENERAL_TO_DATE"
            secInitialValue={data.toDate}
            secRequired
            onSubmit={handleSubmitDates}
            onClose={handleCloseDates}
        />
    </>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
FilterPeriod.propTypes = {
    variant   : PropTypes.string,
    data      : PropTypes.object.isRequired,
    errors    : PropTypes.object.isRequired,
    onUpdate  : PropTypes.func.isRequired,
    onSubmit  : PropTypes.func.isRequired,
    hideClear : PropTypes.bool,
};

export default FilterPeriod;
