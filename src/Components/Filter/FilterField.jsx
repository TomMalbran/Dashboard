import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import InputField           from "../Form/InputField";
import InputItem            from "../Form/InputItem";



// Styles
const Field = Styled(InputField).attrs(({ fieldMinWidth }) => ({ fieldMinWidth }))`
    --input-label-background: var(--filter-input-background);

    box-sizing: border-box;
    min-width: ${(props) => props.fieldMinWidth ? `${props.fieldMinWidth}px` : "120px"};
    margin: 0;

    .input-content {
        height: var(--filter-input-size);
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



/**
 * The Filter Field
 * @param {object} props
 * @returns {React.ReactElement}
 */
function FilterField(props) {
    const { name, type, data, errors, onChange, onClear, onUpdate, onSubmit, items } = props;


    // Handles the Change
    const handleChange = (type, name, value, secName, secValue, onInputChange) => {
        const filterData = onUpdate(name, value, secName, secValue, onInputChange);
        if (type === "select") {
            onSubmit(filterData);
        }
    };

    // Handles the Clear
    const handleClear = async (name, value, secName, secValue, onInputChange) => {
        const filterData = onUpdate(name, value, secName, secValue, onInputChange);
        onSubmit(filterData);
    };


    // Do the Render
    return <Field
        {...props}
        value={data[name]}
        error={errors[name]}
        onChange={(name, value, secName, secValue) => handleChange(type, name, value, secName, secValue, onChange)}
        onClear={(name, value, secName, secValue) => handleClear(name, value, secName, secValue, onClear)}
        onSubmit={onSubmit}
        label={undefined}
        withLabel={false}
        withBorder={false}
    >
        {items?.map((item) => <InputItem
            {...item.props}
            key={item.props.name}
            value={data[item.props.name]}
        />)}
    </Field>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
FilterField.propTypes = {
    name     : PropTypes.string.isRequired,
    type     : PropTypes.string.isRequired,
    data     : PropTypes.object.isRequired,
    errors   : PropTypes.object.isRequired,
    onChange : PropTypes.func,
    onClear  : PropTypes.func,
    onUpdate : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
    items    : PropTypes.arrayOf(PropTypes.object),
};

export default FilterField;
