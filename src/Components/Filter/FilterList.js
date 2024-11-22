import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";



// Styles
const Container = Styled.div.attrs(({ columns }) => ({ columns }))`
    --filter-columns: ${(props) => props.columns};

    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(var(--filter-columns), 1fr) 37px;
    gap: var(--main-gap);
    height: calc(var(--filter-height) - var(--main-gap));
    margin: 0 0 var(--main-gap) 0;
    padding: var(--filter-padding);
    background-color: var(--filter-background);
    border: var(--filter-border);
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

const Div = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 0;
`;

const FilterButton = Styled(Button)`
    font-size: 12px;
    padding: 6px 8px;
`;



/**
 * The Filter List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FilterList(props) {
    const { className, values, initialData, onFilter, children } = props;

    const items         = [];
    const fields        = {};
    const initialErrors = {};

    if (children) {
        for (const [ , child ] of Utils.getVisibleChildren(children)) {
            items.push(child.props);
            fields[child.props.name]   = "";
            initialErrors[child.props.name] = "";
        }
    }

    let initial = initialData || fields;
    initial = values ? { ...initial, ...values } : initial;

    const [ loading, setLoading ] = React.useState(false);
    const [ data,    setData    ] = React.useState(initial);
    const [ errors,  setErrors  ] = React.useState(initialErrors);


    // Handles the Input Change
    const handleChange = (name, value, secName, secValue, onChange) => {
        let filterData = { ...data, [name] : value };
        if (secName) {
            filterData = { ...filterData, [secName] : secValue };
        }
        if (onChange) {
            filterData = onChange(data, value);
        }
        setData(filterData);
        setErrors({ ...errors, [name] : "" });
        return filterData;
    };

    // Handles the Update
    const handleUpdate = async (name, value, secName, secValue) => {
        const filterData = handleChange(name, value, secName, secValue);
        handleSubmit(filterData);
    };

    // Handles the Submit
    const handleSubmit = async (filterData = data) => {
        setLoading(true);
        setErrors(initialErrors);
        try {
            await onFilter(filterData);
            setLoading(false);
        } catch (errors) {
            setLoading(false);
            setErrors(errors);
        }
    };


    // Do the Render
    return <Container
        className={`${className} no-scrollbars`}
        columns={items.length}
    >
        {items.map((item) => <FilterField
            {...item}
            key={item.name}
            value={data[item.name]}
            error={errors[item.name]}
            onChange={(name, value, secName, secValue) => handleChange(name, value, secName, secValue, item.onChange)}
            onSubmit={handleSubmit}
            onClear={handleUpdate}
        />)}
        <Div>
            <FilterButton
                variant="outlined"
                isDisabled={loading}
                onClick={() => handleSubmit()}
                icon="filter"
            />
        </Div>
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
FilterList.propTypes = {
    className   : PropTypes.string,
    onFilter    : PropTypes.func.isRequired,
    values      : PropTypes.object,
    initialData : PropTypes.object,
    fetch       : PropTypes.func,
    params      : PropTypes.object,
    children    : PropTypes.any,
};

export default FilterList;
