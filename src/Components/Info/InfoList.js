import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import InfoAction           from "../Info/InfoAction";



// Styles
const Section = Styled.section`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 24px;
    gap: 24px;
    border-bottom: 1px solid var(--light-gray);
    color: var(--black-color);
`;

const Items = Styled.div`
    display: flex;
    gap: 32px;

    @media (max-width: 400px) {
        gap: 16px;
    }
`;

const Actions = Styled.div`
    display: flex;
    gap: 8px;
`;



/**
 * The Info List
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InfoList(props) {
    const { className, variant, onAction, children } = props;

    const items   = [];
    const actions = [];

    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        if (child.type === InfoAction) {
            actions.push(React.cloneElement(child, { key, variant, onAction }));
        } else {
            items.push(React.cloneElement(child, { key }));
        }
    }

    return <Section className={className}>
        <Items>
            {items}
        </Items>
        {actions.length > 0 && <Actions className="actions">
            {actions}
        </Actions>}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InfoList.propTypes = {
    className : PropTypes.string,
    variant   : PropTypes.string,
    onAction  : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InfoList.defaultProps = {
    className : "",
    variant   : "accent",
};

export default InfoList;
