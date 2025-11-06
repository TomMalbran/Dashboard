import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import InputField           from "../Form/InputField";
import InputItem            from "../Form/InputItem";
import IconLink             from "../Link/IconLink";



// Styles
const Container = Styled.div.attrs(({ columns, showButton }) => ({ columns, showButton }))`
    --filter-columns: ${(props) => props.columns};

    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(var(--filter-columns), 1fr);
    gap: var(--main-gap);
    height: var(--filter-input-size);
    margin: 0 0 var(--main-gap) 0;
    padding: var(--filter-padding);
    background-color: var(--filter-background);
    border: var(--filter-border);
    border-radius: var(--border-radius);
    overflow-y: hidden;
    overflow-x: auto;

    ${(props) => props.showButton && `
        grid-template-columns: repeat(var(--filter-columns), 1fr) calc(var(--filter-input-size) + var(--filter-right));
        padding-right: 0;
    `}
`;

const FilterField = Styled(InputField).attrs(({ fieldMinWidth }) => ({ fieldMinWidth }))`
    --input-label-background: var(--filter-input-background);

    box-sizing: border-box;
    min-width: ${(props) => props.fieldMinWidth ? `${props.fieldMinWidth}px` : "140px"};
    margin: 0;

    .input-content {
        padding: var(--input-padding);
        padding-top: var(--input-vert-padding) !important;
        background-color: var(--filter-input-background);
        border-radius: var(--border-radius);
        transition: all 0.2s;
        cursor: pointer;
    }
    &.inputfield-double > div > .input-content {
        padding: 0 !important;
    }
    .input-content .input-content {
        --input-height: var(--filter-input-size);
    }
    .input-clear {
        margin-top: -4px;
        margin-bottom: -4px;
        font-size: 16px;
    }
    input, select, textarea {
        background-color: var(--filter-input-background);
        transition: all 0.2s;
    }
    input[type="time"] {
        width: 80px;
    }
    input::placeholder {
        color: var(--font-lighter);
    }

    :hover {
        --filter-input-background: var(--filter-input-hover);
    }
`;

const FilterButton = Styled.div`
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

const FilterIcon = Styled(IconLink)`
    --link-size: calc(var(--filter-input-size) - 8px);
    --link-radius: var(--border-radius);
    --link-background: var(--filter-input-hover);

    font-size: 16px;
    padding: 4px;
    background-color: var(--filter-input-background);
`;



/**
 * The Filter List Component
 * @param {object} props
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
        for (const child of Utils.getVisibleChildren(children)) {
            items.push(child.props);
            if (child.props.type === "double") {
                for (const subChild of Utils.getVisibleChildren(child.props.children)) {
                    fields[subChild.props.name]        = "";
                    initialErrors[subChild.props.name] = "";
                }
            } else {
                fields[child.props.name]        = "";
                initialErrors[child.props.name] = "";
            }
        }
    }

    let initial = initialData || fields;
    initial = values ? { ...initial, ...values } : initial;


    // The Current State
    const [ loading, setLoading ] = React.useState(false);
    const [ data,    setData    ] = React.useState(initial);
    const [ errors,  setErrors  ] = React.useState(initialErrors);


    // Handle the Values change
    React.useEffect(() => {
        setData({ ...initial });
    }, [ JSON.stringify(values) ]);

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
        className={className}
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
            label={undefined}
            withLabel={false}
            withBorder={false}
        >
            {item?.children?.map((subItem) => <InputItem
                {...subItem.props}
                key={subItem.props.name}
                value={data[subItem.props.name]}
            />)}
        </FilterField>)}

        {showButton && <FilterButton>
            <FilterIcon
                variant="black"
                isDisabled={loading}
                icon={hasClear ? "filter-clear" : "filter"}
                onClick={() => handleFilter(hasClear)}
            />
        </FilterButton>}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
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
 * @type {object} defaultProps
 */
FilterList.defaultProps = {
    clearButton : false,
    hideButton  : false,
};

export default FilterList;
