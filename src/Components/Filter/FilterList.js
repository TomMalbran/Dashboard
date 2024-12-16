import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";



// Styles
const Container = Styled.div.attrs(({ columns, showButton }) => ({ columns, showButton }))`
    --filter-columns: ${(props) => props.columns};

    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(var(--filter-columns), 1fr);
    gap: var(--main-gap);
    height: calc(var(--filter-height) - var(--main-gap));
    margin: 0 0 var(--main-gap) 0;
    padding: var(--filter-padding);
    background-color: var(--filter-background);
    border: var(--filter-border);
    border-radius: var(--border-radius);
    overflow-y: hidden;
    overflow-x: auto;

    ${(props) => props.showButton && `
        grid-template-columns: repeat(var(--filter-columns), 1fr) calc(37px + var(--filter-right));
        padding-right: 0;
    `}
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
    position: sticky;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: calc(1px - var(--main-gap));
    padding-left: var(--main-gap);
    padding-right: var(--filter-right);
    background-color: var(--filter-background);
    z-index: 1;
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
    const {
        className, values, initialData,
        onChange, onFilter, clearButton, hideButton, children,
    } = props;


    // Parse the Items
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


    // The Current State
    const [ loading, setLoading ] = React.useState(false);
    const [ data,    setData    ] = React.useState(initial);
    const [ errors,  setErrors  ] = React.useState(initialErrors);


    // Handles the Input Change
    const handleChange = (name, value, secName, secValue, onInputChange) => {
        let filterData = { ...data, [name] : value };
        if (secName) {
            filterData = { ...filterData, [secName] : secValue };
        }
        if (onInputChange) {
            const newData = onInputChange(data, value);
            if (newData) {
                filterData = newData;
            }
        }
        if (onChange) {
            onChange(filterData);
        }
        setData(filterData);
        setErrors({ ...errors, [name] : "" });
        return filterData;
    };

    // Handles the Update
    const handleUpdate = (type, name, value, secName, secValue, onInputChange) => {
        const filterData = handleChange(name, value, secName, secValue, onInputChange);
        if (type === "select") {
            handleSubmit(filterData);
        }
    };

    // Handles the Clear
    const handleClear = async (name, value, secName, secValue) => {
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

    // Handles the Filter
    const handleFilter = (hasClear) => {
        if (hasClear) {
            setData({ ...initialData });
            handleSubmit({ ...initialData });
        } else {
            handleSubmit();
        }
    };


    // Variables
    const hasClear   = clearButton && JSON.stringify(data) !== JSON.stringify(initialData);
    const showButton = !hideButton || hasClear;


    // Do the Render
    return <Container
        className={`${className} no-scrollbars`}
        columns={items.length}
        showButton={showButton}
    >
        {items.map((item) => <FilterField
            {...item}
            key={item.name}
            value={data[item.name]}
            error={errors[item.name]}
            onChange={(name, value, secName, secValue) => handleUpdate(item.type, name, value, secName, secValue, item.onChange)}
            onSubmit={handleSubmit}
            onClear={handleClear}
        />)}
        {showButton && <Div>
            <FilterButton
                variant="outlined"
                isDisabled={loading}
                icon={hasClear ? "close" : "filter"}
                onClick={() => handleFilter(hasClear)}
            />
        </Div>}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
FilterList.propTypes = {
    className   : PropTypes.string,
    onChange    : PropTypes.func,
    onFilter    : PropTypes.func.isRequired,
    values      : PropTypes.object,
    initialData : PropTypes.object,
    clearButton : PropTypes.bool,
    hideButton  : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
FilterList.defaultProps = {
    clearButton : false,
    hideButton  : false,
};

export default FilterList;
