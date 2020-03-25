import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    & + & {
        margin-top: 32px;
    }
`;

const Li = Styled.li`
    font-size: 16px;
    padding: 4px;
    margin-bottom: 8px;
    border-bottom: 2px solid var(--primary-color);
`;



/**
 * The Navigation List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationList(props) {
    const { className, message, variant, path, baseUrl, onAction, onClose, children } = props;

    const items = Utils.cloneChildren(children, () => ({
        variant, path, baseUrl, onAction, onClose,
    }));

    return <Ul className={className}>
        {!!message && <Li>{NLS.get(message)}</Li>}
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationList.propTypes = {
    className : PropTypes.string,
    message   : PropTypes.string,
    variant   : PropTypes.string,
    path      : PropTypes.string,
    baseUrl   : PropTypes.string,
    onAction  : PropTypes.func,
    onClose   : PropTypes.func,
    isHidden  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
NavigationList.defaultProps = {
    className : "",
    message   : "",
    baseUrl   : "",
    isHidden  : false,
};

export default NavigationList;
