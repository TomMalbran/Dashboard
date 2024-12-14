import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";

// Variants
const Variant = {
    LIGHT    : "light",
    OUTLINED : "outlined",
};



// Styles
const Container = Styled.li.attrs(({ variant, hasClick, hasClose, isDisabled }) => ({ variant, hasClick, hasClose, isDisabled }))`
    padding: 2px 8px;
    font-size: 12px;
    border-radius: var(--border-radius);

    ${(props) => props.variant === Variant.LIGHT && `
        background-color: var(--light-gray);
    `}
    ${(props) => props.variant === Variant.OUTLINED && `
        background-color: white;
        border: 1px solid var(--border-color-light);
    `}

    ${(props) => (props.hasClick && !!props.isDisabled) && `
        cursor: pointer;
    `}

    ${(props) => props.hasClose && `
        display: flex;
        align-items: center;
        gap: 4px;
        padding-right: 4px;
    `}

    ${(props) => !props.isDisabled && `
        transition: all 0.2s;
        &:hover {
            background-color: var(--lighter-gray);
        }
    `}
`;



/**
 * The Chip Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ChipItem(props) {
    const {
        isHidden, className, variant, message,
        isDisabled, onClick, onClose,
    } = props;


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container
        className={className}
        variant={variant}
        hasClick={!!onClick}
        hasClose={!!onClose}
        isDisabled={isDisabled}
        onClick={onClick}
    >
        {NLS.get(message)}
        {!!onClose && <IconLink
            variant="black"
            icon="close"
            onClick={() => onClose()}
            isTiny
        />}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
ChipItem.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    variant    : PropTypes.string,
    message    : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    isDisabled : PropTypes.bool,
    onClick    : PropTypes.func,
    onClose    : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ChipItem.defaultProps = {
    isHidden   : false,
    className  : "",
    variant    : Variant.LIGHT,
    message    : "",
    isDisabled : false,
};

export default ChipItem;
