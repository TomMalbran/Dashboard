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
    background-color: var(--light-gray);
    margin-right: 8px;
    line-height: 1;
    border-radius: var(--border-radius);

    ${(props) => props.twoLines ? `
        flex-direction: column;
        padding: 8px 12px;
    ` : "padding: 16px;"}

    &:last-child {
        margin-right: 0;
    }

    @media (max-width: 550px) {
        margin-right: 0;
        margin-bottom: 8px;
    }
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
    const { message, value, isPrice, twoLines } = props;

    const number = value ? Utils.formatNumber(value) : 0;

    return <Li twoLines={twoLines}>
        <B twoLines={twoLines}>{NLS.get(message)}</B>
        <Span>{(isPrice ? "$ " : "") + (number)}</Span>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatItem.propTypes = {
    message  : PropTypes.string.isRequired,
    value    : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    isPrice  : PropTypes.bool,
    twoLines : PropTypes.bool,
};

export default StatItem;
