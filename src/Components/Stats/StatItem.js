import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Li = Styled.li.attrs(({ twoLines }) => ({ twoLines }))`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: var(--stats-height);
    min-width: 100px;
    background-color: var(--light-gray);
    line-height: 1;
    border-radius: var(--border-radius);

    ${(props) => props.twoLines ? `
        flex-direction: column;
        padding: 0 12px;
    ` : "padding: 0 16px;"}
`;

const B = Styled.b.attrs(({ twoLines }) => ({ twoLines }))`
    font-size: 14px;
    font-weight: 400;
    ${(props) => props.twoLines ? "margin-bottom: 2px;" : "margin-right: 8px;"}
`;
const Span = Styled.span`
    font-size: 20px;
    font-weight: 400;
`;



/**
 * The Stat Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function StatItem(props) {
    const { message, value, decimals, percent, isPrice, isPercent, twoLines } = props;

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

    return <Li twoLines={twoLines}>
        <B twoLines={twoLines}>{NLS.get(message)}</B>
        <Span>{content}</Span>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatItem.propTypes = {
    isHidden  : PropTypes.bool,
    message   : PropTypes.string.isRequired,
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
    decimals  : 0,
    isHidden  : false,
    isPrice   : false,
    isPercent : false,
};

export default StatItem;
