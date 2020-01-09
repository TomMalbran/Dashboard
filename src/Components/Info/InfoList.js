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
    padding: 12px 24px;
    border-bottom: 1px solid var(--light-gray);
    color: var(--black-color);
`;

const Actions = Styled.div`
    padding: 12px 12px 12px 24px;
`;



/**
 * The Info List
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InfoList(props) {
    const { className, onClick, children } = props;

    const items   = [];
    const actions = [];

    for (const [ key, child ] of Utils.toEntries(children)) {
        if (!child.props.isHidden) {
            if (child.type === InfoAction) {
                actions.push(React.cloneElement(child, { key, onClick }));
            } else {
                items.push(React.cloneElement(child, { key }));
            }
        }
    }

    return <Section className={className}>
        {items}
        {actions.length > 0 && <Actions>{actions}</Actions>}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InfoList.propTypes = {
    className : PropTypes.string,
    onClick   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InfoList.defaultProps = {
    className : "",
};

export default InfoList;
