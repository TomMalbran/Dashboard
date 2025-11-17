import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import InputField           from "../Form/InputField";
import InputItem            from "../Form/InputItem";



// Styles
const Field = Styled(InputField).attrs(({ fieldMinWidth, fieldMaxWidth }) => ({ fieldMinWidth, fieldMaxWidth }))`
    --input-label-background: var(--filter-input-background);
    --input-border: var(--filter-input-background);

    box-sizing: border-box;
    min-width: ${(props) => props.fieldMinWidth ? `${props.fieldMinWidth}px` : "120px"};
    max-width: ${(props) => props.fieldMaxWidth ? `${props.fieldMaxWidth}px` : "100%"};
    margin: 0;

    .input-content {
        height: calc(var(--filter-input-size) - 2px);
        min-height: 0;
        background-color: var(--filter-input-background);
        transition: all 0.2s;
        cursor: pointer;
    }
    &.inputfield-double > div > .input-content {
        padding: 0 !important;
    }
    &.inputfield-double .inputfield .input-content {
        border: none;
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
`;



/**
 * The Filter Field
 * @param {object} props
 * @returns {React.ReactElement}
 */
function FilterField(props) {
    const {
        name, type, value, error, data, errors,
        onChange, onClear, onUpdate, onSubmit, items,
    } = props;


    // Handles the Change
    const handleChange = (type, name, value, secName, secValue, onInputChange) => {
        const filterData = onUpdate(name, value, secName, secValue, onInputChange);
        if (type === "select" && onSubmit && filterData) {
            onSubmit(filterData);
        }
    };

    // Handles the Clear
    const handleClear = async (name, value, secName, secValue, onInputChange) => {
        const filterData = onUpdate(name, value, secName, secValue, onInputChange);
        if (onSubmit && filterData) {
            onSubmit(filterData);
        }
    };


    // Do the Render
    return <Field
        {...props}
        value={value || (data?.[name] ?? "")}
        error={error || (errors?.[name] ?? "")}
        onChange={(name, value, secName, secValue) => handleChange(type, name, value, secName, secValue, onChange)}
        onClear={(name, value, secName, secValue) => handleClear(name, value, secName, secValue, onClear)}
        onSubmit={onSubmit}
        isSmall
    >
        {items?.map((item) => <InputItem
            {...item.props}
            key={item.props.name}
            value={data?.[item.props.name] ?? ""}
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
    value    : PropTypes.string,
    error    : PropTypes.string,
    data     : PropTypes.object,
    errors   : PropTypes.object,
    onChange : PropTypes.func,
    onClear  : PropTypes.func,
    onUpdate : PropTypes.func.isRequired,
    onSubmit : PropTypes.func,
    items    : PropTypes.arrayOf(PropTypes.object),
};

export default FilterField;
