import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div`
    color: rgb(94, 108, 132);
    background-color: white;
    border-radius: var(--border-radius);

    & + & {
        margin-top: 16px;
    }
`;

const H3 = Styled.h3.attrs(({ isCollapsible, isCollapsed }) => ({ isCollapsible, isCollapsed }))`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    padding: 12px 8px 8px 8px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    color: var(--black-color);
    border-bottom: 1px solid var(--lighter-gray);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    font-family: var(--title-font);

    ${(props) => props.isCollapsible && `
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
            background-color: var(--light-gray);
        }
    `}
    ${(props) => props.isCollapsed && `
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    `}
`;

const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;



/**
 * The Detail List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DetailList(props) {
    const { isHidden, className, message, collapsible, children } = props;

    // The Current State
    const [ isCollapsed, setCollapsed ] = React.useState(false);

    // Handles the Initial Collapsed state
    React.useEffect(() => {
        if (collapsible) {
            const collapsed = localStorage.getItem(`dashboard-collapsed-${collapsible}-${message}`);
            setCollapsed(Boolean(Number(collapsed)));
        }
    }, [ collapsible, message ]);

    // Handles the Collapsed click
    const handleClick = (e) => {
        e.preventDefault();
        setCollapsed(!isCollapsed);
        if (collapsible) {
            localStorage.setItem(`dashboard-collapsed-${collapsible}-${message}`, isCollapsed ? "0" : "1");
        }
    };


    if (isHidden) {
        return <React.Fragment />;
    }
    const isCollapsible = Boolean(collapsible);
    return <Div className={className}>
        <H3
            isCollapsible={isCollapsible}
            isCollapsed={isCollapsed}
            onClick={handleClick}
        >
            {isCollapsible && <Icon icon={isCollapsed ? "closed" : "expand"} />}
            {NLS.get(message)}
        </H3>
        {!isCollapsed && <Ul>{children}</Ul>}
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DetailList.propTypes = {
    isHidden    : PropTypes.bool,
    className   : PropTypes.string,
    message     : PropTypes.string.isRequired,
    collapsible : PropTypes.string,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
DetailList.defaultProps = {
    isHidden  : false,
    className : "",
};

export default DetailList;
