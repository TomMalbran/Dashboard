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
    grid-template-columns: repeat(var(--filter-columns), 1fr) 0.1fr;
    grid-gap: 8px;
    height: var(--filter-height);
    margin: 0 0 8px 0;
    padding: 12px;
    background-color: var(--lighter-gray);
    border-radius: var(--border-radius);

    @media (max-width: 700px) {
        overflow-y: hidden;
        overflow-x: auto;
    }
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



/**
 * The Filter List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FilterList(props) {
    const { labelInside, values, initialData, onFilter, children } = props;

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
    const handleChange = (name, value) => {
        const newData = { ...data, [name] : value };
        setData(newData);
        setErrors({ ...errors, [name] : "" });
        return newData;
    };

    // Handles the Input Search
    const handleSearch = (id, idValue, name, nameValue) => {
        setData({ ...data, [id] : idValue, [name] : nameValue });
        setErrors({ ...errors, [name] : "" });
    };

    // Handles the Submit
    const handleSubmit = async (sendData = data) => {
        setLoading(true);
        setErrors(initialErrors);
        try {
            await onFilter(sendData);
            setLoading(false);
        } catch (errors) {
            setLoading(false);
            setErrors(errors);
        }
    };

    // Handles the Clear
    const handleClear = async (name, value) => {
        const sendData = handleChange(name, value);
        handleSubmit(sendData);
    };


    return <Container columns={items.length}>
        {items.map((item) => <FilterField
            {...item}
            key={item.name}
            value={data[item.name]}
            error={errors[item.name]}
            onChange={handleChange}
            onSearch={handleSearch}
            onSubmit={handleSubmit}
            onClear={handleClear}
            labelInside={labelInside}
        />)}
        <Div labelInside={labelInside}>
            <FilterButton
                variant="outlined"
                isDisabled={loading}
                onClick={handleSubmit}
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
FilterList.propTypes = {
    onFilter    : PropTypes.func.isRequired,
    labelInside : PropTypes.bool,
    values      : PropTypes.object,
    initialData : PropTypes.object,
    fetch       : PropTypes.func,
    params      : PropTypes.object,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
FilterList.defaultProps = {
    labelInside : false,
};

export default FilterList;
