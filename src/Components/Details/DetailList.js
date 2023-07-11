import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import Store                from "../../Core/Store";
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";



// Styles
const Div = Styled.div`
    color: var(--font-lighter);
    background-color: white;
    border-radius: var(--border-radius);
`;

const H3 = Styled.h3.attrs(({ isCollapsible, isCollapsed }) => ({ isCollapsible, isCollapsed }))`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    padding: 0 8px;
    min-height: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    color: var(--black-color);
    border-bottom: 1px solid var(--border-color-light);
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

const Span = Styled.span`
    flex-grow: 2;
`;

const Ul = Styled.ul`
    margin: 0;
    padding: 8px;
    list-style: none;
`;



/**
 * The Detail List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DetailList(props) {
    const {
        isHidden, className, message, collapsible,
        action, onAction, canEdit, children,
    } = props;

    const { closeDetails } = Store.useAction("core");

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

    // Handles the Action
    const handleAction = (e) => {
        e.stopPropagation();
        if (onAction) {
            onAction(Action.get(action));
        }
        closeDetails();
    };


    if (isHidden) {
        return <React.Fragment />;
    }

    const isCollapsible = Boolean(collapsible);
    const hasAction     = Boolean(action && onAction && canEdit);
    return <Div className={className}>
        <H3
            isCollapsible={isCollapsible}
            isCollapsed={isCollapsed}
            onClick={handleClick}
        >
            {isCollapsible && <IconLink
                variant="black"
                icon={isCollapsed ? "closed" : "expand"}
                isSmall
            />}
            <Span>{NLS.get(message)}</Span>
            {hasAction && <IconLink
                variant="black"
                icon="edit"
                onClick={handleAction}
                isSmall
            />}
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
    action      : PropTypes.string,
    canEdit     : PropTypes.bool,
    onAction    : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
DetailList.defaultProps = {
    isHidden  : false,
    className : "",
    action    : "",
};

export default DetailList;
