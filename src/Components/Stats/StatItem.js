import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Li = Styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 16px;
    background-color: var(--light-gray);
    margin-right: 8px;
    line-height: 1;

    &:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
    }
    &:last-child {
        margin-right: 0;
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    }

    @media (max-width: 550px) {
        margin-right: 0;
        margin-bottom: 8px;
    }
`;

const B = Styled.b`
    margin-right: 12px;
    font-size: 14px;
    font-weight: 400;
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
    const { message, value } = props;

    return <Li>
        <B>{NLS.get(message)}</B>
        <Span>{value || 0}</Span>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatItem.propTypes = {
    message : PropTypes.string.isRequired,
    value   : PropTypes.number,
};

export default StatItem;
