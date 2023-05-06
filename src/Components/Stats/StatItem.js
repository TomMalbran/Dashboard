import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Store                from "../../Core/Store";
import Utils                from "../../Utils/Utils";

// Variants
const Variant = {
    LIGHT    : "light",
    PRIMARY  : "primary",
    OUTLINED : "outlined",
};



// Styles
const Li = Styled.li.attrs(({ variant, twoLines }) => ({ variant, twoLines }))`
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    height: var(--stats-height);
    min-width: 100px;
    padding: 0 12px;
    line-height: 1;
    border-radius: var(--border-radius);
    overflow: hidden;

    ${(props) => props.variant === Variant.LIGHT && `
        background-color: var(--light-gray);
    `}
    ${(props) => props.variant === Variant.PRIMARY && `
        background-color: var(--primary-color);
        color: rgba(255, 255, 255, 0.7);
    `}
    ${(props) => props.variant === Variant.OUTLINED && `
        border: 1px solid var(--darker-gray);
    `}

    ${(props) => props.twoLines && `
        flex-direction: column;
        justify-content: center;
        height: auto;
    `}
`;

const Text = Styled.span.attrs(({ twoLines }) => ({ twoLines }))`
    font-size: 14px;
    font-weight: 400;
    ${(props) => props.twoLines ? "margin-bottom: 2px;" : "margin-right: 8px;"}
`;

const Value = Styled.span.attrs(({ variant }) => ({ variant }))`
    font-size: 22px;
    font-weight: 400;
    white-space: nowrap;

    ${(props) => props.variant === Variant.PRIMARY && `
        color: white;
    `}
    ${(props) => props.variant === Variant.OUTLINED && `
        color: var(--primary-color);
    `}
`;



/**
 * The Stat Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function StatItem(props) {
    const {
        variant, twoLines, message, tooltip, value,
        decimals, percent, isPrice, isPercent,
    } = props;

    const elementRef = React.useRef();
    const { showTooltip, hideTooltip } = Store.useAction("core");

    // Handles the Tooltip
    const handleTooltip = () => {
        if (tooltip) {
            showTooltip(elementRef, "bottom", tooltip);
        }
    };


    let content = value;
    if (!isNaN(value)) {
        content = Utils.formatNumber(value, decimals);
    }
    if (isPrice) {
        content = `$ ${content}`;
    }
    if (isPercent) {
        content = `${content}%`;
    }
    if (percent) {
        content = `${content} (${percent}%)`;
    }


    // Do the Render
    return <Li
        ref={elementRef}
        variant={variant}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    >
        <Text twoLines={twoLines}>
            {NLS.get(message)}
        </Text>
        <Value variant={variant}>
            {content}
        </Value>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatItem.propTypes = {
    isHidden  : PropTypes.bool,
    variant   : PropTypes.string,
    message   : PropTypes.string.isRequired,
    tooltip   : PropTypes.string,
    value     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    decimals  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    percent   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    isPrice   : PropTypes.bool,
    isPercent : PropTypes.bool,
    twoLines  : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
StatItem.defaultProps = {
    decimals   : 0,
    isHidden   : false,
    variant    : Variant.LIGHT,
    twoLines   : false,
    isPrice    : false,
    isPercent  : false,
};

export default StatItem;
