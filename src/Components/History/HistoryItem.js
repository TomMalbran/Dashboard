import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";



// Styles
const Li = Styled.li.attrs(({ canClick }) => ({ canClick }))`
    display: block;
    position: relative;
    margin: 0 0 24px 52px;

    ${(props) => props.canClick && "cursor: pointer;"}

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: -33px;
        bottom: -30px;
        border-left: 1px solid rgb(209, 213, 218);
    }
    &:last-of-type:before {
        bottom: 0;
    }
`;

const Message = Styled(Html)`
    margin-bottom: 4px;
`;
const Detail = Styled(Html)`
    margin-bottom: 4px;
    color: var(--darkest-gray);
`;
const Date = Styled.div`
    font-size: 13px;
    color: var(--darkerer-gray);
`;

const HistoryIcon = Styled(Icon)`
    position: absolute;
    top: 16px;
    left: -54px;
    width: 36px;
    height: 36px;
    margin-top: -20px;
    line-height: 36px;
    background-color: var(--lighter-gray);
    color: rgb(88, 96, 105);
    text-align: center;
    border-radius: 50%;
    border: 4px solid white;
`;



/**
 * The History Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function HistoryItem(props) {
    const { className, icon, message, detail, date, canClick, onClick } = props;

    // Handle the Click
    const handleClick = () => {
        if (canClick && onClick) {
            onClick();
        }
    };

    return <Li className={className} canClick={canClick} onClick={handleClick}>
        <HistoryIcon icon={icon} />
        <div>
            <Message addBreaks>{message}</Message>
            <Detail addBreaks>{detail}</Detail>
            <Date>{date}</Date>
        </div>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
HistoryItem.propTypes = {
    className : PropTypes.string,
    icon      : PropTypes.string.isRequired,
    message   : PropTypes.string.isRequired,
    detail    : PropTypes.string,
    date      : PropTypes.string.isRequired,
    canClick  : PropTypes.bool,
    onClick   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
HistoryItem.defaultProps = {
    className : "",
    canClick  : false,
};

export default HistoryItem;
