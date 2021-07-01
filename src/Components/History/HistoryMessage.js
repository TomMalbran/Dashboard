import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Avatar               from "../Avatar/Avatar";
import Html                 from "../Common/Html";



// Styles
const Li = Styled.li`
    position: relative;
    margin: 0 0 24px 52px;
    color: var(--black-color);

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

const HistoryAvatar = Styled(Avatar)`
    position: absolute;
    top: 16px;
    left: -54px;
    margin-top: -20px;
    padding: 0;
    border: 4px solid white;

    & > img {
        border: none;
    }
`;

const Header = Styled(Html)`
    position: relative;
    padding: 8px 12px;
    border: 1px solid rgb(209,213,218);
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    background-color: var(--lighter-gray);
    color: var(--darkerer-gray);

    & > b {
        color: var(--black-color);
    }

    &:before {
        content: "";
        position: absolute;
        top: 17px;
        left: 0;
        width: 8px;
        height: 8px;
        border-top: 1px solid rgb(209,213,218);
        border-left: 1px solid rgb(209,213,218);
        background-color: var(--lighter-gray);
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;

const Content = Styled.div`
    padding: 8px 12px;
    border: 1px solid rgb(209,213,218);
    border-top: 0;
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);

    & > p:first-of-type {
        margin-top: 0;
    }
    & > p:last-of-type {
        margin-bottom: 0;
    }
`;



/**
 * The History Message Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function HistoryMessage(props) {
    const { className, name, email, avatar, title, children } = props;

    return <Li className={className}>
        <HistoryAvatar
            name={name}
            email={email}
            avatar={avatar}
            size={34}
        />
        <div>
            <Header>{title}</Header>
            <Content>{children}</Content>
        </div>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
HistoryMessage.propTypes = {
    className : PropTypes.string,
    name      : PropTypes.string,
    email     : PropTypes.string,
    avatar    : PropTypes.string,
    title     : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
HistoryMessage.defaultProps = {
    className : "",
};

export default HistoryMessage;
