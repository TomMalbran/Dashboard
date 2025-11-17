import React                from "react";
import PropTypes            from "prop-types";

// Dashboard
import EditDialog           from "../Dialogs/EditDialog";
import DialogMessage        from "../Dialog/DialogMessage";
import InputField           from "../Form/InputField";
import InputItem            from "../Form/InputItem";



/**
 * The Filter Date Dialog
 * @param {object} props
 * @returns {React.ReactElement}
 */
function FilterDate(props) {
    const { open, withHour, currData, onSubmit, onClose } = props;


    // The Initial Data
    const initialData = {
        fromDate : currData?.fromDate || "",
        fromHour : currData?.fromHour || "",
        toDate   : currData?.toDate   || "",
        toHour   : currData?.toHour   || "",
    };

    // The Current State
    const [ data, setData ] = React.useState({ ...initialData });


    // Update the data on Open
    React.useEffect(() => {
        setData({ ...initialData, ...currData });
    }, [ open ]);

    // Handles the Input Change
    const handleChange = (name, value) => {
        setData((prev) => ({
            ...prev,
            [name] : value,
        }));
    };

    // Handles the Submit
    const handleSubmit = () => {
        onSubmit(data.fromDate, data.fromHour, data.toDate, data.toHour);
    };

    // Is the Form Disabled
    const isDisabled = React.useMemo(() => {
        return !data.fromDate && !data.toDate;
    }, [ data.fromDate, data.toDate ]);


    // Do the Render
    return <EditDialog
        open={open}
        icon="date-range"
        title="GENERAL_DATE_RANGE"
        isDisabled={isDisabled}
        onSubmit={handleSubmit}
        onClose={onClose}
        isNarrow
    >
        <DialogMessage message="GENERAL_DATE_RANGE_FILTER" />
        <InputField
            isHidden={withHour}
            name="fromDate"
            type="date"
            label="GENERAL_FROM_DATE"
            maxValue="2999-12-31"
            value={data.fromDate}
            onChange={handleChange}
            hasClear
        />
        <InputField
            isHidden={withHour}
            name="toDate"
            type="date"
            label="GENERAL_TO_DATE"
            maxValue="2999-12-31"
            value={data.toDate}
            onChange={handleChange}
            hasClear
        />

        <InputField
            isHidden={!withHour}
            type="double"
            name="fromDate"
        >
            <InputItem
                type="date"
                name="fromDate"
                label="GENERAL_FROM_DATE"
                maxValue="2999-12-31"
                value={data.fromDate}
                onChange={handleChange}
                hasClear
            />
            <InputItem
                type="time"
                name="fromHour"
                label="GENERAL_FROM_HOUR"
                value={data.fromHour}
                onChange={handleChange}
                hasClear
            />
        </InputField>
        <InputField
            isHidden={!withHour}
            type="double"
            name="toDate"
        >
            <InputItem
                type="date"
                name="toDate"
                label="GENERAL_TO_DATE"
                maxValue="2999-12-31"
                value={data.toDate}
                onChange={handleChange}
                hasClear
            />
            <InputItem
                type="time"
                name="toHour"
                label="GENERAL_TO_HOUR"
                value={data.toHour}
                onChange={handleChange}
                hasClear
            />
        </InputField>
    </EditDialog>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
FilterDate.propTypes = {
    open     : PropTypes.bool.isRequired,
    withHour : PropTypes.bool.isRequired,
    currData : PropTypes.object.isRequired,
    onSubmit : PropTypes.func.isRequired,
    onClose  : PropTypes.func.isRequired,
};

export default FilterDate;
