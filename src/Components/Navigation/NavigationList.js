import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Container = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    & + & {
        margin-top: 32px;
    }
`;

const Title = Styled.li`
    font-size: 16px;
    padding: 4px;
    margin-bottom: 8px;
    border-bottom: 2px solid var(--darker-gray);
`;



/**
 * The Navigation List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationList(props) {
    const { isHidden, className, message, onAction, onClose, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        onAction, onClose,
    }));


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container className={className}>
        {!!message && <Title>
            {NLS.get(message)}
        </Title>}
        {items}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationList.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    message   : PropTypes.string,
    variant   : PropTypes.string,
    onAction  : PropTypes.func,
    onClose   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
NavigationList.defaultProps = {
    isHidden  : false,
    className : "",
    message   : "",
};

export default NavigationList;
