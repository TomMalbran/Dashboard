import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import InputContent         from "../Input/InputContent";
import InputField           from "../Form/InputField";



// Styles
const Container = Styled.div.attrs(({ withLabel }) => ({ withLabel }))`
    width: 100%;
    display: flex;
    align-items: center;

    .inputfield:first-child::after {
        content: "";
        position: absolute;
        border-right: 1px solid var(--input-border);
    }

    ${(props) => props.withLabel ? `
        gap: 16px;

        .inputfield,
        .inputfield input {
            height: 20px;
        }

        .inputfield:first-child::after {
            top: calc(-2px - var(--input-label));
            bottom: calc(-2px - var(--input-vert-padding));
            right: -8px;
        }
    ` : `
        .input-content {
            min-height: calc(var(--input-height) - 2px);
            padding: var(--input-padding);
            padding-top: var(--input-label) !important;
        }

        .inputfield:first-child::after {
            top: 0;
            bottom: 0;
            right: 0;
        }
    `}
`;



/**
 * The Double Input Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function DoubleInput(props) {
    const {
        className, isFocused, isDisabled, withLabel,
        onChange, onFocus, onBlur, children,
    } = props;

    const items = [];
    for (const child of Utils.getVisibleChildren(children)) {
        items.push(child.props);
    }


    // Do the Render
    return <InputContent
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        withLabel={withLabel}
        withPadding={withLabel}
        withBorder
    >
        <Container withLabel={withLabel}>
            {items.map((item) => <InputField
                {...item}
                key={item.name}
                onChange={item.onChange || onChange}
                isDisabled={isDisabled}
                withBorder={false}
                onFocus={onFocus}
                onBlur={onBlur}
                withPadding
                withLabel
                fullWidth
            />)}
        </Container>
    </InputContent>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
DoubleInput.propTypes = {
    className  : PropTypes.string,
    isFocused  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    withLabel  : PropTypes.bool,
    onChange   : PropTypes.func.isRequired,
    onFocus    : PropTypes.func,
    onBlur     : PropTypes.func,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
DoubleInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
};

export default DoubleInput;
