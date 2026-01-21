import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Store                from "../../Core/Store";
import Utils                from "../../Utils/Utils";



// Styles
const Container = Styled.li.attrs(({ twoLines, hasClick }) => ({ twoLines, hasClick }))`
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

    background-color: var(--stats-background);
    color: var(--stats-color);
    border: var(--stats-border);
    border-radius: var(--stats-border-radius);

    ${(props) => props.twoLines && `
        flex-direction: column;
        justify-content: center;
        height: auto;
    `}
    ${(props) => props.hasClick && "cursor: pointer;"}
`;

const Text = Styled.span.attrs(({ twoLines }) => ({ twoLines }))`
    font-weight: 400;
    ${(props) => props.twoLines ? "margin-bottom: 2px;" : "margin-right: 8px;"}
`;

const Value = Styled.span.attrs(({ variant }) => ({ variant }))`
    font-size: 22px;
    font-weight: 400;
    white-space: nowrap;
    color: var(--stats-color-value);
`;



/**
 * The Stat Item Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function StatItem(props) {
    const {
        twoLines, message, tooltip, value,
        decimals, percent, isPrice, isPercent, onClick,
    } = props;

    const elementRef = React.useRef();
    const { showTooltip, hideTooltip } = Store.useAction("core");

    // Handles the Tooltip
    const handleTooltip = () => {
        if (tooltip) {
            showTooltip(elementRef, "bottom", tooltip);
        }
    };

    // Handles the Click
    const handleClick = () => {
        if (!onClick) {
            return;
        }
        if (tooltip) {
            hideTooltip();
        }
        onClick();
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
    return <Container
        ref={elementRef}
        hasClick={!!onClick}
        onClick={handleClick}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    >
        <Text twoLines={twoLines}>
            {NLS.get(message)}
        </Text>
        <Value>
            {content}
        </Value>
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
StatItem.propTypes = {
    isHidden  : PropTypes.bool,
    message   : PropTypes.string.isRequired,
    tooltip   : PropTypes.string,
    value     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    decimals  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    percent   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    isPrice   : PropTypes.bool,
    isPercent : PropTypes.bool,
    twoLines  : PropTypes.bool,
    onClick   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
StatItem.defaultProps = {
    decimals  : 0,
    isHidden  : false,
    twoLines  : false,
    isPrice   : false,
    isPercent : false,
};

export default StatItem;
