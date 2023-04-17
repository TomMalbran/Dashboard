import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Store                from "../../Core/Store";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Li = Styled.li.attrs(({ outlined, twoLines }) => ({ outlined, twoLines }))`
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: var(--stats-height);
    min-width: 100px;
    padding: 0 12px;
    line-height: 1;
    border-radius: var(--border-radius);

    ${(props) => props.outlined ? `
        border: 1px solid var(--darker-gray);
    ` : `
        background-color: var(--light-gray);
    `}

    ${(props) => props.twoLines && `
        flex-direction: column;
        height: auto;
    `}
`;

const B = Styled.b.attrs(({ twoLines }) => ({ twoLines }))`
    font-size: 14px;
    font-weight: 400;
    ${(props) => props.twoLines ? "margin-bottom: 2px;" : "margin-right: 8px;"}
`;
const Span = Styled.span.attrs(({ usePrimary }) => ({ usePrimary }))`
    font-size: 20px;
    font-weight: 400;
    ${(props) => props.usePrimary && "color: var(--primary-color)"};
`;



/**
 * The Stat Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function StatItem(props) {
    const {
        message, tooltip, value, decimals, percent, isPrice, isPercent,
        outlined, twoLines, usePrimary,
    } = props;

    const { showTooltip, hideTooltip } = Store.useAction("core");
    const elementRef = React.useRef();

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
        outlined={outlined}
        twoLines={twoLines}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    >
        <B twoLines={twoLines}>
            {NLS.get(message)}
        </B>
        <Span usePrimary={usePrimary}>
            {content}
        </Span>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatItem.propTypes = {
    isHidden   : PropTypes.bool,
    message    : PropTypes.string.isRequired,
    tooltip    : PropTypes.string,
    value      : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    decimals   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    percent    : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    isPrice    : PropTypes.bool,
    isPercent  : PropTypes.bool,
    outlined   : PropTypes.bool,
    twoLines   : PropTypes.bool,
    usePrimary : PropTypes.bool,
    isLast     : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
StatItem.defaultProps = {
    decimals   : 0,
    isHidden   : false,
    isPrice    : false,
    isPercent  : false,
    outlined   : false,
    twoLines   : false,
    usePrimary : false,
    isLast     : false,
};

export default StatItem;
