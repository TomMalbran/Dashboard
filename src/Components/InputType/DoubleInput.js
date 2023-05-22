import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import InputContent         from "../Input/InputContent";
import InputField           from "../Form/InputField";



// Styles
const Container = Styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;

    .inputfield:first-child::after {
        content: "";
        position: absolute;
        top: calc(-4px - var(--input-label));
        bottom: calc(-4px - var(--input-vert-padding));
        right: -8px;
        border-right: 1px solid var(--input-border);
    }
`;



/**
 * The Double Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DoubleInput(props) {
    const {
        className, isFocused, isDisabled,
        onChange, onFocus, onBlur, children,
    } = props;

    const items = [];
    for (const [ , child ] of Utils.getVisibleChildren(children)) {
        items.push(child.props);
    }


    // Do the Render
    return <InputContent
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        withBorder
        withPadding
        withLabel
    >
        <Container>
            {items.map((item) => <InputField
                {...item}
                key={item.name}
                onChange={onChange}
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
 * @type {Object} propTypes
 */
DoubleInput.propTypes = {
    className  : PropTypes.string,
    isFocused  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    onChange   : PropTypes.func.isRequired,
    onFocus    : PropTypes.func,
    onBlur     : PropTypes.func,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DoubleInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
};

export default DoubleInput;
